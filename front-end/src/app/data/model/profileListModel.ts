export class ProfileCreateInterface {
  profileName: string;
  description: string;
  status: string | boolean; 
  privilegesProfileBymoduleList: Array<ProfilePrivilageListInterface>;
}

export class ProfileListInterface {
  profileName: string;
  description: string;
  status: boolean;
  options: {
    see: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export class ProfilePrivilageListInterface {
  nameModule:  string;
  nameProfile: string;
  create: 0 | 1;
  delete: 0 | 1;
  read:   0 | 1;
  update: 0 | 1;
}

export const ProfilesDummies: ProfileListInterface[] = [
  {
    profileName: 'Administrador',
    description: 'El que dirige a los demas',
    status: true,
    options: {
      see: true,
      edit: true,
      delete: true,
    }
  },
  {
    profileName: 'Operador',
    description: 'Mortal que vive bajo las doctrinas del administrador',
    status: false,
    options: {
      see: true,
      edit: false,
      delete: true,
    }
  },
  {
    profileName: 'Operador',
    description: 'Mortal que vive bajo las doctrinas del administrador degradado de la version anterior',
    status: true,
    options: {
      see: true,
      edit: false,
      delete: false,
    }
  },
  {
    profileName: 'Administrador',
    description: 'Derrocado por el administrador actual, solo queda el recuerdo',
    status: false,
    options: {
      see: false,
      edit: true,
      delete: true,
    }
  },
];

