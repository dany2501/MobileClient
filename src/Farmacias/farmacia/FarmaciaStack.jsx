import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateFarmacia from '../../Farmacias/farmacia/FarmaciaCreateView';
import ListFarmacia from '../../Farmacias/farmacia/FarmaciaListView';
import RetrieveFarmacia from '../../Farmacias/farmacia/FarmaciaRetrieveView';
import UpdateFarmacia from '../../Farmacias/farmacia/FarmaciaUpdateView';
export default function Farmacias() {
  const Stack = createStackNavigator();
  return (

      <Stack.Navigator initialRouteName="ListFarmacia">
        <Stack.Screen name="ListFarmacia" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={ListFarmacia} />
        <Stack.Screen name="CreateFarmacia" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={CreateFarmacia} />
        <Stack.Screen name="RetrieveFarmacia" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveFarmacia} />
        <Stack.Screen name="UpdateFarmacia" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateFarmacia} />
      </Stack.Navigator>
  );
}