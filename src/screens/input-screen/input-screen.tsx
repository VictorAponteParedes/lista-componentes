import * as React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Button} from 'react-native';
import {useForm} from 'react-hook-form';
import {InputCustomComponent} from '../../components/input-custome/input-customer';

import {HeaderScreen} from '../header-screen/header-screen';

export const InputCustomScreen = () => {
  const {control, handleSubmit} = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <HeaderScreen title="Componente Input" />
      <View style={styles.container}>
        <InputCustomComponent
          name="firstName"
          control={control}
          placeholderText="Escribe tu nombre"
        />
        <InputCustomComponent
          name="lastName"
          control={control}
          placeholderText="Escribe tu apellido"
        />
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View
            style={{
              backgroundColor: 'grey',
              paddingVertical: 10,
              paddingHorizontal: 120,
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              Continuar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
