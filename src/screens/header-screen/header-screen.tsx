import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import {headerIcono, FlechitaIzq} from '../../assets';

import {HeaderNavigateComponent} from '../../components/header-navigation/header-navigation-component';

type HeaderScreenType = {
  title: string;
};
export const HeaderScreen = (props: HeaderScreenType) => {
  const {title} = props;
  return (
    <HeaderNavigateComponent
      title={title}
      iconName="arrow-undo"
      iconColor="black"
      iconSize={30}
      imagenDer={headerIcono}
    />
  );
};
