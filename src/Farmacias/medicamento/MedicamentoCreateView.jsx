import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import Alert from '../../Components/Alert/Alert';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';

import * as medicamentoController from '../../api/controller/farmacias/Medicamento'
const sm = SessionManager.getInstance();

function CreateMedicamento({navigation}) {

    const [error, setError] = React.useState(null);
    const [alertType, setAlertType] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState(null);

    const [existencia, setExistencia] = useState(0);

	const [nombre, setNombre] = useState("");

	const [farmaciaFarmaciaNombre, setFarmaciaFarmaciaNombre] = useState(null);


	const [farmaciaNombres, setFarmaciaNombres] = useState([]);

    const [flagFarmaciaNombres, setFlagFarmaciaNombres] = useState(false);

    const getFarmaciaNombres = async () => {
        const token = await sm.getTokenSession()
        if(!flagFarmaciaNombres) {
            await medicamentoController.getFarmaciaNombre(token).then(async (response) => {
                if (response.status === 200){
                    let res = await response.json();
                    res = res.map((item) => {
                        return {value: item.id, label: item.nombre}
                    })
                    setFarmaciaNombres(res);
                    setFlagFarmaciaNombres(true);
                } else{
                    setAlertType('Error');
                    setAlertMessage('Error al cargar Farmacias.')
                    setError(true);
                }
            });
        }
    }
    
    
        useEffect(() => {
            getFarmaciaNombres();
        }, [farmaciaNombres]);
    
    
    
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
                existencia: existencia, 
                farmacia: farmaciaFarmaciaNombre, 
    
            }
    
            await medicamentoController.createMedicamento(request, token).then(async (response)=>{
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
        <View className="w-full h-full flex flex-col bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Crear Medicamento</Text>
                    </View>
                    <View className='flex flex-col justify-between mt-10'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                        <Input type={"text"} placeholder={'nombre'} label={'Ingresa el nombre del medicamento'} needed={true} onChangeText={setNombre} value={nombre} />
                                        <Input type={"number"} placeholder={'existencia'} label={'Ingresa la existencia del medicamento'} needed={false} onChangeText={setExistencia} value={existencia} />
                                        <Select label={'Ingresa la farmacia a la que pertenece el medicamento'} needed={false} onValueChange={setFarmaciaFarmaciaNombre} value={farmaciaFarmaciaNombre} items={farmaciaNombres} />
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
      );
}

export default CreateMedicamento
