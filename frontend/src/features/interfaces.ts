export interface Media {
  _id: string;
  url: string;
  cloudinaryId: string;
  title: string;
  type: string;
  status: string;
  upvotes: [string];
  user: string;
}
