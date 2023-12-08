import apiClient from '../../client';

export const createMedicamento = async (formData, token) =>{
    const objApi = apiClient('farmacias/medicamento/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getMedicamento = async (token) =>{
    
    const objApi = apiClient('farmacias/medicamento/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveMedicamento = async (id, token) =>{
    
    const objApi = apiClient('farmacias/medicamento/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateMedicamento = async (id, formData, token) =>{
    const objApi = apiClient('farmacias/medicamento/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteMedicamento = async (id, token) =>{
    const objApi = apiClient('farmacias/medicamento/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getFarmaciaNombre = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('farmacias/medicamento/get-farmacia/nombre/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

