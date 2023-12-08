import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListConsultorio from './ConsultorioListView';
import CreateConsultorio from './ConsultorioCreateView';
import RetrieveConsultorio from './ConsultorioRetrieveView';
import UpdateConsultorio from './ConsultorioUpdateView';
export default function Farmacias() {
  const Stack = createStackNavigator();
  return (

      <Stack.Navigator initialRouteName="ListConsultorio">
        <Stack.Screen name="ListConsultorio" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListConsultorio} />
        <Stack.Screen name="CreateConsultorio" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateConsultorio} />
        <Stack.Screen name="RetrieveConsultorio" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveConsultorio} />
        <Stack.Screen name="UpdateConsultorio" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateConsultorio} />
      </Stack.Navigator>
  );
}