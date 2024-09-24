import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TransactionCardProps {
  nombre: string;
  numeroCuenta: string;
  monto: number;
  destino: string;
  tipoTarjeta: 'debito' | 'credito';
  pais: string;
  banco: string;
  estado: 'pendiente' | 'enviado' | 'rechazado'; // Nueva prop para estado
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  nombre,
  numeroCuenta,
  monto,
  destino,
  tipoTarjeta,
  pais,
  banco,
  estado, // Nueva prop recibida
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const renderIcon = (type: 'debito' | 'credito') => {
    return type === 'debito' ? (
      <Icon name="card-outline" size={30} color="#00BFFF" />
    ) : (
      <Icon name="card" size={30} color="#FF4500" />
    );
  };

  const handleConfirm = () => {
    setLoading(true);
    setModalVisible(false);

    setTimeout(() => {
      setLoading(false);
      if (pais !== 'Paraguay') {
        setShowMessage(true);
      } else {
        console.log(`Transfiriendo a ${nombre} en ${pais}`);
      }
    }, 2000);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.header}>
          {renderIcon(tipoTarjeta)}
          <Text style={styles.title}>{nombre}</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Icon name="wallet-outline" size={20} color="#666" />
            <Text style={styles.text}>Nro. Cuenta: {numeroCuenta}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="location-outline" size={20} color="#666" />
            <Text style={styles.text}>Destino: {destino}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="flag-outline" size={20} color="#666" />
            <Text style={styles.text}>País: {pais}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="business-outline" size={20} color="#666" />
            <Text style={styles.text}>Banco: {banco}</Text>
          </View>
        </View>

        {/* Sección para mostrar el estado */}
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, styles[estado]]}>
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
          </Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>${monto.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Estás seguro que quieres transferir a {nombre}?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}>
                <Text style={styles.buttonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Procesando transferencia...</Text>
        </View>
      )}

      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Esto puede tardar de 12 a 24 horas ya que el destino es {pais}.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  details: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  amountContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pendiente: {
    color: '#ee7612',
    backgroundColor: '#fad18d',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  enviado: {
    color: '#3c8506',
    backgroundColor: '#e5ffc7',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  rechazado: {
    color: '#dc3545',
    backgroundColor: '#ffdede',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  confirmButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  messageContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  messageText: {
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TransactionCard;
