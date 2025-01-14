export function earnPoints(result,answers,point){
    return result.map((element,i)=>answers[i]===element).filter(i=>i).map(i=>point).reduce((prev,cur)=>prev+cur,0);
}