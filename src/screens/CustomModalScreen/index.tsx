import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BankFormModal from '../InputData';

const CustomModalScreen = ({ navigation }: any) => {
    const [modalVisible, setModalVisible] = useState(true);

    const handleClose = () => {
        setModalVisible(false);
        // Navegar de vuelta a Tabs (lista de componentes)
        navigation.navigate('Tabs', {
            screen: 'ComponentList', // Asegura que vaya a la tab de componentes
        });
    };

    const handleTransactionSaved = () => {
        console.log('Transacción guardada exitosamente');
        // Opcional: podrías navegar a historial después de guardar
        // setTimeout(() => {
        //   navigation.navigate('Tabs', { screen: 'ComponentList' });
        // }, 1500);
    };

    return (
        <View style={styles.container}>
            <BankFormModal
                visible={modalVisible}
                onClose={handleClose}
                onTransactionSaved={handleTransactionSaved}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

export default CustomModalScreen;
