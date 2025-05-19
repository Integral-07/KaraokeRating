const DashboardProfile = () => {

    const userName = "Integral07";
    const rating = 10000;

    return (
        <div className="flex justify-center">
            <div className="bg-blue-500 shadow-md item-center rounded-md shrink-0 w-[350px] min-w-[300px] h-[100px]">
                <div className="text-gray-200 px-10 py-2 text-left text-lg font-bold">
                    {userName}
                </div>
                <div className="px-10 py-2 text-left">
                    KARAOKE RATING [{rating}]
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;