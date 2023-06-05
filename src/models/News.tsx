export interface NewsInfoField {
  id: string;
  title: string;
  intro: string;
  content: string;
  thumbnail: string;
  news_type: string;
  created: string;
  member_only: boolean;
}

export interface NewsCategoryField {
  page: number;
  total: number;
  news: NewsInfoField[];
}

export interface NewsLabelField {
  id: number;
  name: string;
  des: string;
  type: string;
}

export interface NewsDetailField extends NewsInfoField {
  related_news: NewsInfoField[];
}
