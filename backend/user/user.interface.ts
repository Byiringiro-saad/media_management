interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  medias: string[];
  usedGoogle: boolean;
}

export default User;