import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../DrawerContent/CustomDrawerContent';
import { View } from 'react-native';
const Drawer = createDrawerNavigator();
import HomeScreen from '../Home/Home';
import CitaStack from '../Citas/Cita/CitaStack';

import FarmaciasStackApp from '../Farmacias/FarmaciasStack';
import PacienteStackApp from '../Pacientes/PacientesStack';
import ClinicaStackApp from '../Clinicas/ClinicaStack';
import MedicoStackApp from '../Medicos/MedicosStack';
import CitasStackApp from '../Citas/CitasStack';

const Draw = () => {

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Dashboard" component={HomeScreen} options={{headerTitle: ''}}/>
            <Drawer.Screen name="Farmacias" component={FarmaciasStackApp} options={{headerTitle: 'Farmacias'}}/>
            <Drawer.Screen name="Clinca" component={ClinicaStackApp} options={{headerTitle: 'Clínicas'}}/>
            <Drawer.Screen name="Citas" component={CitasStackApp} options={{headerTitle: 'Citas'}}/>
            <Drawer.Screen name="Medicos" component={MedicoStackApp} options={{headerTitle: 'Médicos'}}/>
            <Drawer.Screen name="Pacientes" component={PacienteStackApp} options={{headerTitle: 'Pacientes'}}/>
        </Drawer.Navigator>
    );
}


export default Draw;