import Footer from "@/components/footer";
import Header from "@/components/header";
import DashboardProfile from "@/components/profile";
import SongList from "@/components/songsList";
import updateUserData from "@/components/updateUserData";

const DashboardPage = async() => {

    await updateUserData(); //楽曲データを更新

    return (
        <div>
            <Header/>
            <div className="mt-20">
                <DashboardProfile/>
                <SongList/>
            </div>
            <Footer/>
        </div>
    );
};

export default DashboardPage;