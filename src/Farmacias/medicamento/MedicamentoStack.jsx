import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListMedicamento from './MedicamentoListView';
import CreateMedicamento from './MedicamentoCreateView';
import RetrieveMedicamento from './MedicamentoRetrieveView';
import UpdateMedicamento from './MedicamentoUpdateView';
export default function Medicamento() {
  const Stack = createStackNavigator();
  return (

      <Stack.Navigator initialRouteName="ListMedicamento">
        <Stack.Screen name="ListMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListMedicamento}/>
        <Stack.Screen name="CreateMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateMedicamento} />
        <Stack.Screen name="RetrieveMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveMedicamento} />
        <Stack.Screen name="UpdateMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateMedicamento} />
      </Stack.Navigator>
  );

  /*
  
  */
}