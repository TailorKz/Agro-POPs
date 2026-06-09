import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../screens/Welcome';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Home } from '../screens/Home';
import { Extrato } from '../screens/Extrato';
import { Dedutibilidade } from '../screens/Dedutibilidade';

// Definindo as tipagens das rotas (padrão TypeScript para autocomplete)
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Extrato: undefined;
  Dedutibilidade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false, // Escondemos o header padrão, pois fizemos o nosso próprio
          animation: 'slide_from_right' // Animação suave padrão de iOS/Android
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Extrato" component={Extrato} />
        <Stack.Screen name="Dedutibilidade" component={Dedutibilidade} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}