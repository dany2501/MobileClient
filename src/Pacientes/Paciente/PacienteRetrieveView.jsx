import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView} from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import Alert from '../../Components/Alert/Alert';
import Input from '../../Components/Input/Input';
import { retrievePacientes } from '../../api/controller/pacientes/Pacientes'
const sm = SessionManager.getInstance();
function RetrieveMedico({route, navigation}) {
    const { paciente_id } = route.params;

    const [error, setError] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const [data, setData] = useState(null);

	const [telefono_emergencia, setTelefono_Emergencia] = useState("");

	const [telefono, setTelefono] = useState("");

	const [fecha_nacimiento, setFecha_Nacimiento] = useState("");

	const [direccion, setDireccion] = useState("");

	const [nombre, setNombre] = useState("");

	const [curp, setCurp] = useState("");

    const getPacientes = async () => {
        const token = await sm.getTokenSession()
        if (data == null) {
            await retrievePacientes(paciente_id, token).then(async (response) => {
                console.log(response)
                if (response.status === 200) {
                    let res = await response.json()
                    setData(res)
					setCurp(res.curp);
					setNombre(res.nombre);
					setFecha_Nacimiento(res.fecha_nacimiento);
					setDireccion(res.direccion);
					setTelefono(res.telefono);
					setTelefono_Emergencia(res.telefono_emergencia);

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
        getPacientes();
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
                        <Text className='text-3xl font-bold'>Visualizar Paciente</Text>
                    </View>
                    <ScrollView className='flex flex-col mt-5'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                            <Input type="text" placeholder={'curp'} label={'Curp'} value={curp} disabledInput={true} />
                                            <Input type="text" placeholder={'nombre'} label={'Nombre'} value={nombre} disabledInput={true} />
                                            <Input type="date" placeholder={'fecha_nacimiento'} label={'Fecha_Nacimiento'} value={fecha_nacimiento} disabledInput={true} />
                                            <Input type="text" placeholder={'direccion'} label={'Direccion'} value={direccion} disabledInput={true} />
                                            <Input type="text" placeholder={'telefono'} label={'Telefono'} value={telefono} disabledInput={true} />
                                            <Input type="text" placeholder={'telefono_emergencia'} label={'Telefono_Emergencia'} value={telefono_emergencia} disabledInput={true} />

                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
      );
}

export default RetrieveMedico
