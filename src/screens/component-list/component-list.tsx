import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const menuItems = [
  {
    id: 'modal',
    title: 'Componente Modal',
    description: 'Modales de notificación',
    icon: 'albums-outline',
    color: '#667eea',
    route: 'ModalScreen',
  },
  {
    id: 'input',
    title: 'Componente Input',
    description: 'Inputs personalizados',
    icon: 'create-outline',
    color: '#f093fb',
    route: 'InputCustomScreen',
  },
  {
    id: 'header',
    title: 'Header Navigation',
    description: 'Navegación superior',
    icon: 'menu-outline',
    color: '#4facfe',
    route: 'HeaderScreen',
  },
  {
    id: 'vpos',
    title: 'Method to Pay',
    description: 'Métodos de pago',
    icon: 'card-outline',
    color: '#43e97b',
    route: 'VposScreen',
  },
  {
    id: 'user',
    title: 'Datos del usuario',
    description: 'Perfil y configuración',
    icon: 'person-circle-outline',
    color: '#fa709a',
    route: 'customModal',
  },
  {
    id: 'transactions',
    title: 'Historial de pagos',
    description: 'Transacciones realizadas',
    icon: 'receipt-outline',
    color: '#f77062',
    route: 'transactionScreen',
  },
];

export const ComponentListScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Componentes</Text>
        <Text style={styles.headerSubtitle}>Explora todos los componentes disponibles</Text>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.7}
            style={[
              styles.card,
              {
                backgroundColor: `${item.color}15`,
                borderColor: `${item.color}40`,
              },
            ]}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Icon name={item.icon} size={32} color="#FFFFFF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <View style={styles.arrowContainer}>
              <Icon name="chevron-forward" size={20} color={item.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {menuItems.length} componentes disponibles
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#64748B',
  },
  grid: {
    padding: 16,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748B',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
