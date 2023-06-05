import i18next from 'i18next';
import { UserStackParamList } from '../navigators/stacks/UserStack';
import Colors from '../theme/Colors';

export interface UserHome {
  name: string;
  type: string;
}

export interface UserFeatureField {
  name: string;
  color: string;
  link: keyof UserStackParamList;
  notiCount: number;
}

export interface UserListFeatureField {
  listFeatures: UserFeatureField[];
  numColumns: number;
}

export const USER_HOME_LIST: UserHome[] = [
  {
    name: i18next.t('PersonalHomeScreen.Feature'),
    type: 'feature',
  },
  // {
  //   name: i18next.t('PersonalHomeScreen.News'),
  //   type: 'news',
  // },
];

export const FEATURES: UserListFeatureField = {
  numColumns: 4,
  listFeatures: [
    {
      name: 'Project',
      color: Colors.primary,
      link: 'ProjectStack',
      notiCount: 3,
    },
    {
      name: 'AddProject',
      color: Colors.primary,
      link: 'ProjectStack',
      notiCount: 3,
    },
    {
      name: 'TransactionSource',
      color: Colors.primary,
      link: 'TransactionSourceStack',
      notiCount: 3,
    },
    {
      name: 'AddTransactionSource',
      color: Colors.primary,
      link: 'TransactionSourceStack',
      notiCount: 3,
    },
    {
      name: 'ApiKeyCode',
      color: Colors.primary,
      link: 'ApiKeyCodeStack',
      notiCount: 3,
    },
    {
      name: 'PolicyPattern',
      color: Colors.primary,
      link: 'PolicyPatternStack',
      notiCount: 3,
    },
    {
      name: 'TransactionRole',
      color: Colors.primary,
      link: 'TransactionRoleStack',
      notiCount: 3,
    },
    {
      name: 'UserSettingLayout',
      color: Colors.primary,
      link: 'UserSettingLayoutStack',
      notiCount: 0,
    },
  ],
};
