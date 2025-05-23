//import {fetchReviewedSongData} from "@/components/reviewedData";
import axios from "axios";
import { parseStringPromise } from 'xml2js';
import ScoreCard from "@/components/scoreCard";
import calcRank from "./calcRank";

type ScoringData = {

    score: string;
  scoringAiId: string;
  requestNo: string;
  contentsName: string;
  artistName: string;
  scoringDateTime: string;
  rank: string;
  albamArt: string;
};



export const fetchReviewedSongData = async( cdmCardNo :string) => {


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

        const albumArt = require('album-art');
        const albamArtUrl = await albumArt(scoring.artistName, scoring.contentsName);

        return {
          scoringAiId: scoring.scoringAiId,
          requestNo: scoring.requestNo,
          contentsName: scoring.contentsName,
          artistName: scoring.artistName,
          scoringDateTime: scoring.scoringDateTime,
          score: formattedScore,
          rank: calcRank(Number(formattedScore)),
          albamArt: albamArtUrl,
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
    albamArt: string;
  };
const SongList = async() => {

    const cdmCardNo = "ODAwMDEyMDEyMDgxMzUx";
    const data = await fetchReviewedSongData(cdmCardNo);

    return(
        <>

        <div className="mt-10">
          <h1 className="bg-red-300 text-gray-100 text-3xl font-sans px-10 py-2">楽曲一覧</h1>
        </div>
        <div className="flex overflow-x-auto no-scrollbar space-x-4 px-10">
            {data.map((item, index) => {
                const props: ScoreCardProps = {
                    
                    contentsName: item.contentsName,
                    artistName: item.artistName,
                    scoringDateTime: item.scoringDateTime,
                    score: item.score,
                    rank: item.rank,
                    albamArt: item.albamArt,
                }
                return <ScoreCard key={index} {...props}/>;
            })}
            </div>
        </>
    );
};

export default SongList;