export interface RegisterPartTwo{
  user: string;
  password: string;
  againPassword: string;
}

export const registerPartTwoDummy: RegisterPartTwo = {
  user: 'test001',
  password: 'Test10*',
  againPassword: 'Test10*',
};
