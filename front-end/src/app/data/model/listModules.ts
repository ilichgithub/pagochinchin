export class ListModule {
  name: string;
  disabled:boolean;
}

export const modules: ListModule[] = [
  {
    name:'Dashboard',
    disabled: false
  },
  {
    name:'Gestión de perfiles',
    disabled: false
  },
  {
    name:'Asignación de CTE',
    disabled: false
  },
  {
    name:'Gestión de dispositivos',
    disabled: false
  },
  {
    name:'Carga masiva',
    disabled: false
  },
  {
    name:'Administrador técnico',
    disabled: false
  },
  {
    name:'Administrador',
    disabled: false
  },
  {
    name:'Auditoria',
    disabled: false
  },
  {
    name:'Reportes',
    disabled: false
  },
  {
    name:'Captura',
    disabled: false
  },
  {
    name:'Validación',
    disabled: false
  },
];
