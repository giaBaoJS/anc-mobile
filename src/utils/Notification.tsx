import { Alert } from 'react-native';
import i18next from 'i18next';

export type AlertProps = {
  message: string;
  buttonText1?: string;
  buttonText2?: string;
  onPress1?: () => Promise<void> | void;
  onPress2?: () => Promise<void> | void;
};
export const handleAlert = ({
  message,
  buttonText1,
  buttonText2,
  onPress1,
  onPress2,
}: AlertProps) => {
  if (buttonText2 !== undefined) {
    return Alert.alert(
      i18next.t('Notification.Noti'),
      message !== '' ? message : i18next.t('Error.General'),
      [
        {
          text: buttonText2,
          onPress: onPress2,
        },
        {
          text:
            buttonText1 !== undefined
              ? buttonText1
              : i18next.t('Button.Accept'),
          onPress: onPress1,
        },
      ],
    );
  }
  return Alert.alert(
    i18next.t('Notification.Noti'),
    message !== '' ? message : i18next.t('Error.General'),
    [
      {
        text:
          buttonText1 !== undefined ? buttonText1 : i18next.t('Button.Accept'),
        onPress: onPress1,
      },
    ],
  );
};
