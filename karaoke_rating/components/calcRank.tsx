const calcRank = (score: number) => {

    let rank = "N";
    if (score >= 97.5){

        rank = "SSS+";
    }
    else if(score >= 96.0){

        rank = "SSS";
    }
    else if(score >= 95.0){

        rank = "SS+";
    }
    else if(score >= 93.0){

        rank = "SS";
    }
    else if(score >= 92.0){

        rank = "S+";
    }
    else if(score >= 90.0){

        rank = "S";
    }
    else if(score >= 85.0){

        rank = "AAA";
    }
    else if(score >= 80.0){

        rank = "AA";
    }
    else{
        rank = "A";
    }

    return rank;
};

export default calcRank;