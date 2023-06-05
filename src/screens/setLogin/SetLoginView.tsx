import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../../components/container';

interface Props {}

const SetLoginView: React.FC = (props: Props) => {
  return (
    <Container>
      <Text>SetLogin Screen</Text>
    </Container>
  );
};

export default SetLoginView;

const styles = StyleSheet.create({});
