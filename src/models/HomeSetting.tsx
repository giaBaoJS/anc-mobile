import i18next from 'i18next';
import Colors from '../theme/Colors';

export interface PrefsField {
  action?: string;
  sibling_order: number;
  limit?: number;
  option_order_by_id?: number;
}

export interface HomeSettingField {
  name: string;
  key: string;
  is_show: boolean;
  slug: string;
  prefs: PrefsField;
}

// export const HOME_SETTING_LIST: HomeSettingField[] = [
//   {
//     name: i18next.t('HomeSettingScreen.CustomUtility'),
//     key: 'utility',
//   },
//   {
//     name: i18next.t('HomeSettingScreen.CustomProjectPage'),
//     key: 'project',
//   },
//   {
//     name: i18next.t('HomeSettingScreen.CustomResource'),
//     key: 'resource',
//   },
//   {
//     name: i18next.t('HomeSettingScreen.CustomNewsPage'),
//     key: 'news',
//   },
//   {
//     name: i18next.t('HomeSettingScreen.CustomPersonalMenu'),
//     key: 'menu',
//   },
//   {
//     name: 'About ANC',
//     key: 'about',
//   },
// ];

//============= Config mặc định =============
export interface DefautConfigField {
  widget: {
    isShow: boolean;
    numOfItemShow: number;
    maxItemsShow: number;
    sortedBy: string;
  };
  news: {
    isShow: boolean;
    numOfItemShow: number;
    maxItemsShow: number;
  };
}

export const DefautConfig: DefautConfigField = {
  widget: {
    isShow: true,
    numOfItemShow: 5,
    maxItemsShow: 10,
    sortedBy: '1234',
  },
  news: {
    isShow: true,
    numOfItemShow: 5,
    maxItemsShow: 10,
  },
};

//============= List option SortedBy =============
export interface OptionSortedField {
  id: number;
  label: string;
}

export const ListOptionSorted: OptionSortedField[] = [
  {
    id: 1,
    label: 'Giao dịch nhiều nhất',
  },
  {
    id: 2,
    label: 'Dự án mới nhất',
  },
  {
    id: 3,
    label: 'Dự án cũ nhất',
  },
];

//============= List Menu ===============
export interface PersonalMenuField {
  name: string;
  title: string;
  color: string;
  isSelected: boolean;
}

export interface PersonalMenuFieldDrag extends PersonalMenuField {
  key: string;
}

export const listPersonalMenu: PersonalMenuField[] = [
  // {
  //   name: 'Project',
  //   title: i18next.t('HomeSettingScreen.Project'),
  //   color: Colors.primary,
  //   isSelected: false,
  // },
  // {
  //   name: 'News',
  //   title: i18next.t('HomeSettingScreen.News'),
  //   color: Colors.primary,
  //   isSelected: false,
  // },
  // {
  //   name: 'QRScan',
  //   title: i18next.t('HomeSettingScreen.QRScan'),
  //   color: Colors.primary,
  //   isSelected: false,
  // },
  // {
  //   name: 'Helper',
  //   title: i18next.t('HomeSettingScreen.Helper'),
  //   color: Colors.primary,
  //   isSelected: false,
  // },
  {
    name: 'TransactionSource',
    title: i18next.t('HomeSettingScreen.TransactionSource'),
    color: Colors.primary,
    isSelected: true,
  },
  {
    name: 'PolicyPattern',
    title: i18next.t('HomeSettingScreen.PolicyPattern'),
    color: Colors.primary,
    isSelected: true,
  },
  {
    name: 'TransactionStructure',
    title: i18next.t('HomeSettingScreen.TransactionStructure'),
    color: Colors.primary,
    isSelected: true,
  },
  {
    name: 'TransactionProperties',
    title: i18next.t('HomeSettingScreen.TransactionProperties'),
    color: Colors.primary,
    isSelected: true,
  },
  {
    name: 'TransactionRole',
    title: i18next.t('HomeSettingScreen.TransactionRole'),
    color: Colors.primary,
    isSelected: true,
  },
  {
    name: 'Currency',
    title: i18next.t('HomeSettingScreen.Currency'),
    color: Colors.primary,
    isSelected: true,
  },
  {
    name: 'AboutANC',
    title: i18next.t('HomeSettingScreen.AboutANC'),
    color: Colors.primary,
    isSelected: true,
  },
];

export const listPersonalMenuShow: PersonalMenuFieldDrag[] = [
  {
    name: 'Project',
    title: i18next.t('HomeSettingScreen.Project'),
    color: Colors.primary,
    isSelected: true,
    key: 'KeyProject',
  },
  {
    name: 'News',
    title: i18next.t('HomeSettingScreen.News'),
    color: Colors.primary,
    isSelected: true,
    key: 'KeyNews',
  },
  {
    name: 'QRScan',
    title: i18next.t('HomeSettingScreen.QRScan'),
    color: Colors.primary,
    isSelected: true,
    key: 'KeyQRScan',
  },
  {
    name: 'Helper',
    title: i18next.t('HomeSettingScreen.Helper'),
    color: Colors.primary,
    isSelected: true,
    key: 'KeyHelper',
  },
];

//============= Config custom =============
export interface WidgetConfigField {
  isShow: boolean;
}
export interface ProjectConfigField {
  isShow: boolean;
  numOfItemShow: number;
  sortedBy: string;
}
export interface ResourceConfigField {
  isShow: boolean;
}
export interface NewsConfigField {
  isShow: boolean;
  numOfItemShow: number;
}
export interface PersonalMenuConfigField {
  name: string;
  idx: number;
}

export interface CustomConfigField {
  widgetConfig: WidgetConfigField;
  projectConfig: ProjectConfigField;
  resourceConfig: ResourceConfigField;
  newsConfig: NewsConfigField;
  personalMenuConfig: {
    lsMenuShow: PersonalMenuFieldDrag[];
    lsMenuHide: PersonalMenuField[];
  };
}

export const CustomConfig: CustomConfigField = {
  widgetConfig: {
    isShow: true,
  },
  projectConfig: {
    isShow: true,
    numOfItemShow: 6,
    sortedBy: '1',
  },
  resourceConfig: {
    isShow: true,
  },
  newsConfig: {
    isShow: true,
    numOfItemShow: 5,
  },
  personalMenuConfig: {
    lsMenuShow: listPersonalMenuShow,
    lsMenuHide: listPersonalMenu,
  },
};
