import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  TransactionService,
  Transaction,
} from '../../services/TransactionService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const HomeScreen = ({ navigation }: any) => {
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    [],
  );
  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    enviadas: 0,
    rechazadas: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const availableBalance = await TransactionService.getAvailableBalance();
      const recent = await TransactionService.getRecentTransactions(5);
      const statistics = await TransactionService.getTransactionStats();

      setBalance(availableBalance);
      setRecentTransactions(recent);
      setStats(statistics);
    } catch (error) {
      console.error('Error al cargar datos del home:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'enviado':
        return { icon: 'checkmark-circle', color: '#10B981' };
      case 'pendiente':
        return { icon: 'time', color: '#F59E0B' };
      case 'rechazado':
        return { icon: 'close-circle', color: '#EF4444' };
      default:
        return { icon: 'help-circle', color: '#94A3B8' };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PY', {
      style: 'currency',
      currency: 'PYG',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bienvenido de vuelta</Text>
          <Text style={styles.subtitle}>Tu banco digital 🏦</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications-outline" size={24} color="#667eea" />
          {stats.pendientes > 0 && <View style={styles.badge} />}
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Saldo Disponible</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
          </View>
          <View style={styles.balanceIconContainer}>
            <Icon name="wallet" size={32} color="#FFFFFF" />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('customModal')}
            activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: '#667eea15' }]}>
              <Icon name="send" size={20} color="#667eea" />
            </View>
            <Text style={styles.actionText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('transactionScreen')}
            activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: '#10B98115' }]}>
              <Icon name="receipt" size={20} color="#10B981" />
            </View>
            <Text style={styles.actionText}>Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: '#F59E0B15' }]}>
              <Icon name="stats-chart" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.actionText}>Análisis</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: '#8B5CF615' }]}>
              <Icon name="card" size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.actionText}>Tarjeta</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
          <Icon name="time-outline" size={24} color="#F59E0B" />
          <Text style={styles.statNumber}>{stats.pendientes}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <Icon name="checkmark-done-outline" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{stats.enviadas}</Text>
          <Text style={styles.statLabel}>Enviadas</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E0E7FF' }]}>
          <Icon name="list-outline" size={24} color="#667eea" />
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('transactionScreen')}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Icon name="receipt-outline" size={48} color="#CBD5E1" />
            </View>
            <Text style={styles.emptyTitle}>No hay transacciones</Text>
            <Text style={styles.emptyText}>
              Realiza tu primera transferencia
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('customModal')}
              activeOpacity={0.8}>
              <Icon name="add-circle" size={20} color="#FFFFFF" />
              <Text style={styles.emptyButtonText}>Nueva transferencia</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {recentTransactions.map(transaction => {
              const status = getStatusIcon(transaction.estado);
              return (
                <TouchableOpacity
                  key={transaction.id}
                  style={styles.transactionItem}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('transactionScreen')}>
                  <View style={styles.transactionLeft}>
                    <View
                      style={[
                        styles.transactionIcon,
                        { backgroundColor: `${status.color}15` },
                      ]}>
                      <Icon
                        name={status.icon}
                        size={20}
                        color={status.color}
                      />
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionName}>
                        {transaction.nombre}
                      </Text>
                      <Text style={styles.transactionDetails}>
                        {transaction.banco} • {transaction.pais}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.transactionAmount}>
                      -{formatCurrency(transaction.monto)}
                    </Text>
                    <Text style={styles.transactionStatus}>
                      {transaction.estado}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 100 }} />
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#667eea15',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  balanceCard: {
    marginHorizontal: 20,
    backgroundColor: '#667eea',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 13,
    color: '#64748B',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'capitalize',
  },
});
