import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListPaciente from './PacienteListView';
import CreatePaciente from './PacienteCreateView';
import RetrievePaciente from './PacienteRetrieveView';
import UpdatePaciente from './PacienteUpdateView';
export default function Paciente() {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator initialRouteName="ListPaciente">
            <Stack.Screen name="ListPaciente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListPaciente} />
            <Stack.Screen name="CreatePaciente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreatePaciente} />
            <Stack.Screen name="RetrievePaciente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrievePaciente} />
            <Stack.Screen name="UpdatePaciente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdatePaciente} />
        </Stack.Navigator>
        /*
            <Stack.Screen name="RetrievePaciente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrievePaciente} />
            */
    );
}