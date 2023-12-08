import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import AlertCmp from '../../Components/Alert/Alert'
import TimePicker from '../../Components/TimePicker/TimePicker';
import Select from '../../Components/Select/Select';
import * as citaController from '../../api/controller/citas/Cita'
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();
function CreateCita({ navigation }) {
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

    const [medicoMedicoCedula_Profesional, setMedicoMedicoCedula_Profesional] = useState(null);

	const [pacientePacientesNombre, setPacientePacientesNombre] = useState(null);

	const [hora, setHora] = useState('');

	const [fecha, setFecha] = useState('');

	const [medicoCedula_Profesionals, setMedicoCedula_Profesionals] = useState([]);

	const [pacientesNombres, setPacientesNombres] = useState([]);




	const [flagPacientesNombres, setFlagPacientesNombres] = useState(false);

	const [flagMedicoCedula_Profesionals, setFlagMedicoCedula_Profesionals] = useState(false);

    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

    const getPacientesNombres = async () => {
        const token = await sm.getTokenSession()
        if(!flagPacientesNombres) {
            await citaController.getPacientesNombre(token).then(async (response) => {
                if (response.status === 200){
                    let res = await response.json();
                    res = res.map((item) => {
                        return {value: item.id, label: item.nombre}
                    })
                    setPacientesNombres(res);
                    setFlagPacientesNombres(true);
                } else{
                    setAlertType('Error');
                    setAlertMessage('Error al cargar Pacientess.')
                    setError(true);
                }
            });
        }
    }
    
        const getMedicoCedula_Profesionals = async () => {
            const token = await sm.getTokenSession()
            if(!flagMedicoCedula_Profesionals) {
                await citaController.getMedicoCedula_Profesional(token).then(async (response) => {
                    if (response.status === 200){
                        let res = await response.json();
                        res = res.map((item) => {
                            return {value: item.id, label: item.cedula_profesional}
                        })
                        setMedicoCedula_Profesionals(res);
                        setFlagMedicoCedula_Profesionals(true);
                    } else{
                        setAlertType('Error');
                        setAlertMessage('Error al cargar Medicos.')
                        setError(true);
                    }
                });
            }
    }
    
        useEffect(() => {
            getPacientesNombres();
        }, [pacientesNombres]);
    
        useEffect(() => {
            getMedicoCedula_Profesionals();
        }, [medicoCedula_Profesionals]);
    
        const buttonHandler = async () => {
            const token = await sm.getTokenSession()

            console.log("fecha", fecha)
            console.log("hora", hora)

            if (pacientePacientesNombre == null){
                setAlertType('Warning');
                setAlertMessage('Ingresa un paciente.')
                setError(true);
                return;
            }
            if (medicoMedicoCedula_Profesional == null){
                setAlertType('Warning');
                setAlertMessage('Ingresa un médico.')
                setError(true);
                return;
            }
            if (fecha == ""){
                setAlertType('Warning');
                setAlertMessage('Ingresa una fecha.')
                setError(true);
                return;
            }
            if (hora == ""){
                setAlertType('Warning');
                setAlertMessage('Ingresa una hora.')
                setError(true);
                return;
            }
    
    
            let request = {
                paciente: pacientePacientesNombre, 
                medico: medicoMedicoCedula_Profesional, 
                fecha: fecha, 
                hora: hora
            }
    
            await citaController.createCita(request, token).then(async (response)=>{

                let res = await response.json();
                console.log("==res==",res)
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
                        <Text className='text-3xl font-bold'>Crear Cita</Text>
                    </View>
                    <View className='flex flex-col justify-between'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <AlertCmp type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                        <Select items={pacientesNombres} label={'Ingresa el paciente al que pertenece la cita'} needed={true} onValueChange={setPacientePacientesNombre} value={pacientePacientesNombre}/>
                                        <Select items={medicoCedula_Profesionals} label={'Ingresa el médico al que pertenece la cita'} needed={true} onValueChange={setMedicoMedicoCedula_Profesional} value={medicoMedicoCedula_Profesional}/>
										<TimePicker mode={"date"} label={'Ingresa la fecha de la cita'} needed={false} onValueChange={setFecha} minimumDate={new Date()}/>
                                        <TimePicker mode={"time"} label={'Ingresa la hora de la cita'} needed={false} onValueChange={setHora} minimumDate={new Date()}/>
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

export default CreateCita
