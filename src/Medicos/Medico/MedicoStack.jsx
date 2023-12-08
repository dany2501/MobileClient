import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListMedico from './MedicoListView';
import CreateMedico from './MedicoCreateView';
import RetrieveMedico from './MedicoRetrieveView';
import UpdateMedico from './MedicoUpdateView';
export default function Medico() {
  const Stack = createStackNavigator();
  return (

      <Stack.Navigator initialRouteName="ListMedico">
        <Stack.Screen name="ListMedico" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListMedico} />
        <Stack.Screen name="CreateMedico" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateMedico} />
        <Stack.Screen name="RetrieveMedico" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveMedico} />
        <Stack.Screen name="UpdateMedico" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateMedico} />
      </Stack.Navigator>
      /**/
  );
}