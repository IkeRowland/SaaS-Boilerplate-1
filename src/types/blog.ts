export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  image?: string;
  tags?: string[];
  readingTime?: string;
};

export type BlogCategory = {
  slug: string;
  title: string;
  description?: string;
};
