import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TransactionService } from '../../services/TransactionService';

interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  onTransactionSaved?: () => void; // Callback para notificar que se guardó
}

const BankFormModal: React.FC<ModalProps> = ({ visible, onClose, onTransactionSaved }) => {
  const [nombre, setNombre] = useState<string | undefined>(undefined);
  const [numeroCuenta, setNumeroCuenta] = useState<string | undefined>(
    undefined,
  );
  const [monto, setMonto] = useState<string | undefined>(undefined);
  const [pais, setPais] = useState<string | undefined>(undefined);
  const [nombreBanco, setNombreBanco] = useState<string | undefined>(undefined);
  const [ciudad, setCiudad] = useState<string | undefined>(undefined);

  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  const handleSubmit = () => {
    setConfirmationModalVisible(true);
  };

  const handleConfirm = async () => {
    setConfirmationModalVisible(false);

    try {
      // Guardar la transacción en AsyncStorage
      await TransactionService.saveTransaction({
        nombre: nombre || 'Sin nombre',
        numeroCuenta: numeroCuenta || '',
        monto: parseFloat(monto || '0'),
        destino: ciudad || 'Sin destino',
        tipoTarjeta: 'debito', // Puedes agregar un selector en el formulario
        pais: pais || 'Sin país',
        banco: nombreBanco || 'Sin banco',
        estado: 'pendiente',
        progreso: 15, // Inicia con 15% de progreso
      });

      // Limpiar el formulario
      setNombre(undefined);
      setNumeroCuenta(undefined);
      setMonto(undefined);
      setPais(undefined);
      setNombreBanco(undefined);
      setCiudad(undefined);

      // Notificar que se guardó
      if (onTransactionSaved) {
        onTransactionSaved();
      }

      setMessageModalVisible(true);
    } catch (error) {
      console.error('Error al guardar transacción:', error);
    }
  };

  return (
    <>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header con botón de cerrar */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.bankIconContainer}>
                  <Icon name="business" size={24} color="#667eea" />
                </View>
                <View>
                  <Text style={styles.title}>Banco Horizon</Text>
                  <Text style={styles.subtitle}>Nueva transferencia</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close-circle" size={32} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              {/* Formulario */}
              <View style={styles.form}>
                {/* Nombre */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Beneficiario</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="person-outline"
                      size={20}
                      color="#667eea"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholderTextColor="#94A3B8"
                      placeholder="Nombre completo del beneficiario"
                      value={nombre}
                      onChangeText={setNombre}
                    />
                  </View>
                </View>

                {/* Número de Cuenta */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Número de cuenta</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="wallet-outline"
                      size={20}
                      color="#667eea"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholderTextColor="#94A3B8"
                      placeholder="Ingrese el número de cuenta"
                      value={numeroCuenta}
                      onChangeText={setNumeroCuenta}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Monto */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Monto a transferir</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="cash-outline"
                      size={20}
                      color="#667eea"
                      style={styles.inputIcon}
                    />
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                      style={[styles.input, styles.inputWithCurrency]}
                      placeholderTextColor="#94A3B8"
                      placeholder="0.00"
                      value={monto}
                      onChangeText={setMonto}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>

                {/* País y Ciudad en fila */}
                <View style={styles.row}>
                  <View style={[styles.inputWrapper, styles.halfWidth]}>
                    <Text style={styles.label}>País</Text>
                    <View style={styles.inputContainer}>
                      <Icon
                        name="flag-outline"
                        size={20}
                        color="#667eea"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="#94A3B8"
                        placeholder="País destino"
                        value={pais}
                        onChangeText={setPais}
                      />
                    </View>
                  </View>

                  <View style={[styles.inputWrapper, styles.halfWidth]}>
                    <Text style={styles.label}>Ciudad</Text>
                    <View style={styles.inputContainer}>
                      <Icon
                        name="location-outline"
                        size={20}
                        color="#667eea"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="#94A3B8"
                        placeholder="Ciudad"
                        value={ciudad}
                        onChangeText={setCiudad}
                      />
                    </View>
                  </View>
                </View>

                {/* Banco */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Banco destino</Text>
                  <View style={styles.inputContainer}>
                    <Icon
                      name="business-outline"
                      size={20}
                      color="#667eea"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholderTextColor="#94A3B8"
                      placeholder="Nombre del banco"
                      value={nombreBanco}
                      onChangeText={setNombreBanco}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Botones */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}>
                <Icon name="send" size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Enviar transferencia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.8}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
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
        <View style={styles.overlayModal}>
          <View style={styles.confirmationContent}>
            <View style={styles.confirmIconContainer}>
              <Icon name="alert-circle-outline" size={56} color="#667eea" />
            </View>
            <Text style={styles.confirmTitle}>Confirmar transferencia</Text>
            <Text style={styles.confirmText}>
              ¿Estás seguro de enviar{' '}
              <Text style={styles.highlightAmount}>${monto || '0.00'}</Text> a{' '}
              <Text style={styles.highlightName}>{nombre || 'beneficiario'}</Text>{' '}
              con número de cuenta{' '}
              <Text style={styles.highlightAccount}>{numeroCuenta || 'N/A'}</Text>?
            </Text>
            <View style={styles.confirmButtonContainer}>
              <TouchableOpacity
                style={styles.confirmYesButton}
                onPress={handleConfirm}
                activeOpacity={0.8}>
                <Icon name="checkmark-circle" size={20} color="#FFFFFF" />
                <Text style={styles.confirmYesText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmNoButton}
                onPress={() => setConfirmationModalVisible(false)}
                activeOpacity={0.8}>
                <Icon name="close-circle" size={20} color="#64748B" />
                <Text style={styles.confirmNoText}>Cancelar</Text>
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
        <View style={styles.overlayModal}>
          <View style={styles.messageContent}>
            <View
              style={[
                styles.messageIconContainer,
                {
                  backgroundColor:
                    pais && pais.toLowerCase() !== 'paraguay'
                      ? '#FEF3C7'
                      : '#D1FAE5',
                },
              ]}>
              <Icon
                name={
                  pais && pais.toLowerCase() !== 'paraguay'
                    ? 'time-outline'
                    : 'checkmark-circle'
                }
                size={48}
                color={
                  pais && pais.toLowerCase() !== 'paraguay'
                    ? '#F59E0B'
                    : '#10B981'
                }
              />
            </View>
            <Text style={styles.messageTitle}>
              {pais && pais.toLowerCase() !== 'paraguay'
                ? 'Transferencia en proceso'
                : '¡Transferencia en curso!'}
            </Text>
            <Text style={styles.messageText}>
              {pais && pais.toLowerCase() !== 'paraguay'
                ? `Tu transferencia está siendo procesada. Como el destino es ${pais}, esto puede tomar entre 12 a 48 horas. ¡Ten paciencia! 🌟`
                : 'Tu transacción está siendo procesada y se completará pronto.'}
            </Text>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => {
                setMessageModalVisible(false);
                if (onClose) onClose();
              }}
              activeOpacity={0.8}>
              <Text style={styles.messageButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  bankIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#667eea15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    maxHeight: '70%',
  },
  form: {
    padding: 20,
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    height: '100%',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginRight: 6,
  },
  inputWithCurrency: {
    marginLeft: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  submitButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
  },
  // Modal de confirmación
  overlayModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  confirmationContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  confirmIconContainer: {
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  confirmText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  highlightAmount: {
    fontWeight: 'bold',
    color: '#667eea',
  },
  highlightName: {
    fontWeight: 'bold',
    color: '#1E293B',
  },
  highlightAccount: {
    fontWeight: 'bold',
    color: '#64748B',
  },
  confirmButtonContainer: {
    width: '100%',
    gap: 10,
  },
  confirmYesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  confirmYesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  confirmNoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  confirmNoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  // Modal de mensaje
  messageContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  messageIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  messageButton: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default BankFormModal;
