import apiClient from '../../client';

export const createClinica = async (formData, token) =>{
    const objApi = apiClient('clinicas/clinica/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getClinica = async (token) =>{
    
    const objApi = apiClient('clinicas/clinica/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveClinica = async (id, token) =>{
    
    const objApi = apiClient('clinicas/clinica/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateClinica = async (id, formData, token) =>{
    const objApi = apiClient('clinicas/clinica/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteClinica = async (id, token) =>{
    const objApi = apiClient('clinicas/clinica/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}


