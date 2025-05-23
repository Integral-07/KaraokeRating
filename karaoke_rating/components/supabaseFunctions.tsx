import { createClient } from "@/util/supabase/server";
import correctScore from "./correctScore";
import calcRank from "./calcRank";
import calcLevel from "./calcLevel";
import getUserId from "./getUserId";


const albumArt = require('album-art');


export const getUserData = async(user_id:string) => {
    
    const supabase = await createClient();
    const {data:user_data, error} = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', user_id);
    
        if(error){
            alert("ユーザーデータの取得に失敗しました")
            return;
        }

    return user_data;
};

export const getAllSongs = async() => {

    const supabase = await createClient();
    const { data: songs, error } = await supabase
        .from('songs')
        .select('*')
    // エラーが発生した場合
    if (error) {
        alert("楽曲の取得でエラーが発生しました");
        return;
    }

    return songs;
};

export const getSongsFilteredRequestNo = async(requestNo: string) => {

    const supabase =  await createClient();
    const { data: songs, error } = await supabase
        .from('songs')
        .select('*')
        .eq('requestNo', requestNo)

    // エラーが発生した場合
    if (error) {
        alert("楽曲の取得でエラーが発生しました");
        return;
    }

    return songs;
};

export const insertSongData = async(
    _title:string, _artist:string, _rawScore:string, _scoredAt:string, _scoringAiId:string, _requestNo:string, _isDam:boolean
) => {

    const supabase = await createClient();

    const newRank = calcRank(Number(_rawScore));
    const albamArtUrl = await albumArt(_artist, _title);
    const userId = await getUserId();

    const { data, error } = await supabase
        .from('songs')
        .insert([
            {
            user_id: userId,
            title: _title,
            artist: _artist,
            raw_score: _rawScore,
            corrected_score: correctScore(Number(_rawScore), _isDam),
            scored_at: _scoredAt,
            rank: newRank,
            level: calcLevel(_scoringAiId),
            requestNo: _requestNo,
            isDAM: _isDam,
            albamArtUrl: String(albamArtUrl),
            }
        ]);

    //console.log('Insert result:', data);
    //console.error('Insert error:', error);

};

export const updateScore = async(newScoring:any) => {

    const supabase = await createClient();

    const { data: songs, error } = await supabase
        .from('songs')
        .select('*')
        .eq('requestNo', newScoring.$.requestNo)

    // エラーが発生した場合
    if (error) {
        console.log("楽曲の取得でエラーが発生しました");
        return;
    }

    
    const scoringArray: any[] = await Promise.all(
        songs.map(async (item: any) => {
            
        const newRawScore = newScoring._;
        const formattedScore = (Number(newRawScore) / 1000).toFixed(3);
        const newCorrectedScore = correctScore(Number(formattedScore), item.isDAM);
        const newRank = calcRank(newCorrectedScore);
        const newLevel = calcLevel(newScoring.$.scoringAiId);


        const { data, error:updateError } = await supabase
        .from('songs')
        .update(
            {
                raw_score: Number(formattedScore),
                corrected_score: Number(newCorrectedScore),
                scored_at: newScoring.$.scored_at,
                rank: newRank,
                level: newLevel,
            }
        )
        .eq('requestNo', newScoring.$.requestNo);
        
        // エラーが発生した場合
        if (updateError) {
            console.log("楽曲の更新に失敗しました");
            return;
        }

    }))
};
