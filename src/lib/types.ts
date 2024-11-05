export interface Article extends FrontMatterFields {
  content: React.ReactNode;
  filename: string;
}

export interface FrontMatterFields {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  categories: string[];
  draft: boolean;
  featured?: boolean;
  image: string;
  alt_text: string;
  reading_time: string;
  layout: string;
  canonical_url: string;
  seo_title: string;
  seo_description: string;
  keywords: string[];
  published: boolean;
  updated: string;
  shorts?: boolean;
  video_url: string;
  related_posts?: string[];
}
