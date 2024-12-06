export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}
