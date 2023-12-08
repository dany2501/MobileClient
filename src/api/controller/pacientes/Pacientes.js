import * as actions from '../../actions/pacientes/Pacientes.js'

export const createPacientes = async (formData, token) =>{
    return await actions.createPacientes(formData, token).then((response) => {
        return response;
    })
}

export const getPacientes = async (token) =>{
    return await actions.getPacientes(token).then((response) => {
        return response;
    })
}

export const retrievePacientes = async (id, token) =>{
    return await actions.retrievePacientes(id, token).then((response) => {
        return response;
    })
}

export const updatePacientes = async (id, formData, token) =>{
    return await actions.updatePacientes(id, formData, token).then((response) => {
        return response;
    })
}

export const deletePacientes = async (id, token) =>{
    return await actions.deletePacientes(id, token).then((response) => {
        return response;
    })
}



