import i18next from 'i18next';

export interface ListItemField {
  name: string;
  type: string;
}
export interface UserSettingField {
  id: number;
  title: string;
  listItem: ListItemField[];
}

export const USER_SETTING_LIST: UserSettingField[] = [
  {
    id: 1,
    title: '',
    listItem: [
      {
        name: i18next.t('UserSettingScreen.InfoIdentity'),
        type: 'InfoIdentity',
      },
      {
        name: i18next.t('UserSettingScreen.Introduction'),
        type: 'Introduction',
      },
      {
        name: i18next.t('UserSettingScreen.SupportCenter'),
        type: 'SupportCenter',
      },
      {
        name: i18next.t('UserSettingScreen.UpgradeAccount'),
        type: 'UpAccount',
      },
    ],
  },
  {
    id: 2,
    title: i18next.t('UserSettingScreen.SettingApp'),
    listItem: [
      {
        name: i18next.t('UserSettingScreen.SettingLanguage'),
        type: 'Language',
      },
      {
        name: i18next.t('UserSettingScreen.SettingNotify'),
        type: 'Notification',
      },
      {
        name: i18next.t('UserSettingScreen.SettingDeviceConnect'),
        type: 'DeviceConnect',
      },
    ],
  },
  {
    id: 3,
    title: i18next.t('UserSettingScreen.SettingPersonal'),
    listItem: [
      {
        name: i18next.t('UserSettingScreen.Contact'),
        type: 'Contact',
      },
      {
        name: i18next.t('UserSettingScreen.AddressBook'),
        type: 'AddressBook',
      },
      {
        name: i18next.t('UserSettingScreen.Ewallet'),
        type: 'Ewallet',
      },
      {
        name: i18next.t('UserSettingScreen.SettingPrivate'),
        type: 'SettingPrivate',
      },
      {
        name: i18next.t('UserSettingScreen.IntroducePersonal'),
        type: 'IntroducePersonal',
      },
      {
        name: i18next.t('UserSettingScreen.BlockUsers'),
        type: 'BlockUsers',
      },
      {
        name: i18next.t('UserSettingScreen.BlockProjects'),
        type: 'BlockProjects',
      },
    ],
  },
];

export const USER_INFO_LIST: ListItemField[] = [
  {
    name: i18next.t('UserInfoScreen.ChangePass'),
    type: 'ChangePass',
  },
  {
    name: i18next.t('UserInfoScreen.FactorAuthentication'),
    type: 'FactorAuthentication',
  },
  {
    name: i18next.t('UserInfoScreen.LoginMethod'),
    type: 'LoginMethod',
  },
  {
    name: i18next.t('UserInfoScreen.SetPin'),
    type: 'SetPin',
  },
  {
    name: i18next.t('UserInfoScreen.SettingLogin'),
    type: 'SetLogin',
  },
  {
    name: i18next.t('UserInfoScreen.History'),
    type: 'History',
  },
];
export const DUMMY_DATA = [
  {
    name: 'Anh Quân',
    id: '123',
  },
  {
    name: 'Thế Đô',
    id: '457',
  },
  {
    name: 'Ngọc Tuyền',
    id: '098128',
  },
  {
    name: 'Huyền Thương',
    id: '0921',
  },
  {
    name: 'Thế Anh',
    id: '1209',
  },
];
