import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AlertCmp from '../../Components/Alert/Alert'
import Input from '../../Components/Input/Input';
import * as citaController from '../../api/controller/citas/Cita'
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();
function RetrieveCita({ route, navigation }) {
    const { cita_id } = route.params;
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

    const [data, setData] = useState(null);

	const [medico, setMedico] = useState(null);

	const [paciente, setPaciente] = useState(null);

	const [hora, setHora] = useState("");

	const [testing, setTesting] = useState(null);

	const [fecha, setFecha] = useState("");

    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

    const getCita = async () => {
        const token = await sm.getTokenSession()
        if (data == null) {
            await citaController.retrieveCita(cita_id, token).then(async (response) => {
                console.log(response)
                if (response.status === 200) {
                    let res = await response.json()
                    setData(res)
					setPaciente(res.paciente.nombre);
					setMedico(res.medico.cedula_profesional);
					setFecha(res.fecha);
					setHora(res.hora);
					setTesting(res.Testing.existencia);

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
        getCita();
    },[data, ])

    return (
        <View className="w-full h-full bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Visualizar Cita</Text>
                    </View>
                    <View className='flex flex-col justify-between'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <AlertCmp type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                        <Input type="text" placeholder={'paciente'} label={'Paciente'} value={paciente} disabledInput={true} />
										<Input type="text" placeholder={'medico'} label={'Medico'} value={medico} disabledInput={true} />
										<Input type="text" placeholder={'fecha'} label={'Fecha'} value={fecha} disabledInput={true} />
										<Input type="text" placeholder={'hora'} label={'Hora'} value={hora} disabledInput={true} />
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RetrieveCita
