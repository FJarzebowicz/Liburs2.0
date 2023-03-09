export type IUser = {
  username: String;
  email: String;
  password: String;
  isTeacher: Boolean;
  attribute: String;
  id: String;
};

export type userState = {
  users?: IUser[];
  error: String;
  isLoading: Boolean;
};
