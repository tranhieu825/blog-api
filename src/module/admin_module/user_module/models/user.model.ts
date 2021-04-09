
// Đăng kí

export interface IUserCreateForm {
  id: string;
  email: string;
  role: string;
  name: string;
  phone:string;
  password: string;
}


// Login

export interface IUserLoginForm {
  email: string;
  password: string;
}