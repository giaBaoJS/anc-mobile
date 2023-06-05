import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const Light = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#05944F',
    background: '#F4F6F9',
    text: '#000000',
    border: 'rgb(199, 199, 204)',
  },
};

export const Dark = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#05944F',
    background: '#F4F6F9',
    text: '#FFFFFF',
    border: 'rgb(199, 199, 204)',
  },
};
