import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import TransactionCard from '../../components/TransactionCard';
import { TransactionService, Transaction } from '../../services/TransactionService';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar transacciones al montar el componente
  const loadTransactions = async () => {
    try {
      const loadedTransactions = await TransactionService.getTransactions();
      setTransactions(loadedTransactions);
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Función para refrescar
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Historial de Pagos</Text>
          <Text style={styles.headerSubtitle}>
            {transactions.length} {transactions.length === 1 ? 'transacción' : 'transacciones'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          activeOpacity={0.7}>
          <Icon name="refresh" size={24} color="#667eea" />
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Icon name="receipt-outline" size={64} color="#CBD5E1" />
          </View>
          <Text style={styles.emptyTitle}>No hay transacciones</Text>
          <Text style={styles.emptyText}>
            Cuando realices una transferencia, aparecerá aquí
          </Text>
        </View>
      ) : (
        <View style={styles.transactionsList}>
          {transactions.map(transaction => (
            <TransactionCard
              key={transaction.id}
              nombre={transaction.nombre}
              numeroCuenta={transaction.numeroCuenta}
              monto={transaction.monto}
              destino={transaction.destino}
              tipoTarjeta={transaction.tipoTarjeta}
              pais={transaction.pais}
              banco={transaction.banco}
              estado={transaction.estado}
              progreso={transaction.progreso}
            />
          ))}
        </View>
      )}

      {transactions.length > 0 && (
        <View style={styles.footer}>
          <Icon name="shield-checkmark" size={16} color="#94A3B8" />
          <Text style={styles.footerText}>
            Tus datos están seguros y encriptados
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#667eea15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionsList: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#94A3B8',
  },
});

export default TransactionScreen;
