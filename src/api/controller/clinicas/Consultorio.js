import * as actions from '../../actions/clinicas/Consultorio.js'

export const createConsultorio = async (formData, token) =>{
    return await actions.createConsultorio(formData, token).then((response) => {
        return response;
    })
}

export const getConsultorio = async (token) =>{
    return await actions.getConsultorio(token).then((response) => {
        return response;
    })
}

export const retrieveConsultorio = async (id, token) =>{
    return await actions.retrieveConsultorio(id, token).then((response) => {
        return response;
    })
}

export const updateConsultorio = async (id, formData, token) =>{
    return await actions.updateConsultorio(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteConsultorio = async (id, token) =>{
    return await actions.deleteConsultorio(id, token).then((response) => {
        return response;
    })
}


export const getClinicaNombre = async (token) =>{
    return await actions.getClinicaNombre(token).then((response) => {
        return response;
    })
}

