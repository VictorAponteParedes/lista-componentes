import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import checkVersion from 'react-native-store-version';
import Toast from 'react-native-toast-message';

// NAVIGATIONS
import {MyNavigationStack} from './src/navigation/navigations-screen';

const App = () => {
  const [showModalVersion, setShowModalVersion] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const check = await checkVersion({
          version: '1.0.25',
          iosStoreURL:
            'https://apps.apple.com/py/app/nueva-americana/id6450839651',
          androidStoreURL:
            'https://play.google.com/store/apps/details?id=com.konecta.tna',
          country: 'us',
        });

        if (check.result === 'new') {
          // si la versión de la app en la tienda es nueva
          console.log('Hay una nueva versión disponible en la Play Store');
          setShowModalVersion(true);
        } else if (check.result === 'equal') {
          // si la versión de la app en la tienda es igual a la versión local
          console.log(
            'La versión de la Play Store es igual a la versión local',
          );
        }
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, []);

  return (
    <>
      <MyNavigationStack />
      <Toast />
    </>
  );
};

export default App;
