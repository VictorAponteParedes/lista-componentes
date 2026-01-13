import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
    id: string;
    nombre: string;
    numeroCuenta: string;
    monto: number;
    destino: string;
    tipoTarjeta: 'debito' | 'credito';
    pais: string;
    banco: string;
    estado: 'pendiente' | 'enviado' | 'rechazado';
    progreso?: number;
    fechaCreacion: string;
}

const STORAGE_KEY = '@transactions_storage';
const BALANCE_KEY = '@balance_storage';
const INITIAL_BALANCE = 50000000; // 50 millones de guaraníes 💰

export class TransactionService {
    // Obtener todas las transacciones
    static async getTransactions(): Promise<Transaction[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Error al obtener transacciones:', error);
            return [];
        }
    }

    // Guardar una nueva transacción
    static async saveTransaction(
        transaction: Omit<Transaction, 'id' | 'fechaCreacion'>,
    ): Promise<Transaction> {
        try {
            const transactions = await this.getTransactions();
            const newTransaction: Transaction = {
                ...transaction,
                id: Date.now().toString(), // ID único basado en timestamp
                fechaCreacion: new Date().toISOString(),
            };
            transactions.unshift(newTransaction); // Agregar al inicio
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
            return newTransaction;
        } catch (error) {
            console.error('Error al guardar transacción:', error);
            throw error;
        }
    }

    // Actualizar el progreso de una transacción
    static async updateTransactionProgress(
        id: string,
        progreso: number,
    ): Promise<void> {
        try {
            const transactions = await this.getTransactions();
            const updatedTransactions = transactions.map(transaction =>
                transaction.id === id
                    ? {
                        ...transaction,
                        progreso,
                        estado:
                            progreso >= 100
                                ? ('enviado' as const)
                                : transaction.estado,
                    }
                    : transaction,
            );
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedTransactions),
            );
        } catch (error) {
            console.error('Error al actualizar progreso:', error);
        }
    }

    // Actualizar estado de una transacción
    static async updateTransactionStatus(
        id: string,
        estado: 'pendiente' | 'enviado' | 'rechazado',
    ): Promise<void> {
        try {
            const transactions = await this.getTransactions();
            const updatedTransactions = transactions.map(transaction =>
                transaction.id === id ? { ...transaction, estado } : transaction,
            );
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedTransactions),
            );
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    }

    // Eliminar una transacción
    static async deleteTransaction(id: string): Promise<void> {
        try {
            const transactions = await this.getTransactions();
            const filteredTransactions = transactions.filter(t => t.id !== id);
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(filteredTransactions),
            );
        } catch (error) {
            console.error('Error al eliminar transacción:', error);
        }
    }

    // Limpiar todas las transacciones
    static async clearAllTransactions(): Promise<void> {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error al limpiar transacciones:', error);
        }
    }

    // ============ MÉTODOS DE BALANCE ============

    // Obtener saldo inicial
    static async getInitialBalance(): Promise<number> {
        try {
            const balanceStr = await AsyncStorage.getItem(BALANCE_KEY);
            if (balanceStr !== null) {
                return parseFloat(balanceStr);
            }
            // Si no existe, establecer el saldo inicial por defecto
            await this.setInitialBalance(INITIAL_BALANCE);
            return INITIAL_BALANCE;
        } catch (error) {
            console.error('Error al obtener saldo inicial:', error);
            return INITIAL_BALANCE;
        }
    }

    // Establecer saldo inicial
    static async setInitialBalance(balance: number): Promise<void> {
        try {
            await AsyncStorage.setItem(BALANCE_KEY, balance.toString());
        } catch (error) {
            console.error('Error al establecer saldo inicial:', error);
        }
    }

    // Calcular saldo disponible (balance inicial - transacciones enviadas)
    static async getAvailableBalance(): Promise<number> {
        try {
            const initialBalance = await this.getInitialBalance();
            const transactions = await this.getTransactions();

            // Sumar solo las transacciones enviadas o pendientes (no las rechazadas)
            const totalSpent = transactions
                .filter(t => t.estado === 'enviado' || t.estado === 'pendiente')
                .reduce((sum, t) => sum + t.monto, 0);

            return initialBalance - totalSpent;
        } catch (error) {
            console.error('Error al calcular saldo disponible:', error);
            return 0;
        }
    }

    // Obtener últimas N transacciones
    static async getRecentTransactions(limit: number = 5): Promise<Transaction[]> {
        try {
            const transactions = await this.getTransactions();
            return transactions.slice(0, limit);
        } catch (error) {
            console.error('Error al obtener transacciones recientes:', error);
            return [];
        }
    }

    // Obtener estadísticas de transacciones
    static async getTransactionStats(): Promise<{
        total: number;
        pendientes: number;
        enviadas: number;
        rechazadas: number;
    }> {
        try {
            const transactions = await this.getTransactions();
            return {
                total: transactions.length,
                pendientes: transactions.filter(t => t.estado === 'pendiente').length,
                enviadas: transactions.filter(t => t.estado === 'enviado').length,
                rechazadas: transactions.filter(t => t.estado === 'rechazado').length,
            };
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            return { total: 0, pendientes: 0, enviadas: 0, rechazadas: 0 };
        }
    }
}
