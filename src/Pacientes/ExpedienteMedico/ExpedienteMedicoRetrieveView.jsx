import React, { useState, useEffect } from 'react';
import Alert from '../../Components/Alert/Alert'
import { Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { retrieveExpedienteMedico } from '../../api/controller/pacientes/ExpedienteMedico'
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();

function RetrieveExpedienteMedico({route, navigation}) {
    const { expedientemedico_id } = route.params;
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

    const [data, setData] = useState(null);

    const [descripcion, setDescripcion] = useState("");

    const [paciente, setPaciente] = useState(null);


    const getExpedientemedico = async () => {
      const token = await sm.getTokenSession();
        if (data == null) {
            await retrieveExpedienteMedico(expedientemedico_id, token).then(async (response) => {
                console.log(response)
                if (response.status === 200) {
                    let res = await response.json()
                    setData(res)
                    setPaciente(res.paciente.nombre);
                    setDescripcion(res.descripcion);

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
        getExpedientemedico();
    },[data, ])


    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

    return (
        <View className="w-full h-full bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Visualizar ExpedienteMedico</Text>
                    </View>
                    <ScrollView className='flex flex-col'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                      <Input type={"text"} placeholder={'paciente'} label={'Paciente'} value={paciente} disabledInput={true} />
                                      <Input type={"text"} placeholder={'descripcion'} label={'Descripción del expediente médico'} disabledInput={true} value={descripcion} multiline={true} />
                                      
                                    </View>

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
export default RetrieveExpedienteMedico
