import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../../components/container';

interface Props {}

const IntroducePersonalView: React.FC = (props: Props) => {
  return (
    <Container>
      <Text>IntroducePersonal Screen</Text>
    </Container>
  );
};

export default IntroducePersonalView;

const styles = StyleSheet.create({});
