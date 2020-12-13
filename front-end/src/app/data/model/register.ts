export interface Register{
  dni: string;
  nombre: string;
  apellido: string;
  fechaNac: string;
  correo: string;
}

export const registerDummy: Register = {
  dni: '1234567890',
  nombre: 'tester',
  apellido: 'tester',
  fechaNac: '01/01/2020',
  correo: 'test@emanager.com',
};
