import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registerDummy, Register } from '../../data/model/register';
import { registerPartTwoDummy, RegisterPartTwo } from '../../data/model/registerPartTwo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  verifyExistence( userRegister: Register): boolean{
    console.log('Form');
    console.log(userRegister);
    console.log('Dummy');
    console.log(registerDummy);
    let valid: boolean;
    valid = (userRegister.dni      === registerDummy.dni) ? true : false;
    valid = (userRegister.nombre   === registerDummy.nombre && valid === true ) ? true : false;
    valid = (userRegister.apellido === registerDummy.apellido && valid === true ) ? true : false;
    valid = (userRegister.fechaNac === registerDummy.fechaNac && valid === true ) ? true : false;
    valid = (userRegister.correo   === registerDummy.correo && valid === true ) ? true : false;
    if (valid) {
      localStorage.setItem('register', JSON.stringify(userRegister));
    }
    return valid;
  }
  registerNewUser( newRegister: RegisterPartTwo): boolean{
    let valid = false;
    /* servicio: valida que no exista otro con el mismo user */
    valid = newRegister.user !== registerPartTwoDummy.user;
    (valid) ? console.log('creado exitosamente') : console.log('usuario ya existente');
    return valid;
  }
}
