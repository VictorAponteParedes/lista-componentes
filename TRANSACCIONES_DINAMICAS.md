# Sistema Dinámico de Transacciones

## 🎯 ¿Cómo funciona?

Este sistema permite crear transacciones dinámicamente a través del formulario bancario, y todas las transacciones se guardan en la memoria del dispositivo usando **AsyncStorage**.

## 📱 Flujo de Funcionamiento

### 1. Usuario completa el formulario
- Abre **"Datos del usuario"** desde la lista de componentes
- Llena el formulario con:
  - Nombre del beneficiario
  - Número de cuenta
  - Monto a transferir
  - País y Ciudad
  - Banco destino

### 2. Se guarda automáticamente
- Al presionar **"Enviar transferencia"** y confirmar
- La transacción se guarda en AsyncStorage
- Se crea automáticamente con:
  - ID único
  - Fecha de creación
  - Estado inicial: "pendiente"
  - Progreso inicial: 15%

### 3. Aparece en Historial de Pagos
- Abre **"Historial de pagos"**
- Verás todas las transacciones guardadas
- Puedes deslizar hacia abajo para actualizar (pull-to-refresh)
- O presionar el botón de refresh 🔄

## 🔧 Archivos Involucrados

### `src/services/TransactionService.ts`
Servicio que maneja toda la lógica de persistencia:
- ✅ `getTransactions()` - Obtiene todas las transacciones
- ✅ `saveTransaction()` - Guarda una nueva transacción
- ✅ `updateTransactionProgress()` - Actualiza el progreso
- ✅ `updateTransactionStatus()` - Cambia el estado
- ✅ `deleteTransaction()` - Elimina una transacción
- ✅ `clearAllTransactions()` - Limpia todo (para pruebas)

### `src/screens/InputData/index.tsx`
Formulario bancario modificado:
- Ahora guarda en AsyncStorage al confirmar
- Limpia el formulario después de guardar
- Llama al callback `onTransactionSaved` si existe

### `src/screens/transactionScreen/index.tsx`
Pantalla de historial rediseñada:
- Carga transacciones automáticamente al abrir
- Muestra estado vacío bonito si no hay transacciones
- Pull-to-refresh para actualizar
- Botón de refresh manual
- Contador de transacciones

### `src/screens/CustomModalScreen/index.tsx`
Wrapper para el formulario bancario:
- Maneja el estado del modal
- Gestiona callbacks de navegación

## 💾 Persistencia de Datos

Los datos se guardan con **AsyncStorage**, esto significa:

✅ **Se mantienen** cuando:
- Cierras la app
- Apagas el celular
- Actualizas la app

❌ **Se borran** cuando:
- Desinstalas la app
- Limpias los datos de la app manualmente
- Llamas a `clearAllTransactions()` (solo desarrollo)

## 🎨 Características Implementadas

### ✨ En el Formulario
- Botón X para cerrar
- Validación de campos
- Modal de confirmación hermoso
- Modal de éxito con mensaje personalizado
- Limpieza automática del formulario

### ✨ En el Historial
- **Lista dinámica** - No más código repetido
- **Pull to refresh** - Desliza hacia abajo para actualizar
- **Botón de refresh** - Actualización manual
- **Estado vacío** - Mensaje bonito cuando no hay transacciones
- **Contador** - Muestra cuántas transacciones tienes
- **Footer de seguridad** - Mensaje de datos encriptados

### ✨ En las Tarjetas
- **Diseño premium** - Colores y sombras modernas
- **Barra de progreso** - Si está en proceso
- **Modal de detalles** - Ver información completa
- **Mensajes personalizados** - Según el país de destino

## 🚀 Próximas Mejoras Posibles

1. **Selector de tipo de tarjeta** en el formulario (débito/crédito)
2. **Eliminar transacciones** con swipe
3. **Filtros** por estado, país, banco, etc.
4. **Búsqueda** de transacciones
5. **Notificaciones** cuando cambia el progreso
6. **Sincronización** con backend (si existe)
7. **Exportar** historial a PDF o Excel

## 📝 Ejemplo de Uso

```typescript
// Guardar una transacción manualmente desde cualquier lugar
import {TransactionService} from './services/TransactionService';

const guardarTransaccion = async () => {
  await TransactionService.saveTransaction({
    nombre: 'Juan Pérez',
    numeroCuenta: '1234567890',
    monto: 100,
    destino: 'Asunción',
    tipoTarjeta: 'debito',
    pais: 'Paraguay',
    banco: 'Banco Familiar',
    estado: 'pendiente',
    progreso: 50,
  });
};

// Obtener todas las transacciones
const transacciones = await TransactionService.getTransactions();

// Actualizar progreso
await TransactionService.updateTransactionProgress('id-transaccion', 75);

// Actualizar estado
await TransactionService.updateTransactionStatus('id-transaccion', 'enviado');
```

## 🎉 ¡Listo!

Ahora tu app de transacciones es completamente dinámica:
- ✅ **No más código repetido**
- ✅ **Datos persistentes**
- ✅ **Fácil de usar**
- ✅ **Diseño hermoso**
- ✅ **Listo para producción**
