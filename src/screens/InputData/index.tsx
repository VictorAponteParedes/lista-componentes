import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa íconos

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const BankFormModal: React.FC<ModalProps> = ({visible, onClose}) => {
  const [nombre, setNombre] = useState<string | undefined>(undefined);
  const [numeroCuenta, setNumeroCuenta] = useState<string | undefined>(
    undefined,
  );
  const [pais, setPais] = useState<string | undefined>(undefined);
  const [nombreBanco, setNombreBanco] = useState<string | undefined>(undefined);
  const [ciudad, setCiudad] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    const data = {
      nombre,
      numeroCuenta,
      pais,
      nombreBanco,
      ciudad,
    };
    console.log('Datos enviados:', data);
    onClose(); // Cerrar modal después de enviar
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Título del Banco con ícono */}
          <View style={styles.titleContainer}>
            <Icon
              name="account-balance"
              size={24}
              color="#007bff"
              style={styles.bankIcon}
            />
            <Text style={styles.title}>Banco Horizon</Text>
          </View>

          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Icon name="person" size={20} color="#000" style={styles.icon} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese su nombre completo"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
          </View>

          {/* Número de cuenta */}
          <View style={styles.inputGroup}>
            <Icon
              name="account-balance-wallet"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número de Cuenta</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese su número de cuenta"
                value={numeroCuenta}
                onChangeText={setNumeroCuenta}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* País */}
          <View style={styles.inputGroup}>
            <Icon name="public" size={20} color="#000" style={styles.icon} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>País</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el país"
                value={pais}
                onChangeText={setPais}
              />
            </View>
          </View>

          {/* Nombre del Banco */}
          <View style={styles.inputGroup}>
            <Icon
              name="account-balance"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre del Banco</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre del banco"
                value={nombreBanco}
                onChangeText={setNombreBanco}
              />
            </View>
          </View>

          {/* Ciudad */}
          <View style={styles.inputGroup}>
            <Icon
              name="location-city"
              size={20}
              color="#000"
              style={styles.icon}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ciudad</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese la ciudad"
                value={ciudad}
                onChangeText={setCiudad}
              />
            </View>
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '96%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bankIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff5c5c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BankFormModal;
