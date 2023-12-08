import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import AlertCmp from '../../Components/Alert/Alert'
import Input from '../../Components/Input/Input';
import * as clinicaController from '../../api/controller/clinicas/Clinica'
import PropTypes from 'prop-types';
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();
function CreateClinica({ navigation }) {
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

	const [telefono, setTelefono] = useState("");

	const [direccion, setDireccion] = useState("");

	const [nombre, setNombre] = useState("");

    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

    const buttonHandler = async () => {
        const token = await sm.getTokenSession()
		if(direccion === '' || direccion === null){ setAlertType('Warning'); setAlertMessage('El campo Direccion es un campo obligatorio.'); setError(true); return; }


        let request = {
			nombre: nombre, 
			direccion: direccion, 
			telefono: telefono, 

        }

        await clinicaController.createClinica(request, token).then(async (response)=>{
            if (response.status === 201){
                setAlertType('Success');
                setAlertMessage('Creado correctamente.')
                setError(true);
                setTimeout((e) => {navigation.goBack()},1000);
            } else if(response.status == 400) {
                setAlertType('Warning');
                setAlertMessage('La información enviada no cumple el formato requerido.')
                setError(true);
            } else{
                setAlertType('Error');
                setAlertMessage('Error al crear.')
                setError(true);
            }
        });
    }

    return (
        <View className="w-full h-full bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Crear Clinica</Text>
                    </View>
                    <View className='flex flex-col justify-between'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <AlertCmp type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
										<Input type={"text"} placeholder={'Nombre'} label={'Ingresa el nombre de la clínica'} needed={false}  onChangeText={setNombre} value={nombre} />
										<Input type={"text"} placeholder={'Direccion'} label={'Ingresa la dirección de la clínica'} needed={true} onChangeText={setDireccion} value={direccion} />
										<Input type={"time"} placeholder={'Teléfono'} label={'Ingresa el teléfono de la clínica'} needed={false} onChangeText={setTelefono} value={telefono} />
                                    </View>

                                </View>
                            </View>
                            <View className='w-1/2'>
                                <TouchableOpacity onPress={buttonHandler} className=' text-white w-full py-4 px-4 rounded-full bg-zinc-400' >
                                    <Text className='text-center text-white font-bold'>Crear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreateClinica
