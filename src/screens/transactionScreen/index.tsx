import {View, ScrollView} from 'react-native';
import TransactionCard from '../../components/TransactionCard';

const TransactionSreenn = () => {
  return (
    <ScrollView>
      <View>
        <TransactionCard
          nombre="Katherine Vannesa Angulo"
          numeroCuenta="CR05015115320010637096"
          monto={50}
          destino="Alajuela"
          tipoTarjeta="debito"
          pais="Costa Rica"
          banco="Banco nacional de  Costa Rica"
          estado="rechazado"
        />
        <TransactionCard
          nombre="Dazly Daza Acosta"
          numeroCuenta="116544073"
          monto={100}
          destino="Aguachica cesar"
          tipoTarjeta="credito"
          pais="Colombia"
          banco="Bogota"
          estado="pendiente"
        />
        <TransactionCard
          nombre="Pedro"
          numeroCuenta="1122334455"
          monto={2000}
          destino="Transferencia"
          tipoTarjeta="debito"
          pais="Paraguay"
          banco="Familiar"
          estado="enviado"
        />
        <TransactionCard
          nombre="Juan"
          numeroCuenta="1234567890"
          monto={5000}
          destino="Compra online"
          tipoTarjeta="debito"
          pais="Venezuela"
          banco="Weno"
          estado="rechazado"
        />
      </View>
    </ScrollView>
  );
};

export default TransactionSreenn;
