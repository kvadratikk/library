export type BookPreview = {
  image?: { url: string };
  rating?: number;
  title: string;
  authors?: string[];
  issueYear?: string;
  id: number;
  categories?: string[];
  booking?: BookingBooks | null;
  delivery?: Delivery;
  histories?: History[];
};

export type BookingBooks = {
  id: number;
  order: boolean;
  dateOrder?: string;
  customerId?: number;
  customerFirstName?: string;
  customerLastName?: string;
};

type Delivery = {
  id: number;
  handed: boolean;
  dateHandedFrom?: string;
  dateHandedTo?: string;
  recipientId?: number;
  recipientFirstName?: string;
  recipientLastName?: string;
};

type History = {
  id?: number;
  userId?: number;
};
