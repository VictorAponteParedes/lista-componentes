import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export const ComponentListScreen = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ModalScreen');
        }}>
        <View style={estiloModalScreen.container}>
          <Text style={estiloModalScreen.title}>Componente Modal</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('InputCustomScreen');
        }}>
        <View style={estiloModalScreen.container}>
          <Text style={estiloModalScreen.title}>Componente Imput customer</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HeaderScreen');
        }}>
        <View style={estiloModalScreen.container}>
          <Text style={estiloModalScreen.title}>
            Componente Header Navigation
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VposScreen');
        }}>
        <View style={estiloModalScreen.container}>
          <Text style={estiloModalScreen.title}>Componente Method to pay</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('customModal');
        }}>
        <View style={estiloModalScreen.container}>
          <Text style={estiloModalScreen.title}>Datos del usuario</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const estiloModalScreen = StyleSheet.create({
  container: {
    backgroundColor: '#33cadd',
    paddingVertical: 25,
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: 17,
  },
});
