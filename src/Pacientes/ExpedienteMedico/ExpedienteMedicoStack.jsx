import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListExpediente from './ExpedienteMedicoListView';
import CreateExpediente from './ExpedienteMedicoCreateView';
import RetrieveExpediente from './ExpedienteMedicoRetrieveView';
import UpdateExpediente from './ExpedienteMedicoUpdateView';

export default function Expediente() {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator initialRouteName="ListExpediente">
            <Stack.Screen name="ListExpediente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListExpediente} />
            <Stack.Screen name="CreateExpediente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateExpediente} />
            <Stack.Screen name="RetrieveExpediente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveExpediente} />
            <Stack.Screen name="UpdateExpediente" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateExpediente} />
        </Stack.Navigator>
        /*  
            
            
            */
    );
}