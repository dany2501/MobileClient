import apiClient from '../../client';

export const createPacientes = async (formData, token) =>{
    const objApi = apiClient('pacientes/pacientes/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getPacientes = async (token) =>{
    
    const objApi = apiClient('pacientes/pacientes/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrievePacientes = async (id, token) =>{
    
    const objApi = apiClient('pacientes/pacientes/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updatePacientes = async (id, formData, token) =>{
    const objApi = apiClient('pacientes/pacientes/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deletePacientes = async (id, token) =>{
    const objApi = apiClient('pacientes/pacientes/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}


