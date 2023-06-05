import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../../components/container';

interface Props {}

const SettingPrivateView: React.FC = (props: Props) => {
  return (
    <Container>
      <Text>SettingPrivate Screen</Text>
    </Container>
  );
};

export default SettingPrivateView;

const styles = StyleSheet.create({});
