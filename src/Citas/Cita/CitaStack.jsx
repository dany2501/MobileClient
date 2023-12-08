import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListCita from './CitaListView';
import CreateCita from './CitaCreateView';
import RetrieveCita from './CitaRetrieveView';
import UpdateCita from './CitaUpdateView';
export default function Cita() {
  const Stack = createStackNavigator();
  return (

      <Stack.Navigator initialRouteName="ListCita">
        <Stack.Screen name="ListCita" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListCita}/>
        <Stack.Screen name="CreateCita" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateCita} />
        <Stack.Screen name="RetrieveCita" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveCita} />
        <Stack.Screen name="UpdateCita" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateCita} />
      </Stack.Navigator>
  );

  /*
  
  */
}