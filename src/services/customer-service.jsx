import { myAxios } from "./Helper"


export const getAllCustomers=()=>{
    return myAxios.get(`/customers`).then(response=> response.data)
}

export const deleteCustomerById=(customerCode)=>{
    return myAxios.delete(`/customer/delete/${customerCode}`).then(response=> response.data)
}

export const updatedUserById=(customer)=>{
    return myAxios.put(`/customer/update/${customer.customerCode}`,customer).then(response=>response.data)
}

export const createCustomer=(customer)=>{
     return myAxios.post(`/customer/add/${customer.countryId}/${customer.industryId}`,customer).then(response=>response.data)
}