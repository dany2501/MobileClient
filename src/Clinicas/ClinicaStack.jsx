import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Clinica from './Clinica/ClinicaStack';
import Consultorio from './Consultorio/ConsultorioStack';

import { View, Text, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
export default function ClinicaStackApp() {
  const Stack = createStackNavigator();

  function ChooseScreen({ navigation }) {
    return (
        <View className={"w-full h-full flex bg-slate-100 px-4 items-center "}>
            <View className={"w-full mt-10"}>
                <Text className={"font-bold text-xl"}>Selecciona la app que deseas visualizar</Text>
            </View>
            <View className={"w-full items-center justify-center h-full"}>
                <TouchableOpacity className={'w-full h-10 bg-sky-500 rounded-full items-center justify-center'} onPress={()=>{navigation.navigate('Clinica')}}>
                    <View>
                        <Text className={'text-white font-bold text-xl'}>Clinica</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className={'mt-10 w-full h-10 bg-sky-500 rounded-full items-center justify-center'} onPress={()=>{navigation.navigate('Consultorio')}}>
                    <View>
                        <Text className={'text-white font-bold text-xl'}>Consultorio</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  }

  return (

      <Stack.Navigator initialRouteName="ChooseScreen">
        <Stack.Screen name="ChooseScreen" options={{ headerShown: false }} component={ChooseScreen} />
        <Stack.Screen name="Clinica" options={{ headerShown: false }} component={Clinica}/>
        <Stack.Screen name="Consultorio" options={{ headerShown: false }} component={Consultorio} />
      </Stack.Navigator>
  );

  /*
  <Stack.Screen name="RetrieveMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={RetrieveMedicamento} />
  <Stack.Screen name="UpdateMedicamento" options={{ headerTitle:'', headerBackTitle:' ', headerStyle:{backgroundColor:"#f1f5f9"} }} component={UpdateMedicamento} />*/
}