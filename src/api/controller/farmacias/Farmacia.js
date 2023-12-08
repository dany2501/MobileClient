import * as actions from '../../actions/farmacias/Farmacia.js'

export const createFarmacia = async (formData, token) =>{
    return await actions.createFarmacia(formData, token).then((response) => {
        return response;
    })
}

export const getFarmacia = async (token) =>{
    return await actions.getFarmacia(token).then((response) => {
        return response;
    })
}

export const retrieveFarmacia = async (id, token) =>{
    return await actions.retrieveFarmacia(id, token).then((response) => {
        return response;
    })
}

export const updateFarmacia = async (id, formData, token) =>{
    return await actions.updateFarmacia(id, formData, token).then((response) => {
        return response;
    })
}

export const deleteFarmacia = async (id, token) =>{
    return await actions.deleteFarmacia(id, token).then((response) => {
        return response;
    })
}


export const getClinicaNombre = async (token) =>{
    return await actions.getClinicaNombre(token).then((response) => {
        return response;
    })
}

