import React, { useState } from 'react';
import QRView from './QRView';
import { handleAlert } from '../../utils/Notification';
import { LoginStackRouteProps } from '../../navigators/stacks/LoginStack';

interface Props {
  navigation: any;
  route: LoginStackRouteProps<'QRScreen'>;
}

const QRScreen = ({ navigation, route }: Props) => {
  const [qrData, setQrData] = useState<any>(null);
  const { params } = route;
  const onBarcodeRead = (result: any) => {
    if (qrData) {
      return;
    }
    setQrData(result.data);
    if (params?.fromRoute) {
      navigation.navigate('RegisterScreen', { presenter: result?.data });
      setQrData(null);
    } else {
      handleAlert({
        message: result?.data,
        onPress1: () => {
          navigation.goBack();
          setQrData(null);
        },
      });
    }
  };

  return <QRView onBarCodeRead={onBarcodeRead} qrData={qrData} />;
};

export default QRScreen;
