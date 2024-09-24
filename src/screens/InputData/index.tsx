import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ModalProps {
  visible: boolean;
  onClose?: () => void;
}

const BankFormModal: React.FC<ModalProps> = ({visible, onClose}) => {
  const [nombre, setNombre] = useState<string | undefined>(undefined);
  const [numeroCuenta, setNumeroCuenta] = useState<string | undefined>(
    undefined,
  );
  const [monto, setMonto] = useState<string | undefined>(undefined);
  const [pais, setPais] = useState<string | undefined>(undefined);
  const [nombreBanco, setNombreBanco] = useState<string | undefined>(undefined);
  const [ciudad, setCiudad] = useState<string | undefined>(undefined);

  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false); // Control del modal de confirmación
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const handleSubmit = () => {
    setConfirmationModalVisible(true); // Abre el modal de confirmación
  };

  const handleConfirm = () => {
    setConfirmationModalVisible(false);

    // Mostrar el modal de mensaje en lugar de usar Alert
    setMessageModalVisible(true);
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Icon
                name="account-balance"
                size={24}
                color="#007bff"
                style={styles.bankIcon}
              />
              <Text style={styles.title}>Banco Horizon</Text>
            </View>

            <View style={styles.inputGroup}>
              <Icon name="person" size={20} color="#000" style={styles.icon} />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  placeholder="Ingrese su nombre completo"
                  value={nombre}
                  onChangeText={setNombre}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Icon
                name="account-balance-wallet"
                size={20}
                color="grey"
                style={styles.icon}
              />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Número de Cuenta</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  placeholder="Ingrese su número de cuenta"
                  value={numeroCuenta}
                  onChangeText={setNumeroCuenta}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Icon name="paid" size={20} color="grey" style={styles.icon} />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Monto</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  placeholder="Ingrese monto a enviar"
                  value={monto}
                  onChangeText={setMonto}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Icon name="public" size={20} color="grey" style={styles.icon} />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>País</Text>
                <TextInput
                  placeholderTextColor={'grey'}
                  style={styles.input}
                  placeholder="Ingrese el país"
                  value={pais}
                  onChangeText={setPais}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Icon
                name="account-balance"
                size={20}
                color="grey"
                style={styles.icon}
              />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del Banco</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  placeholder="Ingrese el nombre del banco"
                  value={nombreBanco}
                  onChangeText={setNombreBanco}
                />
              </View>
            </View>

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
                  placeholderTextColor={'grey'}
                  style={styles.input}
                  placeholder="Ingrese la ciudad"
                  value={ciudad}
                  onChangeText={setCiudad}
                />
              </View>
            </View>

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

      {/* Modal de Confirmación */}
      <Modal
        visible={confirmationModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.confirmText}>
              ¿Estás seguro de enviar la transacción a nombre de {nombre} con el
              número de cuenta {numeroCuenta} el monto en dolar ${monto}{' '}
              dolares?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleConfirm}>
                <Text style={styles.buttonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitButton, styles.cancelButton]}
                onPress={() => setConfirmationModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Mensaje */}
      <Modal
        visible={messageModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.confirmText}>
              {pais && pais.toLowerCase() !== 'paraguay'
                ? `Enviando,  esto puede tardar de 12 a 24 horas ya que el destino es ${pais}.`
                : 'Tu transacción está en curso.'}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  setMessageModalVisible(false);
                  //   onClose(); // Cierra el modal principal
                }}>
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    fontSize: 13,
    color: '#000',
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
  confirmText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
});

export default BankFormModal;
