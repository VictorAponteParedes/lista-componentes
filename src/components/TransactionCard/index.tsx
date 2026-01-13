import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Animated,
  ScrollView,
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
  estado: 'pendiente' | 'enviado' | 'rechazado';
  progreso?: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  nombre,
  numeroCuenta,
  monto,
  destino,
  tipoTarjeta,
  pais,
  banco,
  estado,
  progreso,
}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (progreso !== undefined) {
      Animated.spring(progressAnim, {
        toValue: progreso,
        useNativeDriver: false,
        friction: 8,
        tension: 40,
      }).start();
    }
  }, [progreso]);

  const handlePress = () => {
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
  };

  const getCardTypeConfig = (type: 'debito' | 'credito') => {
    return type === 'debito'
      ? {
        icon: 'card-outline',
        colors: ['#667eea', '#764ba2'],
        iconColor: '#667eea',
      }
      : {
        icon: 'card',
        colors: ['#f093fb', '#f5576c'],
        iconColor: '#f5576c',
      };
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pendiente':
        return {
          icon: 'time-outline',
          color: '#F59E0B',
          bgColor: '#FEF3C7',
          borderColor: '#FDE68A',
          label: 'En proceso',
        };
      case 'enviado':
        return {
          icon: 'checkmark-circle-outline',
          color: '#10B981',
          bgColor: '#D1FAE5',
          borderColor: '#A7F3D0',
          label: 'Completada',
        };
      case 'rechazado':
        return {
          icon: 'close-circle-outline',
          color: '#EF4444',
          bgColor: '#FEE2E2',
          borderColor: '#FECACA',
          label: 'Rechazada',
        };
      default:
        return {
          icon: 'help-outline',
          color: '#6B7280',
          bgColor: '#F3F4F6',
          borderColor: '#E5E7EB',
          label: 'Desconocido',
        };
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return '#EF4444';
    if (progress < 50) return '#F59E0B';
    if (progress < 75) return '#3B82F6';
    return '#10B981';
  };

  const getEstimatedTime = () => {
    if (pais === 'Paraguay') {
      return '2 a 6 horas';
    }
    return '12 a 48 horas';
  };

  const getProcessingMessage = () => {
    if (estado === 'enviado') {
      return '¡Tu transacción se ha completado exitosamente! Los fondos ya están disponibles en la cuenta de destino.';
    }
    if (estado === 'rechazado') {
      return 'Lo sentimos, tu transacción no pudo ser procesada. Por favor, verifica los datos e intenta nuevamente.';
    }
    if (pais === 'Paraguay') {
      return 'Tu transferencia está siendo procesada. Como es una transacción nacional, debería completarse entre 2 a 6 horas.';
    }
    return `Estamos procesando tu transferencia internacional. Como es la primera vez que tu banco se conecta con ${banco}, el proceso puede tomar entre 12 a 48 horas. ¡Ten paciencia, tu dinero está en buenas manos! ✨`;
  };

  const cardConfig = getCardTypeConfig(tipoTarjeta);
  const statusConfig = getStatusConfig(estado);
  const showProgress = progreso !== undefined && progreso < 100;

  return (
    <>
      {/* Tarjeta Principal Simplificada */}
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${cardConfig.iconColor}15` },
            ]}>
            <Icon
              name={cardConfig.icon}
              size={28}
              color={cardConfig.iconColor}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.cardLabel}>
              {tipoTarjeta === 'debito' ? 'Débito' : 'Crédito'}
            </Text>
            <Text style={styles.title}>{nombre}</Text>
            <Text style={styles.destinationText}>
              <Icon name="location-outline" size={12} color="#94A3B8" /> {destino}, {pais}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusConfig.bgColor,
                borderColor: statusConfig.borderColor,
              },
            ]}>
            <Icon name={statusConfig.icon} size={14} color={statusConfig.color} />
          </View>
        </View>

        {showProgress && (
          <View style={styles.miniProgressSection}>
            <View style={styles.miniProgressBar}>
              <View
                style={[
                  styles.miniProgressFill,
                  {
                    width: `${progreso}%`,
                    backgroundColor: getProgressColor(progreso!),
                  },
                ]}
              />
            </View>
            <Text style={[styles.miniProgressText, { color: getProgressColor(progreso!) }]}>
              {progreso}% completado
            </Text>
          </View>
        )}

        <View style={styles.cardFooter}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Monto</Text>
            <Text style={styles.amountText}>
              ${monto.toLocaleString('es-PY', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Ver detalles</Text>
            <Icon name="chevron-forward" size={16} color="#667eea" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal de Detalles */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={detailsVisible}
        onRequestClose={handleCloseDetails}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header del Modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <View
                  style={[
                    styles.modalIconContainer,
                    { backgroundColor: `${cardConfig.iconColor}15` },
                  ]}>
                  <Icon
                    name={cardConfig.icon}
                    size={24}
                    color={cardConfig.iconColor}
                  />
                </View>
                <View>
                  <Text style={styles.modalHeaderTitle}>Detalles de la transacción</Text>
                  <Text style={styles.modalHeaderSubtitle}>
                    {tipoTarjeta === 'debito' ? 'Tarjeta de Débito' : 'Tarjeta de Crédito'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleCloseDetails} style={styles.closeButton}>
                <Icon name="close-circle" size={32} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* Mensaje de Estado */}
              <View
                style={[
                  styles.messageCard,
                  {
                    backgroundColor: statusConfig.bgColor,
                    borderLeftColor: statusConfig.color,
                  },
                ]}>
                <Icon
                  name={estado === 'enviado' ? 'checkmark-circle' : estado === 'rechazado' ? 'close-circle' : 'information-circle'}
                  size={28}
                  color={statusConfig.color}
                />
                <View style={styles.messageTextContainer}>
                  <Text style={[styles.messageTitle, { color: statusConfig.color }]}>
                    {statusConfig.label}
                  </Text>
                  <Text style={styles.messageText}>{getProcessingMessage()}</Text>
                  <Text style={styles.estimatedTime}>
                    <Icon name="time-outline" size={14} color="#64748B" /> Tiempo estimado: {getEstimatedTime()}
                  </Text>
                </View>
              </View>

              {/* Barra de Progreso en Modal */}
              {showProgress && (
                <View style={styles.modalProgressSection}>
                  <View style={styles.progressHeader}>
                    <View style={styles.progressLabelContainer}>
                      <Icon
                        name="sync-outline"
                        size={18}
                        color={getProgressColor(progreso!)}
                      />
                      <Text style={[styles.progressLabel, { color: getProgressColor(progreso!) }]}>
                        Procesando transacción
                      </Text>
                    </View>
                    <Text style={[styles.progressPercentage, { color: getProgressColor(progreso!) }]}>
                      {progreso}%
                    </Text>
                  </View>

                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                      <Animated.View
                        style={[
                          styles.progressBarFill,
                          {
                            width: progressAnim.interpolate({
                              inputRange: [0, 100],
                              outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: getProgressColor(progreso!),
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <Text style={styles.progressDescription}>
                    Faltan {100 - progreso!}% para completar • Tu dinero llegará pronto
                  </Text>
                </View>
              )}

              {/* Detalles de la Transacción */}
              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Información de la transacción</Text>

                <View style={styles.detailItem}>
                  <View style={styles.detailItemHeader}>
                    <Icon name="person-outline" size={20} color="#667eea" />
                    <Text style={styles.detailItemLabel}>Beneficiario</Text>
                  </View>
                  <Text style={styles.detailItemValue}>{nombre}</Text>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailItemHeader}>
                    <Icon name="wallet-outline" size={20} color="#667eea" />
                    <Text style={styles.detailItemLabel}>Número de cuenta</Text>
                  </View>
                  <Text style={styles.detailItemValue}>{numeroCuenta}</Text>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailItemHeader}>
                    <Icon name="business-outline" size={20} color="#667eea" />
                    <Text style={styles.detailItemLabel}>Banco destino</Text>
                  </View>
                  <Text style={styles.detailItemValue}>{banco}</Text>
                </View>

                <View style={styles.detailsRow}>
                  <View style={styles.detailItemHalf}>
                    <View style={styles.detailItemHeader}>
                      <Icon name="flag-outline" size={20} color="#667eea" />
                      <Text style={styles.detailItemLabel}>País</Text>
                    </View>
                    <Text style={styles.detailItemValue}>{pais}</Text>
                  </View>

                  <View style={styles.detailItemHalf}>
                    <View style={styles.detailItemHeader}>
                      <Icon name="location-outline" size={20} color="#667eea" />
                      <Text style={styles.detailItemLabel}>Destino</Text>
                    </View>
                    <Text style={styles.detailItemValue}>{destino}</Text>
                  </View>
                </View>

                <View style={styles.amountSection}>
                  <Text style={styles.amountSectionLabel}>Monto total</Text>
                  <Text style={styles.amountSectionValue}>
                    ${monto.toLocaleString('es-PY', { minimumFractionDigits: 2 })}
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* Footer del Modal */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={handleCloseDetails}
                activeOpacity={0.8}>
                <Text style={styles.closeModalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  destinationText: {
    fontSize: 12,
    color: '#64748B',
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  miniProgressSection: {
    marginBottom: 12,
  },
  miniProgressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 6,
  },
  miniProgressText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'right',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 2,
  },
  amountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#667eea',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#667eea',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  modalHeaderSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  modalScroll: {
    padding: 20,
  },
  messageCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    gap: 12,
    marginBottom: 20,
  },
  messageTextContainer: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 8,
  },
  estimatedTime: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  modalProgressSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  progressDescription: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  detailsSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  detailItem: {
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  detailItemLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  detailItemValue: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItemHalf: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  amountSection: {
    backgroundColor: '#667eea',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  amountSectionLabel: {
    fontSize: 13,
    color: '#E0E7FF',
    fontWeight: '500',
    marginBottom: 4,
  },
  amountSectionValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  closeModalButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TransactionCard;
