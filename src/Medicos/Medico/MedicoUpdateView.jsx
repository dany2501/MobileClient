import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import Alert from '../../Components/Alert/Alert';
import Input from '../../Components/Input/Input';
import CheckboxGroup from '../../Components/CheckboxGroup/CheckboxGroup';
import * as medicoController from '../../api/controller/medicos/Medico'
const sm = SessionManager.getInstance();

function UpdateMedico({route, navigation}) {

    const { medico_id } = route.params;

    const [error, setError] = React.useState(null);
    const [alertType, setAlertType] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState(null);

    const [cedula_profesional, setCedula_Profesional] = useState("");

	const [clinicaClinicaNombre, setClinicaClinicaNombre] = useState([]);

	const [nombre, setNombre] = useState("");
    const [data, setData] = useState(null);

	const [clinicaNombres, setClinicaNombres] = useState([]);


	const [flagClinicaNombres, setFlagClinicaNombres] = useState(false);

    const onSelectedItemsChange = (selectedItems) => {
        console.log(selectedItems)
        // Set Selected Items
        setClinicaClinicaNombre(selectedItems);
      };

    const getClinicaNombres = async () => {
        const token = await sm.getTokenSession()
        if(!flagClinicaNombres) {
            await medicoController.getClinicaNombre(token).then(async (response) => {
                if (response.status === 200){
                    let res = await response.json();
                    res = res.map((item) => {
                        return {id: item.id, name: item.nombre}
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
    
    
        const getMedico = async () => {
            const token = await sm.getTokenSession()
            if (data == null) {
                await medicoController.retrieveMedico(medico_id, token).then(async (response) => {
                    if (response.status === 200) {
                        let res = await response.json()
                        setData(res)
                        setNombre(res.nombre);
                        setCedula_Profesional(res.cedula_profesional);
                        let clinica = (res.clinica.map((item) => {
                            return item.id
                        }))
                        setClinicaClinicaNombre(clinica)
    
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
            getMedico();
        },[data,])
    
        const onCloseHandler = () => {
            setError(null)
            setAlertType('Error');
            setAlertMessage('')
        }
    
        const buttonHandler = async () => {
            const token = await sm.getTokenSession()
            if(nombre === '' || nombre === null ){ setAlertType('Warning'); setAlertMessage('El campo Nombre es un campo obligatorio.'); setError(true); return; }
            if(cedula_profesional === '' || cedula_profesional === null ){ setAlertType('Warning'); setAlertMessage('El campo Cedula_Profesional es un campo obligatorio.'); setError(true); return; }
    
    
            let request = {
                nombre: nombre, 
                cedula_profesional: cedula_profesional, 
                clinica: clinicaClinicaNombre, 
    
            }
    
            await medicoController.updateMedico(medico_id, request, token).then(async (response)=>{
                if (response.status === 200){
                    setAlertType('Success');
                    setAlertMessage('Actualizado correctamente.')
                    setError(true);
                    setTimeout((e) =>{navigation.goBack()},1000);
                }else{
                    setAlertType('Error');
                    setAlertMessage('Error al actualizar.')
                    setError(true);
                }
            });
        }

    return (
        <View className="w-full h-full flex flex-col bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Actualizar Médico</Text>
                    </View>
                    <View className='flex flex-col justify-between mt-10'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                        <Input type={"text"} placeholder={'nombre'} label={'Ingresa el nombre del médico'} needed={true} onChangeText={setNombre} value={nombre} />
										<Input type={"text"} placeholder={'cedula_profesional'} label={'Ingresa la cédula profesional del médico'} needed={true} onChangeText={setCedula_Profesional} value={cedula_profesional} />
                                        <CheckboxGroup title={'Ingresa las clínicas a las que pertenece'} needed={true} items={clinicaNombres} onSelectedItemsChange={onSelectedItemsChange} selectedItems={clinicaClinicaNombre}/>
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
      );
}

export default UpdateMedico
