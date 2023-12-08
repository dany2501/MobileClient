import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import { retrieveConsultorio } from '../../api/controller/clinicas/Consultorio'
import Alert from '../../Components/Alert/Alert';
import Input from '../../Components/Input/Input';
const sm = SessionManager.getInstance();
function RetrieveConsultorio({route, navigation}) {

    const {consultorio_id} = route.params;
    const [error, setError] = React.useState(null);
    const [alertType, setAlertType] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const [data, setData] = useState(null);

    const [clinica, setClinica] = useState(null);

    const [nombre, setNombre] = useState("");


      const getConsultorio = async () => {
        const token = await sm.getTokenSession()
          if (data == null) {
              await retrieveConsultorio(consultorio_id, token).then(async (response) => {
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
                  setError(error)
                  setAlertMessage(error)
              })
          }

      }

      useEffect(() => {
          getConsultorio();
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
                    <Text className='text-3xl font-bold'>Visualizar Consultorio</Text>
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

export default RetrieveConsultorio
