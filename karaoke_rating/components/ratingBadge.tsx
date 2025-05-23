interface RatingBadgeProps {
  rating: string;
}

const RatingBadge = ({ rating }: RatingBadgeProps) => {

    const ratingChars:any = [];

    for(let c of rating){

        ratingChars.push(c);
    }

    return (
        <div className="bg-gradient-to-tr from-yellow-200 via-yellow-600 to-yellow-200 flex items-center justify-between w-[280px] h-[55px] rounded-lg px-3">
            <div className="items-center text-center justify-center bg-gray-200 w-[100px] h-[45px] rounded-lg font-black">
                <div className="text-red-500 italic text-lg ">KARAOKE</div>
                <div className="text-green-500 text-lg -mt-2">RATING</div>
            </div>
            <div className="flex">
                {ratingChars.map((item: any, index: any)=>{
                    return(
                        <div key={index} >
                            <div className="flex items-center justify-center bg-amber-900 min-w-[28px] h-[35px] rounded-md">
                                <div className="text-yellow-500 text-lg font-black">
                                    {item}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingBadge;