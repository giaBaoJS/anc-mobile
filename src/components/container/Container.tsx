import React from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Layout from '../../theme/Layout';
import { kSpacing } from '../../utils/Constants';

export const Container = (props: any) => {
  const ContainerView = <View style={Layout.container}>{props.children}</View>;

  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView behavior="padding" style={Layout.container}>
        {ContainerView}
      </KeyboardAvoidingView>
    );
  }
  return ContainerView;
};

export const ScrollContainer = (props: any) => {
  return (
    <Container>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={[styles.container, props.contentStyle]}
        {...props}>
        {props.children}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing10,
  },
});
