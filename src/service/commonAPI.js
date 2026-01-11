import axios from "axios";

const commonAPI=async(httpRequest,url,reqBody,reqHeader)=>{
    const requestConfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:{
            ...reqHeader,
        },
    
    }
    try {
        const res=await axios(requestConfig)
        return res

    } catch (err) {
        throw err
        
    }
}
export default commonAPI