//import {fetchReviewedSongData} from "@/components/reviewedData";
import axios from "axios";
import { parseStringPromise } from 'xml2js';
import ScoreCard from "@/components/scoreCard";

type ScoringData = {

    score: string;
  scoringAiId: string;
  requestNo: string;
  contentsName: string;
  artistName: string;
  scoringDateTime: string;
  rank: string;
};

const calcRank = (score: number) => {

    let rank = "N";
    if (score >= 97.5){

        rank = "SSS+";
    }
    else if(score >= 96.0){

        rank = "SSS";
    }
    else if(score >= 95.0){

        rank = "SS+";
    }
    else if(score >= 93.0){

        rank = "SS";
    }
    else if(score >= 92.0){

        rank = "S+";
    }
    else if(score >= 90.0){

        rank = "S";
    }
    else if(score >= 85.0){

        rank = "AAA";
    }
    else if(score >= 80.0){

        rank = "AA";
    }
    else{
        rank = "A";
    }

    return rank;
}

export const fetchReviewedSongData = async( cdmCardNo :string) => {

    const endPoint = "https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do";

    const pageNo = 1;//searchParams.get("pageNo");
    const scoringAiId = undefined;//searchParams.get("scoringAiId");
    const detailFlg = 0;//searchParams.get("detailFlg");
/*
    const response = await axios.get(endPoint, {
        params:{
            cdmCardNo,
            pageNo: pageNo || undefined,
            scoringAiId: scoringAiId || undefined,
            detailFlg: detailFlg || undefined,
        },
    });
*/
    //const data = response.data;
    // xmlをjsonに変換
    const data = {
        "document": {
          "$": {
            "xmlns": "https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML",
            "type": "2.2"
          },
          "result": {
            "status": "OK",
            "statusCode": "0000",
            "message": ""
          },
          "data": {
            "page": {
              "_": "1",
              "$": {
                "dataCount": "15",
                "pageCount": "3",
                "hasNext": "1",
                "hasPreview": "0"
              }
            },
            "cdmCardNo": "ODAwMDEyMDEyMDgxMzUx"
          },
          "list": {
            "$": {
              "count": "5"
            },
            "data": [
              {
                "scoring": {
                  "_": "86482",
                  "$": {
                    "scoringAiId": "2080680",
                    "requestNo": "7651-48",
                    "contentsName": "ラヴィット",
                    "artistName": "ピノキオピー",
                    "dContentsName": "ラヴィット",
                    "dArtistName": "ピノキオピー",
                    "lastPerformKey": "0",
                    "scoringDateTime": "20250516231640",
                    "favorite": "0"
                  }
                }
              },
              {
                "scoring": {
                  "_": "80938",
                  "$": {
                    "scoringAiId": "2080668",
                    "requestNo": "5516-35",
                    "contentsName": "Dead or Like",
                    "artistName": "DYES IWASAKI",
                    "dContentsName": "Dead or Like",
                    "dArtistName": "DYES IWASAKI",
                    "lastPerformKey": "0",
                    "scoringDateTime": "20250516230747",
                    "favorite": "0"
                  }
                }
              },
              {
                "scoring": {
                  "_": "82177",
                  "$": {
                    "scoringAiId": "2080655",
                    "requestNo": "7281-29",
                    "contentsName": "ノーダウト",
                    "artistName": "Official髭男dism",
                    "dContentsName": "ノーダウト",
                    "dArtistName": "Official髭男dism",
                    "lastPerformKey": "0",
                    "scoringDateTime": "20250516225827",
                    "favorite": "0"
                  }
                }
              },
              {
                "scoring": {
                  "_": "87519",
                  "$": {
                    "scoringAiId": "2080642",
                    "requestNo": "7662-77",
                    "contentsName": "好きな惣菜発表ドラゴン",
                    "artistName": "ンバヂ",
                    "dContentsName": "好きな惣菜発表ドラゴン",
                    "dArtistName": "ンバヂ",
                    "lastPerformKey": "0",
                    "scoringDateTime": "20250516225106",
                    "favorite": "0"
                  }
                }
              },
              {
                "scoring": {
                  "_": "83915",
                  "$": {
                    "scoringAiId": "2080630",
                    "requestNo": "7658-12",
                    "contentsName": "ロウワー feat. ぬゆり",
                    "artistName": "Lanndo",
                    "dContentsName": "ロウワー feat. ぬゆり",
                    "dArtistName": "Lanndo",
                    "lastPerformKey": "0",
                    "scoringDateTime": "20250516224304",
                    "favorite": "0"
                  }
                }
              }
            ]
          }
        }
      };
    const resultJson = data;//await parseStringPromise(data, { explicitArray: false });
    const listData = resultJson.document.list.data;

    const scoringArray: ScoringData[] = await Promise.all(
        listData.map(async (item: any) => {
        const rawScore = item.scoring._;
        const formattedScore = (Number(rawScore) / 1000).toFixed(3);
        const scoring = item.scoring.$;

        const term = encodeURIComponent(`${scoring.contentsName} ${scoring.artistName}`);
        const url = `https://itunes.apple.com/search?term=${term}&media=music&entity=musicTrack&limit=1`;

        let coverUrl = undefined;
        /*
        try {
            const res = await fetch(url);
            const json = await res.json();
            if (json.results.length > 0) {
            // artworkUrl100 → 高解像度版が欲しければ文字列操作
            const rawUrl: string = json.results[0].artworkUrl100; 
            coverUrl = rawUrl.replace(/100x100bb/, '600x600bb');
            }
        } catch (e) {
            console.error('iTunes API fetch error:', e);
        }
        */
        return {
          scoringAiId: scoring.scoringAiId,
          requestNo: scoring.requestNo,
          contentsName: scoring.contentsName,
          artistName: scoring.artistName,
          scoringDateTime: scoring.scoringDateTime,
          score: formattedScore,
          rank: calcRank(Number(formattedScore))
        };
      }));

    return scoringArray;
}


type ScoreCardProps = {
    contentsName: string;
    artistName: string;
    scoringDateTime: string;
    score: string;
    rank:string;
  };
const SongList = async() => {

    const cdmCardNo = "ODAwMDEyMDEyMDgxMzUx";
    const data = await fetchReviewedSongData(cdmCardNo);
    return(
        <>
        <h1>楽曲一覧</h1>
        <div className="flex overflow-x-auto no-scrollbar space-x-4 p-10">
            {data.map((item, index) => {
                const props: ScoreCardProps = {
                    
                    contentsName: item.contentsName,
                    artistName: item.artistName,
                    scoringDateTime: item.scoringDateTime,
                    score: item.score,
                    rank: item.rank,
                }
                return <ScoreCard key={index} {...props}/>;
            })}
            </div>
        </>
    );
};

export default SongList;