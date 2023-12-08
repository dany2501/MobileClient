import apiClient from '../../client';

export const createCita = async (formData, token) =>{
    const objApi = apiClient('citas/cita/');
    try {
        var response = await objApi.post(formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getCita = async (token) =>{
    
    const objApi = apiClient('citas/cita/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const retrieveCita = async (id, token) =>{
    
    const objApi = apiClient('citas/cita/' + id + '/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const updateCita = async (id, formData, token) =>{
    const objApi = apiClient('citas/cita/');
    try {
        var response = await objApi.patch(id, formData, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const deleteCita = async (id, token) =>{
    const objApi = apiClient('citas/cita/');
    try {
        var response = await objApi.del(id, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

export const getMedicamentoExistencia = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('citas/cita/get-medicamento/existencia/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}


export const getMedicoCedula_Profesional = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('citas/cita/get-medico/cedula_profesional/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}


export const getPacientesNombre = async (token) =>{
    console.log("token", token);
    const objApi = apiClient('citas/cita/get-pacientes/nombre/');
    try {
        var response = await objApi.get(undefined, token);
        return response;
    } catch (e) {
        console.log("Error ===>", e);
    }
}

