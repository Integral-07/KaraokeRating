import { createClient } from "@/util/supabase/server";
import { redirect } from "next/navigation";

const getUserId = async() => {

    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (!user) {

        console.log("ログインしているユーザーが見つかりません");
        redirect("login/");
    }

    return user.id;
};

export default getUserId;