import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import AlertCmp from '../../Components/Alert/Alert'
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import * as consultorioController from '../../api/controller/clinicas/Consultorio'
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();
function CreateConsultorio({ route, navigation }) {

    const { consultorio_id } = route.params;
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

    const [data, setData] = useState(null);

	const [clinicaClinicaNombre, setClinicaClinicaNombre] = useState(null);

	const [nombre, setNombre] = useState("");


	const [clinicaNombres, setClinicaNombres] = useState([]);




	const [flagClinicaNombres, setFlagClinicaNombres] = useState(false);


    	const getClinicaNombres = async () => {
        const token = await sm.getTokenSession()
    if(!flagClinicaNombres) {
        await consultorioController.getClinicaNombre(token).then(async (response) => {
            if (response.status === 200){
                let res = await response.json();
                res = res.map((item) => {
                    return {value: item.id, label: item.nombre}
                })
                setClinicaNombres(res);
                setFlagClinicaNombres(true);
            } else{
                setAlertType('Error');
                setAlertMessage('Error al cargar Clinicas.')
                setError(true);
            }
        });
    }
}


    	useEffect(() => {
        getClinicaNombres();
    }, [clinicaNombres]);


    const getConsultorio = async () => {
      const token = await sm.getTokenSession()
        if (data == null) {
            await consultorioController.retrieveConsultorio(consultorio_id, token).then(async (response) => {
                console.log(response)
                if (response.status === 200) {
                    let res = await response.json()
                    setData(res)
                    setNombre(res.nombre);
                    setClinicaClinicaNombre(res.clinica.id);

                } else {
                    setError(response.data.message)
                    setAlertMessage(response.data.message)
                }
            }).catch((error) => {
                console.log(error)
            })
        }

    }

    useEffect(() => {
        getConsultorio();
    },[data,])

    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

    const buttonHandler = async () => {
      const token = await sm.getTokenSession()
		if(nombre === '' || nombre === null){ setAlertType('Warning'); setAlertMessage('El campo Nombre es un campo obligatorio.'); setError(true); return; }


        let request = {
          nombre: nombre, 
          clinica: clinicaClinicaNombre, 

        }

        await consultorioController.updateConsultorio(consultorio_id, request, token).then(async (response)=>{
            if (response.status === 200){
                setAlertType('Success');
                setAlertMessage('Actualizado correctamente.')
                setError(true);
                setTimeout((e) => {navigation.goBack()},1000);
            }else{
                setAlertType('Error');
                setAlertMessage('Error al actualizar.')
                setError(true);
            }
        });
    }

    return (
        <View className="w-full h-full bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Crear Consultorio</Text>
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
                                      <Select label={'Ingresa la clínica a la que pertenece el consultorio'} needed={false} onValueChange={setClinicaClinicaNombre} value={clinicaClinicaNombre} items={clinicaNombres} />
                                    </View>

                                </View>
                            </View>
                            <View className='w-1/2'>
                                <TouchableOpacity onPress={buttonHandler} className=' text-white w-full py-4 px-4 rounded-full bg-zinc-400' >
                                    <Text className='text-center text-white font-bold'>Actualizar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreateConsultorio
