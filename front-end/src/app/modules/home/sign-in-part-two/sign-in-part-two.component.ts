import { FormBuilder, Validators, Validator, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* const */
import { images } from '../../../data/constant/images';
import { errPasswordInput } from '../../../data/constant/msgInputsError';
import { RegisterPartTwo } from '../../../data/model/registerPartTwo';
/* service */
import { RegisterService } from '../../../services/user/register.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-sign-in-part-two',
  templateUrl: './sign-in-part-two.component.html',
  styleUrls: ['./sign-in-part-two.component.css']
})
export class SignInPartTwoComponent implements OnInit {
  actuallyYear = new Date().getFullYear();
  msgInput = 'valid';
  caseForm = 'form';
  invalidPass = false;
  invalidAgain = false;
  enabledBtn = false;
  modalContinue = false;
  formRegister2: FormGroup;
  logoTvs = images.logoWhiteTVS;
  msgModal = {};
  constructor(  private formBuilder: FormBuilder,
                private register: RegisterService,
                private modal: NgbModal,
                private route: Router,
                private menu: MenuService){
    this.createForm();
   }

  ngOnInit(): void {
    this.menu.toHiddenMenu(true);
  }

  userInvalid(validator): boolean{
    let valid = false;
    switch (validator) {
      case 'required':
        if (this.formRegister2.controls.user.errors !== null) {
          valid = this.formRegister2.controls.user.errors.required && this.formRegister2.controls.user.touched;
        }
        break;
      case 'minLength':
        if (this.formRegister2.controls.user.errors !== null) {
          valid = this.formRegister2.controls.user.errors.minlength && this.formRegister2.controls.user.touched;
        }
        break;

      default:
        break;
    }
    return valid;
  }
  passwordInvalid(pass): boolean{
    console.log(pass);
    let valid = false;
    valid = /[a-z]/.test(pass);
    valid = /[A-Z]/.test(pass) && valid;
    valid = /\d/.test(pass) && valid;
    valid = /[.*-/]/.test(pass) && valid;
    valid = /^[a-zA-Z\d*./-]{6,10}$/.test(pass) && valid;
    this.msgInput = (!valid) ? errPasswordInput.errCharPassword : 'valid';
    this.invalidPass = !valid;
    console.log('pass valid: ' + valid);
    return valid;
  }
  passwordDiferent(pass, againPass): boolean{
    let valid = false;
    valid = (pass === againPass ) ? true : false;
    this.msgInput = (!valid) ? errPasswordInput.errDiferentPassword : 'valid';
    this.invalidAgain = !valid;
    console.log('pass: ' + pass);
    console.log('rep pass: ' + againPass);
    return valid;
  }
  createForm(): void{
    this.formRegister2 = this.formBuilder.group({
      user:           [null, [Validators.required, Validators.minLength(6)]],
      password:       [null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      againPassword:  [null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }
  isValidInput(inputId, keypress): void{
    console.log(this.formRegister2.valid);
    if (this.formRegister2.valid) {
      this.enabledBtn = true;
    }else{
      this.enabledBtn = false;
    }
  }
  sendForm(contenido): void{
    let valid = false;
    this.caseForm = 'spiner';
    if (this.formRegister2.valid && !this.invalidPass && !this.invalidAgain ) {
      console.log('enviando formulario');
      const valuesform: RegisterPartTwo = {
        user: this.formRegister2.controls.user.value ,
        password: this.formRegister2.controls.password.value,
        againPassword: this.formRegister2.controls.againPassword.value
      };
      setTimeout(() => {
        this.caseForm = 'form';
        valid = this.register.registerNewUser(valuesform);
        this.openModal(contenido, valid);
      }, 1500);
    }else{
      console.log('Datos ingresados incorrectamente');
    }
  }
  continueRegister(): void{
    this.route.navigate(['home/sign-in-part-3-setting-2fa']);
  }
  openModal(contenido, succes): void{
    let head: string;
    let bod: string;
    const registerOk = 'Se registró su usuario correctamente. por favor continué con la configuración de doble factor de autenticación';
    const registerInvalid = 'El usuario ya existe en el sistema, por favor ingrese otro.';
    this.modalContinue = succes;
    head = 'Información';
    bod = (succes) ? registerOk : registerInvalid;
    this.msgModal = {
      header : head,
      body   : bod
    };
    this.modal.open(contenido, {backdrop: 'static' });
  }
}
