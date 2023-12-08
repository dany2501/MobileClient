import React, { useState, useEffect } from 'react';
import Alert from '../../Components/Alert/Alert'
import { Text, View, ScrollView, TouchableOpacity} from 'react-native';
import * as expedientemedicoController from '../../api/controller/pacientes/ExpedienteMedico'
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import SessionManager from '../../api/manager/SessionManager';
const sm = SessionManager.getInstance();

function CreateExpedienteMedico({navigation}) {
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

    const [pacientePacientesNombre, setPacientePacientesNombre] = useState(null);

    const [descripcion, setDescripcion] = useState("");
  
  
    const [pacientesNombres, setPacientesNombres] = useState([]);
  
  
  
  
    const [flagPacientesNombres, setFlagPacientesNombres] = useState(false);
  
  
    const getPacientesNombres = async () => {
      const token = await sm.getTokenSession();
      if(!flagPacientesNombres) {
          await expedientemedicoController.getPacientesNombre(token).then(async (response) => {
              if (response.status === 200){
                  let res = await response.json();
                  res = res.map((item) => {
                      return {value: item.id, label: item.nombre}
                  })
                  setPacientesNombres(res);
                  setFlagPacientesNombres(true);
              } else{
                  setAlertType('Error');
                  setAlertMessage('Error al cargar Pacientess.')
                  setError(true);
              }
          });
      }
  }
  
  
    useEffect(() => {
          getPacientesNombres();
      }, [pacientesNombres]);
  
  
  
      const onCloseHandler = () => {
          setError(null)
          setAlertType('Error');
          setAlertMessage('')
      }
  
      const buttonHandler = async () => {
        const token = await sm.getTokenSession();
  
          let request = {
            paciente: pacientePacientesNombre, 
            descripcion: descripcion, 
  
          }
  
          await expedientemedicoController.createExpedienteMedico(request, token).then(async (response)=>{
              if (response.status === 201){
                  setAlertType('Success');
                  setAlertMessage('Creado correctamente.')
                  setError(true);
                  setTimeout((e) =>{navigation.goBack()},1000);
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
        <View className="w-full h-full bg-slate-100">
            <View className='flex flex-row h-full'>
                <View className='w-full'>
                    <View className='mt-3 ml-5 flex justify-center'>
                        <Text className='text-3xl font-bold'>Crear ExpedienteMedico</Text>
                    </View>
                    <ScrollView className='flex flex-col'>
                        <View className='mt-5 p-5 flex flex-col items-center m-auto w-full rounded-2xl bg-white'>

                            <View className="w-full overflow-hidden">
                                <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                            </View>

                            <View className='mt-5 w-full items-center flex flex-row'>

                                <View className='w-full flex flex-col items-center'>

                                    <View className='w-full flex flex-col justify-between'>
                                      <Select label={'Ingresa el paciente al que pertenece el expediente médico'} needed={false} onValueChange={setPacientePacientesNombre} value={pacientePacientesNombre} items={pacientesNombres} />
                                      <Input type={"text"} placeholder={'descripcion'} label={'Ingresa la descripción del expediente médico'} needed={true} onChangeText={setDescripcion} value={descripcion} multiline={true} />
                                      
                                    </View>

                                </View>
                            </View>
                            <View className='w-1/2'>
                                <TouchableOpacity onPress={buttonHandler} className=' text-white w-full py-4 px-4 rounded-full bg-zinc-400' >
                                    <Text className='text-center text-white font-bold'>Crear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}
export default CreateExpedienteMedico
