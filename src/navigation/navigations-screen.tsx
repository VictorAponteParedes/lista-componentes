import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens/home/home-screen';
import {ProfileScreen} from '../screens/profile/profile-screen';
import {ModalScreen} from '../screens/modal/modal-screen';
import {InputCustomScreen} from '../screens/input-screen/input-screen';
import {HeaderScreen} from '../screens/header-screen/header-screen';
import {VposScreen} from '../screens/vpos-screen/vpos-screen';
import TransactionSreenn from '../screens/transactionScreen';
import BankFormModal from '../screens/InputData';

import {NavigationTabs} from './navigation-tab';

const Stack = createNativeStackNavigator();

export const MyNavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
        }}>
        <Stack.Screen
          name="Tabs"
          component={NavigationTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="HeaderScreen"
          component={HeaderScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="InputCustomScreen"
          component={InputCustomScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="VposScreen"
          component={VposScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="transactionScreen"
          component={TransactionSreenn}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="customModal"
          component={BankFormModal}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
