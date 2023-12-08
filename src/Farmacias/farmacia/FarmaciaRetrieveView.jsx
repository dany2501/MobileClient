import React, {useEffect, useState} from 'react';
import { Text, View, Button, Image } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import Input from '../../Components/Input/Input';
import Alert from '../../Components/Alert/Alert';
import { retrieveFarmacia } from '../../api/controller/farmacias/Farmacia'
import PropTypes from 'prop-types';
const sm = SessionManager.getInstance();
function RetrieveFarmacia({route, navigation}) {
    const { farmacia_id } = route.params;

    const [nombre, setNombre] = useState('');
    const [clinica, setClinica] = useState('');
    const [error, setError] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [data, setData] = useState(null);

    const getFarmacia = async () => {
      if (data == null) {
        const token = await sm.getTokenSession()
        await retrieveFarmacia(farmacia_id, token).then(async (response) => {
            console.log(response)
            if (response.status === 200) {
                let res = await response.json()
                setData(res)
                setNombre(res.nombre);
                setClinica(res.clinica.nombre);

            } else {
                setError(response.data.message)
                setAlertMessage(response.data.message)
            }
        }).catch((error) => {
            console.log(error)
        })
      }

  }

  const onCloseHandler = () => {
    setError(null)
    setAlertType('Error');
    setAlertMessage('')
  }

  useEffect(() => {
      getFarmacia();
  },[data, ])

    return (
      <View className="w-full h-full bg-slate-100">
          <View className='flex flex-row h-full'>
              <View className='w-full'>
                  <View className='mt-3 ml-5 flex justify-center'>
                      <Text className='text-3xl font-bold'>Visualizar Farmacia</Text>
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
                                    <Input type="text" placeholder={'clinica'} label={'Clinica'} value={clinica} disabledInput={true} />

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


RetrieveFarmacia.propTypes = {
  farmacia_id: PropTypes.number
}

export default RetrieveFarmacia
