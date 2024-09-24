import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconComponent} from '../icon-custom/icon-component';
import {FontAwesomeIcon, IoniconsIcon} from '../icon-custom/icon-component';
import Toast from 'react-native-toast-message';

type headerTypes = {
  title?: string;
  imagenIzq?: any;
  imagenDer?: any;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
};

export const HeaderNavigateComponent = (props: headerTypes) => {
  const {imagenIzq, imagenDer, title, iconName, iconColor, iconSize} = props;
  const navigation = useNavigation();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'This is an info message',
      text2: 'Este es un texto numero dos para saber',
    });
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          {iconName ? (
            <IoniconsIcon name={iconName} size={iconSize} color={iconColor} />
          ) : (
            <Image source={imagenIzq} style={styles.image} />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{title ? title : 'Header componente'}</Text>
        <Image source={imagenDer} style={styles.image} />
      </View>
      <TouchableOpacity
        onPress={() => {
          showToast();
        }}>
        <Text style={{color: 'red'}}>Show</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    borderRadius: 5,
    width: 45,
    height: 45,
  },
  title: {
    color: '#000',
    fontSize: 17,
    alignSelf: 'center',
  },
});
