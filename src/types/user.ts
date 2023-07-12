export type User = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: RoleUser;
  comments: CommentUser[];
  avatar: string;
  booking: BookingUser;
  delivery: DeliveryUser;
  history: HistoryUser;
};

export type BookUser = {
  image?: string;
  id: number;
  rating?: number;
  issueYear: string;
  title: string;
  authors?: string[];
};

type CommentUser = {
  id: number;
  rating: number;
  text?: string;
  bookId: number;
};

type RoleUser = {
  id: number;
  name: string;
  description: string;
  type: string;
};

type BookingUser = {
  id: number;
  order: boolean;
  dateOrder: string;
  book: BookUser;
};

type DeliveryUser = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: BookUser;
};

type HistoryUser = {
  id: number;
  books: BookUser[];
};
