export interface Login {
  userName: string;
  password: string;
}

export const userDummy: Login = {
  userName: 'test001',
  password: '123456'
};

export const userDummy2Fa: any = {
  user: 'test001',
  pin:  '000000'
};

