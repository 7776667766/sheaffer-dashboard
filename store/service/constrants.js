export const addservicesApi = "services/add";
export const addserviceTypeApi = "services/types/add";
export const getsevicetypeApi = "services/types"

//all services by business;
export const getAllServiceApi = "services/all-services";
export const adddummyservicesApi = "/services/dummyadd";
export const editServiceApi = (id) => `services/update/${id}`;
export const deleteServiceApi = (id) => `services/delete/${id}`;
export const deleteServiceTypeApi =(id)=>`servicetype/delete/${id}`
export const editServiceTypeApi = (id) => `servicestype/update/${id}`;

//all services 
export const getAllServicesApi = "services/get-all-services";