import React from 'react';
import { StyleSheet, View } from 'react-native';
import i18next from 'i18next';
// Component
import { Container } from '../../components/container';
import { Button } from '../../components/buttons';
import RegularText from '../../components/texts/RegularText';
import { Header } from '../../components/headers';
// Camera
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
// Constants
import { AppSetting } from '../../utils/Common';
import { kScaledSize } from '../../utils/Constants';
// Theme
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';

interface Props {
  onBarCodeRead: any;
  qrData: any;
}

const QRView = ({ onBarCodeRead, qrData }: Props) => {
  return (
    <Container>
      {qrData === null && (
        <RNCamera
          style={[styles.camera, Layout.center]}
          onBarCodeRead={onBarCodeRead}
          captureAudio={false}
          androidCameraPermissionOptions={null}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          notAuthorizedView={
            <View style={[Layout.fill]}>
              <Header name={i18next.t('QRScreen.QRScan')} />
              <View style={[Layout.fill, Layout.center, styles.container]}>
                <RegularText style={{ marginVertical: 20 }}>
                  {i18next.t('Permission.Camera')}
                </RegularText>
                <Button
                  title={i18next.t('Permission.Setting')}
                  onPress={AppSetting}
                />
              </View>
            </View>
          }>
          <Header style={styles.header} name={i18next.t('QRScreen.QRScan')} />
          <BarcodeMask
            width={kScaledSize(280)}
            height={kScaledSize(280)}
            showAnimatedLine={false}
            edgeBorderWidth={3}
            outerMaskOpacity={0.4}
            backgroundColor={Colors.black}
          />
          <RegularText style={styles.text}>
            {i18next.t('QRScreen.QRIntruction')}
          </RegularText>
        </RNCamera>
      )}
    </Container>
  );
};

export default QRView;

const styles = StyleSheet.create({
  camera: {
    height: '100%',
  },
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  container: {
    padding: 20,
  },
  text: {
    marginTop: kScaledSize(350),
    color: Colors.white,
  },
});
