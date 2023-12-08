import React, {useState, useEffect} from 'react';
import { Text, View} from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import Alert from '../../Components/Alert/Alert';
import Input from '../../Components/Input/Input';
import CheckboxGroup from '../../Components/CheckboxGroup/CheckboxGroup';
import * as medicoController from '../../api/controller/medicos/Medico'
const sm = SessionManager.getInstance();
function RetrieveMedico({route, navigation}) {
    const { medico_id } = route.params;

    const [error, setError] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [data, setData] = useState(null);

    const [cedula_profesional, setCedula_Profesional] = useState("");

	const [nombre, setNombre] = useState("");

	const [clinica, setClinica] = useState([]);

    const [flagClinicaNombres, setFlagClinicaNombres] = useState(false);
    const [clinicaNombres, setClinicaNombres] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
        // Set Selected Items
        setClinica(selectedItems);
      };

    const getMedico = async () => {
        const token = await sm.getTokenSession()
        if (data == null) {
            await medicoController.retrieveMedico(medico_id, token).then(async (response) => {
                console.log(response)
                if (response.status === 200) {
                    let res = await response.json()
                    setData(res)
					setNombre(res.nombre);
					setCedula_Profesional(res.cedula_profesional);
                    let clinica = (res.clinica.map((item) => {
                        return item.id
                    }))
					setClinica(clinica);

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
        getClinicaNombres();
    }, [error, alertType, alertMessage, nombre, clinicaNombres, flagClinicaNombres]);

    const getClinicaNombres = async () => {
        if(!flagClinicaNombres) {
            const token = await sm.getTokenSession()
            await medicoController.getClinicaNombre(token).then(async (response) => {
                if (response.status === 200){
                    let res = await response.json();
                    res = res.map((item) => {
                        return {id: item.id, name: item.nombre}
                    })
                    console.log("res", res)
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

  const onCloseHandler = () => {
    setError(null)
    setAlertType('Error');
    setAlertMessage('')
  }

    useEffect(() => {
        getMedico();
    },[data, ])

    return (
      <View className="w-full h-full bg-slate-100">
          <View className='flex flex-row h-full'>
              <View className='w-full'>
                  <View className='mt-3 ml-5 flex justify-center'>
                      <Text className='text-3xl font-bold'>Visualizar Medico</Text>
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
										<Input type="text" placeholder={'cedula_profesional'} label={'Cedula_Profesional'} value={cedula_profesional} disabledInput={true} />
										<CheckboxGroup title={'Clínicas a las que pertenece'} disabledInput={true} items={clinicaNombres} onSelectedItemsChange={onSelectedItemsChange} selectedItems={clinica}/>

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

export default RetrieveMedico
