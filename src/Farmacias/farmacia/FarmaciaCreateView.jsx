import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import PropTypes from 'prop-types';
import Alert from '../../Components/Alert/Alert';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';

import * as farmaciaController from '../../api/controller/farmacias/Farmacia'
const sm = SessionManager.getInstance();

function CreateFarmacia({navigation}) {

    const [error, setError] = React.useState(null);
    const [alertType, setAlertType] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState(null);

    const [nombre, setNombre] = useState("");
    const [clinicaNombres, setClinicaNombres] = useState([]);
    const [flagClinicaNombres, setFlagClinicaNombres] = useState(false);
    const [clinicaClinicaNombre, setClinicaClinicaNombre] = useState(null);

    const onCloseHandler = () => {}

    useEffect(() => {
        getClinicaNombres();
    }, [error, alertType, alertMessage, nombre, clinicaNombres, flagClinicaNombres]);

    const getClinicaNombres = async () => {
        if(!flagClinicaNombres) {
            const token = await sm.getTokenSession()
            await farmaciaController.getClinicaNombre(token).then(async (response) => {
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

    const handleCreate = async () => {
        const token = await sm.getTokenSession()
        const body = {
            nombre: nombre, 
			clinica: clinicaClinicaNombre, 
        }

        console.log("body", body);
        console.log("token", token)
        await farmaciaController.createFarmacia(body, token).then(async (response) => {
            let res = await response.json();
            console.log("res", res)
            if (response.status === 201){
                setAlertType('Success');
                setAlertMessage('Farmacia creada correctamente.');
                setError(true);
            } else{
                setAlertType('Error');
                setAlertMessage('Error al crear Farmacia.')
                setError(true);
            }
        });
    }

    return (
        <View className="w-full h-full flex flex-col bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Crear Farmacia</Text>
                    </View>
                    <View className='flex flex-col justify-between mt-10'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                        <Input type={"text"} placeholder={'Nombre'} label={'Nombre'} needed={true} onChangeText={setNombre} value={nombre} />
                                        <Select items={clinicaNombres} label={'Clinica'} needed={true} onValueChange={setClinicaClinicaNombre} value={clinicaClinicaNombre}/>
                                    </View>

                                </View>
                            </View>
                            <View className='w-1/2'>
                                <TouchableOpacity onPress={handleCreate} className=' text-white w-full py-4 px-4 rounded-full bg-zinc-400' >
                                    <Text className='text-center text-white font-bold'>Crear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
      );
}

export default CreateFarmacia
