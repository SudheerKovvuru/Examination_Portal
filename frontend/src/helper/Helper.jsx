import axios from 'axios';

export function earnPoints(result,answers,point){
    return result.map((element,i)=>answers[i]===element).filter(i=>i).map(i=>point).reduce((prev,cur)=>prev+cur,0);
}


export async function getServerData(url,callback) {
    const data=await (await axios.get(url))?.data;
    return callback ? callback(data):data;
}
export async function getServerDataBy(url,examname,callback) {
    const data=await (await axios.post(url,{examname}))?.data;
    return callback ? callback(data):data;
}
export async function getServerAnswersBy(url,examname,callback) {
    const data=await (await axios.post(url,{examname}))?.data;
    return callback ? callback(data):data;
}
export async function getSideInfo(url,examname,callback) {
    const data=await (await axios.post(url,{examname}))?.data;
    return callback ? callback(data):data;
}
export async function postServerData(url,result,callback) {
    const data=await (await axios.post(url,result))?.data;
    return callback ? callback(data):data;
}
