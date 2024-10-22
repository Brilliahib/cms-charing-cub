export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: Date;
}

export interface TypesArticle {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
