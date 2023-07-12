import { BookPreview } from './book-preview';

export type BookItem = BookPreview & {
  description?: string;
  publish?: string;
  pages?: string;
  cover?: string;
  weight?: string;
  format?: string;
  ISBN?: string;
  producer?: string;
  comments?: Comment[];
  images?: Image[];
};

export type Image = {
  url: string;
};

export type Comment = {
  id: number;
  rating: number;
  text?: string;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
};
