import * as actions from '../../actions/medicos/Medico.js'

export const createMedico = async (formData, token) =>{
    return await actions.createMedico(formData, token).then((response) => {
        return response;
    })
}

export const getMedico = async (token) =>{
    return await actions.getMedico(token).then((response) => {
        return response;
    })
}

export const retrieveMedico = async (id, token) =>{
    return await actions.retrieveMedico(id, token).then((response) => {
        return response;
    })
}

export const updateMedico = async (id, formData, token) =>{
    return await actions.updateMedico(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteMedico = async (id, token) =>{
    return await actions.deleteMedico(id, token).then((response) => {
        return response;
    })
}


export const getClinicaNombre = async (token) =>{
    return await actions.getClinicaNombre(token).then((response) => {
        return response;
    })
}

