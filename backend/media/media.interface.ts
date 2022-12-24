interface Media {
  id: number;
  title: string;
  status: string;
  cloudinaryId: string;
  url: string;
  type: string;
  upvotes: [string];
  user: string;
}

export default Media;
