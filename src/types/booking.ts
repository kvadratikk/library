export type Booking = {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
};

export type ChangedBooking = Booking & {
  bookingId: number;
};
