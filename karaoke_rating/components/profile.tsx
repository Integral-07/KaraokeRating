import { createClient } from "@/util/supabase/server";
import getUserId from "./getUserId";
import RatingBadge from "./ratingBadge";
import { getUserData } from "./supabaseFunctions";

const DashboardProfile = async() => {

    //const userName = "Integral07";
    //const rating = "10000";

    const userId = await getUserId();
    if (userId == undefined){

        return;
    }
    
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    const userName = user?.user_metadata.display_name;

    const rating = user?.user_metadata.rating;

    return (
        <div className="flex justify-center">
            <div className="bg-gradient-to-tr from-gray-200 via-gray-600 to-gray-200 shadow-lg item-center rounded-md shrink-0 w-[350px] min-w-[300px] h-[150px]">
                <div className="flex p-4">
                    <div className="bg-gray-100 w-13 h-13 rounded-sm">
                        <img 
                            src="https://everydayicons.jp/wp/wp-content/themes/everydayicons/icons/thumbs/ei-person.png" 
                            alt="avator"
                            className="w-13 h-13 rounded-sm object-cover"
                         />
                    </div>
                    <div className="text-gray-200 px-8 py-2 text-left text-3xl font-bold">
                        {userName}
                    </div>
                </div>
                <div className="justify-right">
                    <RatingBadge rating={rating}/>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;