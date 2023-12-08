import apiClient from '../../client';

export const createFarmacia = async (formData, token) =>{
    const objApi = apiClient('farmacias/farmacia/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getFarmacia = async (token) =>{
    
    const objApi = apiClient('farmacias/farmacia/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveFarmacia = async (id, token) =>{
    
    const objApi = apiClient('farmacias/farmacia/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateFarmacia = async (id, formData, token) =>{
    const objApi = apiClient('farmacias/farmacia/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteFarmacia = async (id, token) =>{
    const objApi = apiClient('farmacias/farmacia/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getClinicaNombre = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('farmacias/farmacia/get-clinica/nombre/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

