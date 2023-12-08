import React, {useEffect, useState} from 'react';
import { Text, View, Button, Image } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import Input from '../../Components/Input/Input';
import Alert from '../../Components/Alert/Alert';
import { retrieveMedicamento } from '../../api/controller/farmacias/Medicamento'
const sm = SessionManager.getInstance();
function RetrieveMedicamento({route, navigation}) {
    const { medicamento_id } = route.params;

    const [nombre, setNombre] = useState('');
    const [farmacia, setFarmacia] = useState('');
    const [existencia, setExistencia] = useState('');
    const [error, setError] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [data, setData] = useState(null);

    const getMedicamento = async () => {
        const token = await sm.getTokenSession()
        if (data == null) {
            await retrieveMedicamento(medicamento_id, token).then(async (response) => {
                if (response.status === 200) {
                    let res = await response.json()
                    console.log("===res===",res.existencia)
                    setData(res)
					setNombre(res.nombre);
					setExistencia(res.existencia.toString());
					setFarmacia(res.farmacia.nombre);

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
        getMedicamento();
    },[data, nombre, existencia, farmacia])


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
                      <Text className='text-3xl font-bold'>Visualizar Medicamento</Text>
                  </View>
                  <View className='flex flex-col justify-between mt-5'>
                      <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                          <View className="w-full overflow-hidden">
                              <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                          </View>

                          <View className='mt-5 w-full items-center flex flex-row'>

                              <View className='w-full flex flex-col items-center'>

                                  <View className='w-full flex flex-col justify-between'>
                                    <Input type="text" placeholder={'nombre'} label={'Nombre'} value={nombre} disabledInput={true} />
                                    <Input type="text" placeholder={'existencia'} label={'Existencia'} value={existencia} disabledInput={true} />
                                    <Input type="text" placeholder={'clinica'} label={'Farmacia'} value={farmacia} disabledInput={true} />

                                  </View>
                              </View>
                          </View>
                      </View>
                  </View>
              </View>
          </View>
      </View>
      );
}

export default RetrieveMedicamento
