import React from 'react';
import { Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import SessionManager from '../../api/manager/SessionManager';
import DynamicTable from '../../Components/Table/DynamicTable';
import { getExpedienteMedico, deleteExpedienteMedico } from '../../api/controller/pacientes/ExpedienteMedico';
import AlertCmp from '../../Components/Alert/Alert';
const sm = SessionManager.getInstance();
function ListExpediente({navigation}) {

    const [expedientes, setExpedientes] = React.useState([])
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
        getExpediente()
    }, [expedientes, flag]);

    const getExpediente = async () => {
        const token = await sm.getTokenSession()
        if (!flag) {
        await getExpedienteMedico(token).then(async (response) => {
          if (response.status === 200) {
              let res = await response.json()
              console.log("===res===",res)
              res = res.map((item) => {
                return {id: item.id, nombre: item.paciente.nombre}
              })
              setExpedientes(res)
              setFlag(true)
          }
          }).catch((error) => {
              console.log(error)
          })
        }
    }

    const handleCreate = async () => {
        navigation.navigate('CreateExpediente')
    }

  const handleView = (id) => {
    navigation.navigate('RetrieveExpediente', {expedientemedico_id: id})
    // Lógica de edición
  };
  
  const handleUpdate = (id) => {
    navigation.navigate('UpdateExpediente', {expedientemedico_id: id})
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
    await deleteExpedienteMedico(id, token).then(async (response) => {
        if (response.status === 204) {
            setFlag(false);
            setError(true);
            setAlertType('Success');
            setAlertMessage('Expediente eliminado correctamente.');
        }
    }).catch((error) => {
        setError(true);
        setAlertType('Error');
        setAlertMessage('Error al eliminar Expediente.')
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
            <View className={"w-full h-24 justify-between flex flex-row items-center px-5"}>
                <Text className={"text-2xl font-bold w-1/2"}>Lista de Expedientes</Text>
                <TouchableOpacity className={"transition-all inline-flex items-center justify-center px-4 py-2 border shadow-sm text-base font-medium rounded-md"} onPress={() => handleCreate()}>
                    <Text>Crear Expediente</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full overflow-hidden p-3">
              <AlertCmp type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
            </View>
            <View className={'w-full p-1'}>
              <DynamicTable header={"Paciente"} title='Información' data={expedientes} onView={handleView} onDelete={handleDeleteAlert} onUpdate={handleUpdate}/>
            </View>
        </View>
      );
}

export default ListExpediente
