import React from 'react';
import { Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import DynamicTable from '../../Components/Table/DynamicTable';
import { getPacientes, deletePacientes } from '../../api/controller/pacientes/Pacientes';
import AlertCmp from '../../Components/Alert/Alert';
const sm = SessionManager.getInstance();
function ListPaciente({navigation}) {

    const [paciente, setPacientes] = React.useState([])
    const [error, setError] = React.useState(null);
    const [alertType, setAlertType] = React.useState(null);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const [flag, setFlag] = React.useState(false);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setFlag(false)
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);

    React.useEffect(() => {
        getPaciente()
    }, [paciente, flag]);

    const getPaciente = async () => {
        const token = await sm.getTokenSession()
        if (!flag) {
        await getPacientes(token).then(async (response) => {
          if (response.status === 200) {
              let res = await response.json()
              setPacientes(res)
              setFlag(true)
          }
          }).catch((error) => {
              console.log(error)
          })
        }
    }

    const handleCreate = async () => {
        navigation.navigate('CreatePaciente')
    }

  const handleView = (id) => {
    navigation.navigate('RetrievePaciente', {paciente_id: id})
    // Lógica de edición
  };
  
  const handleUpdate = (id) => {
    navigation.navigate('UpdatePaciente', {paciente_id: id})
    // Lógica de edición
  };

  const handleDeleteAlert = (id) => {
    Alert.alert("¿Estás seguro de eliminar este elemento?", "", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel"
      },
      { text: "Eliminar", onPress: () => {handleDelete(id)} }
    ]);
    // Lógica de eliminación
  };

  const handleDelete = async (id) => {
    const token = await sm.getTokenSession()
    await deletePacientes(id, token).then(async (response) => {
        if (response.status === 204) {
            setFlag(false);
            setError(true);
            setAlertType('Success');
            setAlertMessage('Paciente eliminado correctamente.');
        }
    }).catch((error) => {
        setError(true);
        setAlertType('Error');
        setAlertMessage('Error al eliminar Paciente.')
        console.log(error)
    })
  }

  const onCloseHandler = () => {
    setError(null)
    setAlertType('Error');
    setAlertMessage('')
  }
    return (
        <View className={"bg-slate-100 h-full w-full"}>
            <View className={"w-full h-24 justify-between flex flex-row items-center p-5"}>
                <Text className={"text-2xl font-bold"}>Lista de Pacientes</Text>
                <TouchableOpacity className={"transition-all inline-flex items-center justify-center px-4 py-2 border shadow-sm text-base font-medium rounded-md"} onPress={() => handleCreate()}>
                    <Text>Crear Paciente</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full overflow-hidden p-3">
              <AlertCmp type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
            </View>
            <View className={'w-full p-1'}>
              <DynamicTable title='Información' data={paciente} onView={handleView} onDelete={handleDeleteAlert} onUpdate={handleUpdate}/>
            </View>
        </View>
      );
}

export default ListPaciente
