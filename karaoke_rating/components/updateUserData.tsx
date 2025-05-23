import calcRank from "./calcRank";
import calcRating from "./calcRating";
import fetchDamApi from "./fetchDamApi";
import calcLevel from "./calcLevel";
import { getSongsFilteredRequestNo, getUserData, insertSongData, updateScore } from "./supabaseFunctions";
import { createClient } from "@/util/supabase/server";
import getUserId from "./getUserId";

const updateUserData = async() => {
    
    const userId = await getUserId();
    if (userId == undefined){

        return;
    }

    /* 変更があったかを記録 */
    let isChange = false;

    const model = "DAM";

    const damDataList = await fetchDamApi(0, "", 0);
    
    damDataList.map(async (item: any) => {

        const scoring = item.scoring.$;
       
        const rawScore = item.scoring._;
        const formattedScore = (Number(rawScore) / 1000).toFixed(3);

        /* APIからの楽曲が既にデータベースに存在するか調べる */
        const isDuplicated = await findSameSong(scoring.requestNo, model);

        if (isDuplicated){
            //重複あり
            
            const oldSongDate = await getSongsFilteredRequestNo(scoring.requestNo);

            let oldScore = 110;
            oldSongDate?.map((item:any) => {
                console.log(item);
                oldScore = Number(item.raw_score);     //過去のデータ
            })
            const currentScore = Number(formattedScore); //今回のデータ
            
            if(oldScore < currentScore){
                
                isChange = true;
                // データベースに再登録
                await updateScore(item.scoring);
            }
        }
        else{
            //重複なし
            //const albamArtUrl = await albumArt(scoring.artistName, scoring.contentsName);
            /* 楽曲情報をデータベースに登録 */
            insertSongData(scoring.contentsName, scoring.artistName, formattedScore, scoring.scored_at, scoring.scoringAiId, scoring.requestNo, true);
        }

        //最終更新日時を更新
        //finalUpdatedDateTime = new Date();
    });

    /* 最後に処理 */
    if (isChange){
        // レートの再計算

        calcRating();
    }
};

export default updateUserData;

async function findSameSong (requestNo: string, model: string) {
    
    if (model == "DAM"){
        const supabase = await createClient();
        const { count, error } = await supabase
            .from('songs')
            .select('*', { count: 'exact', head: true })
            .eq('requestNo', requestNo)
        // エラーが発生した場合
        if (error) {
            console.log("楽曲の取得でエラーが発生しました");
        }

        if (count != 0){
            return true;
        }
        else{
            return false;
        }
    }
    else{

        return false;
    }
}
