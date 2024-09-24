import {ModalComponent} from '../../components/modal/modal-component';
import {HeaderScreen} from '../header-screen/header-screen';

export const ModalScreen = () => {
  return (
    <>
      <HeaderScreen title="Modal" />
      <ModalComponent
        title="Actualización Requerida"
        subTitle="Tu versión de la aplicación está desactualizada. Por favor, actualiza a la última versión para continuar disfrutando de todas las funcionalidades y mejoras."
        color="#ffebcc"
        titleColor="#333333"
        subTitleColor="#666666"
        buttomUpdate={true}
        buttomText="Actualizar"
        buttomContainerColor="#989898"
        androidUrl="https://play.google.com/store/search?q=nueva+americana&c=apps"
        iosUrl="https://apps.apple.com/us/app/nueva-americana/id123456789"
      />
    </>
  );
};
