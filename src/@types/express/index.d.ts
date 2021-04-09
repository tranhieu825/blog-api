declare namespace Express {
  export interface Request  {
    authorized_user: {
      role: string;
      _id: string;
      name: string;
      status: string;
      phone: string;
    };
  }
}
