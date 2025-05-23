'use client'

import { motion } from "framer-motion";

export type ScoreCardProps = {
    contentsName: string;
    artistName: string;
    scoringDateTime: string;
    score: string;
    rank: string;
    albamArt: string;
  };
const ScoreCard = (props: ScoreCardProps) => {

    const { contentsName, artistName, scoringDateTime, score, rank, albamArt } = props;
    return(
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative shrink-0 w-[300px] min-w-[300px] h-[400px] rounded-lg shadow-2xl bg-gradient-to-br from-[#ffd6f0] to-[#cce6ff] border-[5px] border-white mt-10"
            >
            {/* ジャケット画像  */}
            <img
                src={albamArt}
                alt={contentsName}
                className="w-full h-[300px] object-cover border-4 border-white"
            />

            {/* 曲情報 */}
            <div className="absolute bottom-0 w-full p-4 bg-white/90 text-center rounded-b-lg">
                <h2 className="text-xl font-extrabold text-pink-600">{contentsName}</h2>
                <p className="text-sm text-gray-600 mt-1">{artistName}</p>

                {/* スコアとランクを追加 */}
                <div className="mt-2">
                    <p className="text-lg font-bold text-purple-700">{Number(score)}/100.000点</p>
                    <p className="text-sm font-semibold text-gray-500">{rank}</p>
                </div>
            </div>

        </motion.div>
    );
};

export default ScoreCard;