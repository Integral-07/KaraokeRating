import { createClient } from "@/util/supabase/server";

// このページをSSRにする（これがないと本番環境でこのページはSSGになる。その結果データベースを更新しても反映されなくなる。
export const revalidate = 0;

const calcRating = async() => {

  const supabase = await createClient();

  // ベスト枠の取得
  const { data: songs, error } = await supabase
    .from('songs')
    .select('*')
    .order('score', {ascending: false}) //スコア降順
    .limit(30);

  // エラーが発生した場合
  if (error) {
    console.log("楽曲の取得でエラーが発生しました");
  }

  let newRating = 0;

  songs?.map((item:any)=>{

    const correctedScore = item.corrected_score || 0;
    const level = item.level;
    const rank = item.rank || "N";

    const rankCoefficient = calcRankCoefficient(rank);

    //単曲レートを計算（補正点×レベル×ランク係数）
    const singleRating = correctedScore * level * rankCoefficient;

    //単曲レートを集計してレートを算出
    newRating += singleRating;
  });

  return newRating;  
};

function calcRankCoefficient(rank: string){

  let rankCoefficient = 0;
  if(rank == "SSS+") rankCoefficient = 22.4;
  else if(rank == "SSS") rankCoefficient = 22.0;
  else if(rank == "SS+") rankCoefficient = 21.6;
  else if(rank == "SS") rankCoefficient = 21.1;
  else if(rank == "S+") rankCoefficient = 20.8;
  else if(rank == "S") rankCoefficient = 20.3;
  else if(rank == "AAA") rankCoefficient = 20.0;
  else if(rank == "AA") rankCoefficient = 19.5;

  return rankCoefficient;
}

export default calcRating;