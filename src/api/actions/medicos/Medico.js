import apiClient from '../../client';

export const createMedico = async (formData, token) =>{
    const objApi = apiClient('medicos/medico/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getMedico = async (token) =>{
    
    const objApi = apiClient('medicos/medico/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveMedico = async (id, token) =>{
    
    const objApi = apiClient('medicos/medico/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateMedico = async (id, formData, token) =>{
    const objApi = apiClient('medicos/medico/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteMedico = async (id, token) =>{
    const objApi = apiClient('medicos/medico/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getClinicaNombre = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('medicos/medico/get-clinica/nombre/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

