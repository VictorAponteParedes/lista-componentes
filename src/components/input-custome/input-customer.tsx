import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {InputTypes} from '../../types/types-projecs';

export const InputCustomComponent = (props: InputTypes) => {
  const {control, name, placeholderText} = props;
  const {control: formControl} = useForm();

  return (
    <View style={styles.container}>
      <Controller
        control={control || formControl}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholderText}
            placeholderTextColor={'grey'}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    color: '#000',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
});
