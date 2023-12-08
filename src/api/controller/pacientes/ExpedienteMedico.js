import * as actions from '../../actions/pacientes/ExpedienteMedico.js'

export const createExpedienteMedico = async (formData, token) =>{
    return await actions.createExpedienteMedico(formData, token).then((response) => {
        return response;
    })
}

export const getExpedienteMedico = async (token) =>{
    return await actions.getExpedienteMedico(token).then((response) => {
        return response;
    })
}

export const retrieveExpedienteMedico = async (id, token) =>{
    return await actions.retrieveExpedienteMedico(id, token).then((response) => {
        return response;
    })
}

export const updateExpedienteMedico = async (id, formData, token) =>{
    return await actions.updateExpedienteMedico(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteExpedienteMedico = async (id, token) =>{
    return await actions.deleteExpedienteMedico(id, token).then((response) => {
        return response;
    })
}


export const getPacientesNombre = async (token) =>{
    return await actions.getPacientesNombre(token).then((response) => {
        return response;
    })
}

