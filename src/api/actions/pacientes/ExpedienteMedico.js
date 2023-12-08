import apiClient from '../../client';

export const createExpedienteMedico = async (formData, token) =>{
    const objApi = apiClient('pacientes/expedientemedico/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getExpedienteMedico = async (token) =>{
    
    const objApi = apiClient('pacientes/expedientemedico/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveExpedienteMedico = async (id, token) =>{
    
    const objApi = apiClient('pacientes/expedientemedico/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateExpedienteMedico = async (id, formData, token) =>{
    const objApi = apiClient('pacientes/expedientemedico/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteExpedienteMedico = async (id, token) =>{
    const objApi = apiClient('pacientes/expedientemedico/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getPacientesNombre = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('pacientes/expedientemedico/get-pacientes/nombre/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

