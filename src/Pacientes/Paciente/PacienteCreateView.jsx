import React, { useState, useEffect } from 'react';
import Alert from '../../Components/Alert/Alert'
import { Text, View, ScrollView, TouchableOpacity} from 'react-native';
import * as pacientesController from '../../api/controller/pacientes/Pacientes'
import Input from '../../Components/Input/Input';
import TimePicker from '../../Components/TimePicker/TimePicker';
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();

function CreatePacientes({navigation}) {
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

	const [telefono_emergencia, setTelefono_Emergencia] = useState("");

	const [telefono, setTelefono] = useState("");

	const [fecha_nacimiento, setFecha_Nacimiento] = useState("");

	const [direccion, setDireccion] = useState("");

	const [nombre, setNombre] = useState("");

	const [curp, setCurp] = useState("");

    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

    const buttonHandler = async () => {
        const token = await sm.getTokenSession()
		if(curp === '' || curp === null ){ setAlertType('Warning'); setAlertMessage('El campo Curp es un campo obligatorio.'); setError(true); return; }
		if(nombre === '' || nombre === null ){ setAlertType('Warning'); setAlertMessage('El campo Nombre es un campo obligatorio.'); setError(true); return; }


        let request = {
			curp: curp, 
			nombre: nombre, 
			fecha_nacimiento: fecha_nacimiento, 
			direccion: direccion, 
			telefono: telefono, 
			telefono_emergencia: telefono_emergencia, 

        }

        await pacientesController.createPacientes(request, token).then(async (response)=>{
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
                        <Text className='text-3xl font-bold'>Crear Paciente</Text>
                    </View>
                    <ScrollView className='flex flex-col'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
										<Input type={"text"} placeholder={'curp'} label={'Ingresa el curp del paciente'} needed={true} onChangeText={setCurp} value={curp} />
										<Input type={"text"} placeholder={'nombre'} label={'Ingresa el nombre paciente'} needed={true} onChangeText={setNombre} value={nombre} />
                                        <TimePicker mode={"date"} label={'Ingresa la fecha de nacimiento del paciente'} needed={false} onValueChange={setFecha_Nacimiento} maximumDate={new Date()}/>
										<Input type={"text"} placeholder={'direccion'} label={'Ingresa la dirección del paciente'} needed={false} onChangeText={setDireccion} value={direccion} />
										<Input type={"text"} placeholder={'telefono'} label={'Ingresa el teléfono del paciente'} needed={false} onChangeText={setTelefono} value={telefono} />
										<Input type={"text"} placeholder={'telefono_emergencia'} label={'Ingresa el teléfono de emergencia del paciente'} needed={false} onChangeText={setTelefono_Emergencia} value={telefono_emergencia} />

                                    </View>

                                </View>
                            </View>
                            <View className='w-1/2 mb-24'>
                                <TouchableOpacity onPress={buttonHandler} className=' text-white w-full py-4 px-4 rounded-full bg-zinc-400' >
                                    <Text className='text-center text-white font-bold'>Crear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
export default CreatePacientes
