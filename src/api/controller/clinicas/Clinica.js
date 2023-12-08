import * as actions from '../../actions/clinicas/Clinica.js'

export const createClinica = async (formData, token) =>{
    return await actions.createClinica(formData, token).then((response) => {
        return response;
    })
}

export const getClinica = async (token) =>{
    return await actions.getClinica(token).then((response) => {
        return response;
    })
}

export const retrieveClinica = async (id, token) =>{
    return await actions.retrieveClinica(id, token).then((response) => {
        return response;
    })
}

export const updateClinica = async (id, formData, token) =>{
    return await actions.updateClinica(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteClinica = async (id, token) =>{
    return await actions.deleteClinica(id, token).then((response) => {
        return response;
    })
}



