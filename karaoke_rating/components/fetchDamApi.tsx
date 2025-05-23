import axios from "axios";
import { parseStringPromise } from 'xml2js';

const fetchDamApi = async(_pageNo:number, _scoringAiId:string, _detailFlg:number) => {

    const endPoint = "https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do";
    const cdmCardNo = "ODAwMDEyMDEyMDgxMzUx";
    const pageNo = _pageNo;
    const scoringAiId = _scoringAiId || undefined
    const detailFlg = _detailFlg;
 
    const response = await axios.get(endPoint, {
        params:{
            cdmCardNo,
            pageNo: pageNo || undefined,
            scoringAiId: scoringAiId || undefined,
            detailFlg: detailFlg || undefined,
        },
    });
    const rowData = response.data;
    const resultJson = await parseStringPromise(rowData, { explicitArray: false });
    const damDataList = resultJson.document.list.data;

    return damDataList;
};

export default fetchDamApi;