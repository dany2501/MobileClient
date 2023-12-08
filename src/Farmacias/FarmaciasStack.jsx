import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Medicamento from './medicamento/MedicamentoStack';
import Farmacias from './farmacia/FarmaciaStack';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
export default function FarmaciasStackApp() {
  const Stack = createStackNavigator();

  function ChooseScreen({ navigation }) {
    return (
        <View className={"w-full h-full flex bg-slate-100 px-4 items-center justify-center"}>
            <TouchableOpacity className={'w-full h-10 bg-sky-500 rounded-full items-center'} onPress={()=>{navigation.navigate('Farmacia')}}>
                <View >
                    <Text className={'text-white font-bold text-xl'}>Farmacias</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={'mt-10 w-full h-10 bg-sky-500 rounded-full items-center'} onPress={()=>{navigation.navigate('Medicamento')}}>
                <View >
                    <Text className={'text-white font-bold text-xl'}>Medicamento</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }

  return (

      <Stack.Navigator initialRouteName="ChooseScreen">
        <Stack.Screen name="ChooseScreen" options={{ headerShown: false }} component={ChooseScreen} />
        <Stack.Screen name="Medicamento" options={{ headerShown: false }} component={Medicamento}/>
        <Stack.Screen name="Farmacia" options={{ headerShown: false }} component={Farmacias} />
      </Stack.Navigator>
  );

  /*
  <Stack.Screen name="RetrieveMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveMedicamento} />
  <Stack.Screen name="UpdateMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateMedicamento} />*/
}