import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../../components/container';

interface Props {}

const DeviceConnectView: React.FC = (props: Props) => {
  return (
    <Container>
      <Text>DeviceConnect Screen</Text>
    </Container>
  );
};

export default DeviceConnectView;

const styles = StyleSheet.create({});
