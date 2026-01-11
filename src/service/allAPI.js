import commonAPI from "./commonAPI";
import  SERVERURL from "./serverURL"

//Register user
export const registerUserAPI=async(reqBody)=>{
    return await commonAPI ("POST",`${SERVERURL}/register`,reqBody)
}
//login user
export const loginUserAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
}
//create task
export const addTaskAPI=async(reqbody,reqHeader)=>{
    return await commonAPI("POST",`${SERVERURL}/create-task`,reqbody,reqHeader)
} 
//view task
export const viewTaskAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVERURL}/get-tasks`,"",reqHeader);
};