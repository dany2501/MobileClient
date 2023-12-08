import * as actions from '../../actions/citas/Cita.js'

export const createCita = async (formData, token) =>{
    return await actions.createCita(formData, token).then((response) => {
        return response;
    })
}

export const getCita = async (token) =>{
    return await actions.getCita(token).then((response) => {
        return response;
    })
}

export const retrieveCita = async (id, token) =>{
    return await actions.retrieveCita(id, token).then((response) => {
        return response;
    })
}

export const updateCita = async (id, formData, token) =>{
    return await actions.updateCita(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteCita = async (id, token) =>{
    return await actions.deleteCita(id, token).then((response) => {
        return response;
    })
}


export const getPacientesNombre = async (token) =>{
    return await actions.getPacientesNombre(token).then((response) => {
        return response;
    })
}


export const getMedicoCedula_Profesional = async (token) =>{
    return await actions.getMedicoCedula_Profesional(token).then((response) => {
        return response;
    })
}


export const getMedicamentoExistencia = async (token) =>{
    return await actions.getMedicamentoExistencia(token).then((response) => {
        return response;
    })
}

