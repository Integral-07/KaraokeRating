import Header from "@/components/header";
import DashboardProfile from "@/components/profile";
import SongList from "@/components/songsList";

const dashboardPage = () => {

    return (
        <div>
            <Header/>
            <div className="mt-20">
                dashboard
                <DashboardProfile/>
                <SongList/>
            </div>
        </div>
    );
};

export default dashboardPage;