import { BASE_URL } from './base_url';
import {commonRequest} from './commonHTTPRequst';


//register api
export const register = async (body,header)=>{
  return await commonRequest("POST",`${BASE_URL}/register`,body,header)
}

//all-employees
export const getallemployees = async (search) =>{
  return await commonRequest("GET",`${BASE_URL}/all-employees?search=${search}`,"")
}

//view-employee
export const viewEmployee = async (id) =>{
  return await commonRequest("GET",`${BASE_URL}/view-employee/${id}`,"")
}

//remove-employee
export const deleteEmployee = async (id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/remove-employee/${id}`,{})
}

//edit-employee
export const editEmployee = async (id,body,header) =>{
return await commonRequest("PUT",`${BASE_URL}/edit-employee/${id}`,body,header)
}