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

    // Limpiar todas las transacciones (opcional, para testing)
    static async clearAllTransactions(): Promise<void> {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error al limpiar transacciones:', error);
        }
    }
}
