import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import BottomTab from '../tab/BottomTab';
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';
import MediumText from '../../components/texts/MediumText';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[Layout.fill]}>
      <View style={[styles.drawer, Layout.fill, Layout.justifyContentBetween]}>
        <View>
          <MediumText>Top</MediumText>
        </View>
        <View>
          <MediumText>Bottom</MediumText>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const HamburgerDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: Colors.white,
        },
      }}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          drawerLabel: () => null,
          title: undefined,
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HamburgerDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  drawer: {
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
});
