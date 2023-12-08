import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListClinica from './ClinicaListView';
import CreateClinica from './ClinicaCreateView';
import RetrieveClinica from './ClinicaRetrieveView';
import UpdateClinica from './ClinicaUpdateView';
export default function Clinica() {
  const Stack = createStackNavigator();
  return (

      <Stack.Navigator initialRouteName="ListClinica">
        <Stack.Screen name="ListClinica" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListClinica} />
        <Stack.Screen name="CreateClinica" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateClinica} />
        <Stack.Screen name="RetrieveClinica" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveClinica} />
        <Stack.Screen name="UpdateClinica" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateClinica} />
      </Stack.Navigator>
  );
}