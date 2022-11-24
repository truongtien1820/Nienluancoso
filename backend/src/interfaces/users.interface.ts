export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  myPosts: string[];
  email: string;
  phoneNumber: string;
  sex: string;
}
