export interface BannerItemField {
  uri: string;
}

export interface BannerField {
  id: string;
  category_name: string;
  icon_image: string;
  icon_font: any;
  title: string;
  slug: string;
  body: string;
}

export const Banner: BannerItemField[] = [
  {
    uri: require('../assets/images/banner2.jpg'),
  },
  {
    uri: require('../assets/images/banner1.jpg'),
  },
  {
    uri: require('../assets/images/banner3.jpg'),
  },
  {
    uri: require('../assets/images/banner4.jpg'),
  },
];
