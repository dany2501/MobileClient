import apiClient from '../../client';

export const createConsultorio = async (formData, token) =>{
    const objApi = apiClient('clinicas/consultorio/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getConsultorio = async (token) =>{
    
    const objApi = apiClient('clinicas/consultorio/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveConsultorio = async (id, token) =>{
    
    const objApi = apiClient('clinicas/consultorio/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateConsultorio = async (id, formData, token) =>{
    const objApi = apiClient('clinicas/consultorio/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteConsultorio = async (id, token) =>{
    const objApi = apiClient('clinicas/consultorio/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getClinicaNombre = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('clinicas/consultorio/get-clinica/nombre/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

