const funcForDam = (score: number) =>{

    const x = score;
    const y = x;

    return y;
};

const funcForJoysound = (score: number) => {

    const x = score;
    const y = (1.03**(x-50) - 1)/(1.03**50 - 1) * 50 + 50;

    return y;
};

const correctScore = (rawScore: number, isDam: boolean) => {

    let correctedScore = 0;
    if (isDam){
        //DAM
        correctedScore = funcForDam(rawScore);
    }
    else{
        //JOYSOUND
        correctedScore = funcForJoysound(rawScore);
    }

    return correctedScore;
};

export default correctScore;
