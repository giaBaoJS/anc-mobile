import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../../components/container';

interface Props {}

const BlockUsersView: React.FC = (props: Props) => {
  return (
    <Container>
      <Text>BlockUsers Screen</Text>
    </Container>
  );
};

export default BlockUsersView;

const styles = StyleSheet.create({});
