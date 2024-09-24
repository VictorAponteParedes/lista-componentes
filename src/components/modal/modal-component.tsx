import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {useEffect, useState} from 'react';
import {ModalTypes} from '../../types/types-projecs';
import {AntDesign} from '../icon-custom/icon-component';
import {estiloModal} from './modal-component-style';

export const ModalComponent = (props: ModalTypes) => {
  const {
    title,
    subTitle,
    color,
    titleColor,
    subTitleColor,
    buttomUpdate,
    buttomText,
    buttomContainerColor,
    androidUrl,
    iosUrl,
  } = props;

  const [closeModal, setCloseModal] = useState<boolean>(true);

  const handlePress = () => {
    const url = Platform.OS === 'ios' ? iosUrl : androidUrl;
    if (url) {
      Linking.openURL(url);
    }
  };

  const closeModalComponent = () => {
    setCloseModal(!closeModal);
  };
  return (
    <>
      {closeModal && (
        <View style={estiloModal.container}>
          <View
            style={[
              estiloModal.containerModal,
              {backgroundColor: color || '#8b9cc9'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                closeModalComponent();
              }}
              style={estiloModal.containerClose}>
              <AntDesign name="close" color="#000" size={25} />
            </TouchableOpacity>
            <Text style={[estiloModal.title, {color: titleColor || '#000'}]}>
              {title}
            </Text>
            <Text
              style={[estiloModal.subTitle, {color: subTitleColor || '#000'}]}>
              {subTitle}
            </Text>
            {buttomUpdate && (
              <View
                style={[
                  estiloModal.buttomContainer,
                  {backgroundColor: buttomContainerColor},
                ]}>
                <TouchableOpacity onPress={handlePress}>
                  <Text style={estiloModal.textButtom}>{buttomText}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};
