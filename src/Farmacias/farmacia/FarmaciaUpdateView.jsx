import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Input from '../../Components/Input/Input';
import Alert from '../../Components/Alert/Alert';
import Select from '../../Components/Select/Select';
import SessionManager from '../../api/manager/SessionManager';
import * as farmaciaController from '../../api/controller/farmacias/Farmacia'
const sm = SessionManager.getInstance();

function UpdateFarmacia({route, navigation}) {
    const { farmacia_id } = route.params;
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
  
  
        useEffect(() => {
          getClinicaNombres();
      }, [clinicaNombres]);
  
  
      const getFarmacia = async () => {
        const token = await sm.getTokenSession()
          if (data == null) {
              await farmaciaController.retrieveFarmacia(farmacia_id, token).then(async (response) => {
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
          getFarmacia();
      },[data,])
  
      const onCloseHandler = () => {
          setError(null)
          setAlertType('Error');
          setAlertMessage('')
      }

    const handleUpdate = async () => {
      const token = await sm.getTokenSession()
      if(nombre === '' || nombre === null ){ setAlertType('Warning'); setAlertMessage('El campo Nombre es un campo obligatorio.'); setError(true); return; }
  
  
          let request = {
            nombre: nombre, 
            clinica: clinicaClinicaNombre, 
          }
  
          await farmaciaController.updateFarmacia(farmacia_id, request, token).then(async (response)=>{
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
                    <Text className='text-3xl font-bold'>Actualizar Farmacia</Text>
                </View>
                <View className='flex flex-col justify-between'>
                    <View className='mt-5 p-5 flex flex-col items-center m-auto w-full mt-5 rounded-2xl bg-white'>

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
                            <TouchableOpacity onPress={handleUpdate} className=' text-white w-full py-4 px-4 rounded-full bg-zinc-400' >
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

export default UpdateFarmacia
