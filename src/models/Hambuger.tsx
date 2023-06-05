import i18next from 'i18next';
import { HambugerStackParamList } from '../navigators/stacks/HambugerStack';
import Colors from '../theme/Colors';

export interface FeatureField {
  name: string;
  color: string;
  link: keyof HambugerStackParamList;
}

export interface GroupFeatureField {
  isExpand: boolean;
  nameGroup?: string;
  listFeatures: FeatureField[];
  numColumns: number;
}

export const PersonalFeatures: GroupFeatureField[] = [
  {
    isExpand: false,
    numColumns: 4,
    listFeatures: [
      {
        name: 'PersonalProject',
        color: Colors.primary,
        link: 'ProjectStack',
      },
      {
        name: 'TransactionFromSource',
        color: Colors.primary,
        link: 'TransactionSourceStack',
      },
      {
        name: 'ApiKeyCode',
        color: Colors.primary,
        link: 'ApiKeyCodeStack',
      },
      {
        name: 'PersonalPolicyTemplate',
        color: Colors.primary,
        link: 'PersonalPolicyTemplateStack',
      },
      {
        name: 'AccountManagement',
        color: Colors.primary,
        link: 'AccountManagementStack',
      },
      {
        name: 'CompositeFrame',
        color: Colors.primary,
        link: 'CompositeFrameStack',
      },
      {
        name: 'QuickLink',
        color: Colors.primary,
        link: 'QuickLinkStack',
      },
    ],
  },
  {
    isExpand: true,
    nameGroup: i18next.t('HambugerScreen.UserAccount'),
    numColumns: 4,
    listFeatures: [
      {
        name: 'ChangePass',
        color: Colors.primary,
        link: 'ChangePassScreen',
      },
      {
        name: 'ChangePinCode',
        color: Colors.primary,
        link: 'ChangePinCodeScreen',
      },
      {
        name: 'LoginMethod',
        color: Colors.primary,
        link: 'LoginMethodScreen',
      },
      {
        name: 'AccountIntroduction',
        color: Colors.primary,
        link: 'AccountIntroductionStack',
      },
      {
        name: 'UpgradeAccount',
        color: Colors.primary,
        link: 'UpgradeAccountStack',
      },
    ],
  },
  {
    isExpand: true,
    nameGroup: i18next.t('HambugerScreen.Profile'),
    numColumns: 5,
    listFeatures: [
      {
        name: 'ProfileInformation',
        color: Colors.primary,
        link: 'ProfileInformationStack',
      },
      {
        name: 'KYC',
        color: Colors.primary,
        link: 'KYCStack',
      },
      {
        name: 'ContactMethod',
        color: Colors.primary,
        link: 'ContactMethodStack',
      },
      {
        name: 'AddressBook',
        color: Colors.primary,
        link: 'AddressBookStack',
      },
      {
        name: 'PublicProfile',
        color: Colors.primary,
        link: 'PublicProfileStack',
      },
    ],
  },
];

export const SystemANCFeatures: GroupFeatureField[] = [
  {
    isExpand: false,
    numColumns: 4,
    listFeatures: [
      {
        name: 'News',
        color: Colors.primary,
        link: 'NewsStack',
      },
      {
        name: 'PublicProject',
        color: Colors.primary,
        link: 'ProjectStack',
      },
      {
        name: 'IntroductionToANC',
        color: Colors.primary,
        link: 'AboutStack',
      },
      {
        name: 'InterfaceAdjustment',
        color: Colors.primary,
        link: 'InterfaceAdjustmentStack',
      },
    ],
  },
  {
    isExpand: true,
    nameGroup: i18next.t('HambugerScreen.Utility'),
    numColumns: 2,
    listFeatures: [
      {
        name: 'ScanQR',
        color: Colors.primary,
        link: 'QRStack',
      },
      {
        name: 'Helper',
        color: Colors.primary,
        link: 'HelperStack',
      },
      {
        name: 'RequestAdditionalLibraries',
        color: Colors.primary,
        link: 'RequestAdditionalLibrariesStack',
      },
      {
        name: 'TransactionSourceRegistration',
        color: Colors.primary,
        link: 'TransactionRegisterStack',
      },
    ],
  },
  {
    isExpand: true,
    nameGroup: i18next.t('HambugerScreen.SystemResources'),
    numColumns: 3,
    listFeatures: [
      {
        name: 'TransactionSource',
        color: Colors.primary,
        link: 'TransactionSourceStack',
      },
      {
        name: 'PolicyPattern',
        color: Colors.primary,
        link: 'PolicyStack',
      },
      {
        name: 'TransactionalRole',
        color: Colors.primary,
        link: 'TransactionRoleStack',
      },
      {
        name: 'TransactionStructure',
        color: Colors.primary,
        link: 'TransactionStructureStack',
      },
      {
        name: 'TransactionProperties',
        color: Colors.primary,
        link: 'TransactionPropertiesStack',
      },
      {
        name: 'Currency',
        color: Colors.primary,
        link: 'CurrencyStack',
      },
    ],
  },
];
