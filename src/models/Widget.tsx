import Colors from '../theme/Colors';
import { NewsInfoField } from './News';

export interface UtilityField {
  name: string;
  color: string;
  authRequire: boolean;
  slug: string;
}

export interface UtilityWidgetField {
  isShow: boolean;
  utilities: UtilityField[];
}

// export const DefaultUtilityWidget: UtilityField[] = [
//   {
//     name: 'QR',
//     color: Colors.primary,
//     authRequire: false,
//   },
//   {
//     name: 'TransactionRegister',
//     color: Colors.primary,
//     authRequire: false,
//   },
//   {
//     name: 'Helper',
//     color: Colors.primary,
//     authRequire: false,
//   },
//   {
//     name: 'HomeSetting',
//     color: Colors.primary,
//     authRequire: true,
//   },
// ];

export interface ProjectInfoField {
  title: string;
  content: string;
  participant: number;
  total: number;
  transaction: number;
  transactionStructure: number;
  policy: number;
  wallet: number;
  createdAt: string;
}

export interface UserInfoField {
  name: string;
  avatar: string;
}

export interface ProjectField {
  projectInfo: ProjectInfoField;
  projectOwner: UserInfoField;
}

enum ProjectSort {
  date = 0,
  transaction = 1,
  participant = 2,
}

export interface ProjectWidgetField {
  row: number;
  isShow: boolean;
  limit: number;
  sort: ProjectSort;
  projects: ProjectField[];
}

export const DefaultProjectWidget: ProjectWidgetField = {
  row: 2,
  isShow: true,
  limit: 6,
  sort: 0,
  projects: [
    {
      projectInfo: {
        title: 'Quần áo Shopee',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        participant: 5000,
        total: 30000,
        transaction: 20,
        transactionStructure: 5,
        policy: 3,
        wallet: 2,
        createdAt: '2022-01-22T12:00:00-02:30',
      },
      projectOwner: {
        name: 'Juliet',
        avatar:
          'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg',
      },
    },
    {
      projectInfo: {
        title: 'Apple Flagship Tiki',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        participant: 5000,
        total: 30000,
        transaction: 20,
        transactionStructure: 5,
        policy: 3,
        wallet: 2,
        createdAt: '2023-01-22T12:00:00-02:30',
      },
      projectOwner: {
        name: 'Juliet',
        avatar:
          'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-9.jpg',
      },
    },
    {
      projectInfo: {
        title: 'Đồ công nghệ Lazada',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        participant: 5000,
        total: 30000,
        transaction: 20,
        transactionStructure: 5,
        policy: 3,
        wallet: 2,
        createdAt: '2022-01-24T12:00:00-02:30',
      },
      projectOwner: {
        name: 'Juliet',
        avatar:
          'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg',
      },
    },
    {
      projectInfo: {
        title: 'Fintech AAA',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        participant: 5000,
        total: 30000,
        transaction: 20,
        transactionStructure: 5,
        policy: 3,
        wallet: 2,
        createdAt: '2022-01-25T12:00:00-02:30',
      },
      projectOwner: {
        name: 'Juliet',
        avatar:
          'https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg',
      },
    },
    {
      projectInfo: {
        title: 'Bảo hiểm',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        participant: 5000,
        total: 30000,
        transaction: 20,
        transactionStructure: 5,
        policy: 3,
        wallet: 2,
        createdAt: '2022-01-26T12:00:00-02:30',
      },
      projectOwner: {
        name: 'Juliet',
        avatar:
          'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/13472781254_3a68c4e704_o.jpg',
      },
    },
    {
      projectInfo: {
        title: 'Viccom',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        participant: 5000,
        total: 30000,
        transaction: 20,
        transactionStructure: 5,
        policy: 3,
        wallet: 2,
        createdAt: '2022-01-27T12:00:00-02:30',
      },
      projectOwner: {
        name: 'Juliet',
        avatar:
          'https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-aperture.jpg',
      },
    },
  ],
};

export interface NewsWidgetField {
  isShow: boolean;
  limit: number;
  news: NewsInfoField[];
}

export const DefaultNewsWidget: NewsWidgetField = {
  isShow: true,
  limit: 6,
  news: [
    // {
    //   title: 'When an unknown printer took a galley of type.',
    //   content: 'test',
    //   thumbnail:
    //     'https://www.cribfb.com/journal/public/journals/4/homepageImage_en_US.jpg',
    //   createdAt: '2021-03-25T12:00:00-06:30',
    // },
    // {
    //   title: 'It is a long established fact that a reader will be distracted.',
    //   content: 'test',
    //   thumbnail:
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDYzKvYvzsZhkHQLdisHKaRzNhejB0TQZ2E64NKbpd9wQox68l2UJoikXdin4mEf-K-9w&usqp=CAU',
    //   createdAt: '2021-04-12T12:00:00-06:45',
    // },
    // {
    //   title: 'When an unknown printer took a galley of type.',
    //   content: 'test',
    //   thumbnail:
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXrcNk5QA4z2QmttI9UFqN6GeYL0fcHsS7OqVdMMbNTkEuzfRH8ohonpBFv1V7niu8xA&usqp=CAU',
    //   createdAt: '2022-01-25T12:00:00-02:30',
    // },
    // {
    //   title: 'It is a long established fact that a reader will be distracted.',
    //   content: 'test',
    //   thumbnail:
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sUNp3yJOsMk3bixVwmXiza74L-z7I2SbVqOZuA2JzeeAkDPRqenG6jeU5EhrgbMbzA&usqp=CAU',
    //   createdAt: '2022-01-29T12:00:00-02:30',
    // },
  ],
};

export interface ResourceField {
  name: string;
  color: string;
  notiCount: number;
}

export interface ResourceWidgetField {
  isShow: true;
  resources: ResourceField[];
}

export const DefaultResourceWidget: ResourceWidgetField = {
  isShow: true,
  resources: [
    {
      name: 'TransactionSource',
      color: Colors.primary,
      notiCount: 5,
    },
    {
      name: 'PolicyPattern',
      color: Colors.primary,
      notiCount: 10,
    },
    {
      name: 'TransactionStructure',
      color: Colors.primary,
      notiCount: 5,
    },
    {
      name: 'TransactionRole',
      color: Colors.primary,
      notiCount: 5,
    },
    {
      name: 'HomeSetting',
      color: Colors.primary,
      notiCount: 0,
    },
  ],
};
