import { useEffect, useState } from "react"

const Test=()=>{
    const [data,setData]= useState("");
    function checkHeadingg(str){
    return /^\(?\*\*(?!.*\*\*$).+\*\)?$/.test(str);
}
function handle(){
    console.log(checkHeadingg(data));
    setData("");
}

// function removeHeadingStars(str){
//     // regix
//     return str.replace(/^(\*)(\*)|(\*)\*$/g,"")
// }


    return(
        <>
        <input value={data} onChange={(event)=>setData(event.target.value)}placeholder="Enter String" />
        <button onClick={handle}>Check</button>
      
        </>
    )
}

export  default Test;