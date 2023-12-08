import * as actions from '../../actions/farmacias/Medicamento.js'

export const createMedicamento = async (formData, token) =>{
    return await actions.createMedicamento(formData, token).then((response) => {
        return response;
    })
}

export const getMedicamento = async (token) =>{
    return await actions.getMedicamento(token).then((response) => {
        return response;
    })
}

export const retrieveMedicamento = async (id, token) =>{
    return await actions.retrieveMedicamento(id, token).then((response) => {
        return response;
    })
}

export const updateMedicamento = async (id, formData, token) =>{
    return await actions.updateMedicamento(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteMedicamento = async (id, token) =>{
    return await actions.deleteMedicamento(id, token).then((response) => {
        return response;
    })
}


export const getFarmaciaNombre = async (token) =>{
    return await actions.getFarmaciaNombre(token).then((response) => {
        return response;
    })
}

