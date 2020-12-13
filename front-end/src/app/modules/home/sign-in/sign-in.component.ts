import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* constants */
import { images } from '../../../data/constant/images';
import { Register } from '../../../data/model/register';
/* services */
import { RegisterService } from '../../../services/user/register.service';
import { Input } from '@angular/compiler/src/core';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  actuallyYear = new Date().getFullYear();
  logoTvs = images.logoWhiteTVS;
  iconSucces = images.iconDarkSuccess;
  iconError = images.iconDarkError;
  userRegisterable = false;
  msgModal = {};
  countries: any[] = [];
  caseForm = 'dni';
  enabledBtn = false;
  formRegister: FormGroup;
  formValues: Register = {
    dni: '',
    nombre: '',
    apellido: '',
    fechaNac: '',
    correo: ''
  };
  constructor( private register: RegisterService,
               private modal: NgbModal,
               private router: Router,
               private formBuilder: FormBuilder,
               private menu: MenuService)
  {
    this.createForm();
  }

  ngOnInit(): void {
    this.menu.toHiddenMenu(true);
  }

  isValidInput(input, keypress?: any): void{
    if (this.formRegister.controls[this.caseForm].valid && keypress.key !== 'Tab'){
      this.enabledBtn = true;
      (keypress.key === 'Enter') ? this.nextInput(this.caseForm) : 'no keypress';
    }else{
      this.enabledBtn = false;
    }
    (this.caseForm === 'fechaNac') ? this.formatDateLive(input.value, keypress.key ) : 'is not date';
  }
  formatDateLive(input, keypress): void{
    input = (input === this.formValues.apellido) ? '' : input;
    const cant = String(input).length;
    switch (cant) {
      case 2:
      case 5:
        if (keypress !== 'Backspace') {
          this.formRegister.controls.fechaNac.setValue(input + '/');
        }
        break;
      case 6:
      case 3:
        if (keypress === 'Backspace') {
          this.formRegister.controls.fechaNac.setValue(String(input).slice(0, -1));
        }else if (String(input).slice(-1) !== '/'){
          const ant = String(input).slice(0, -1);
          const ult = String(input).slice(-1);
          this.formRegister.controls.fechaNac.setValue(ant + '/' + ult);
        }
        break;
      default:
        break;
    }
  }
  createForm(): void{
    console.log('Creando el formulario...');
    this.formRegister = this.formBuilder.group({
      dni:      ['', [Validators.required, Validators.minLength(6)  ] ],
      nombre:   ['', [Validators.required, Validators.minLength(3)  ] ],
      apellido: ['', [Validators.required, Validators.minLength(3)  ] ],
      fechaNac: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)  ] ],
      correo:   ['', [Validators.required] ],
    });
  }
  sendForm(contenido): void{
    this.userRegisterable = this.register.verifyExistence(this.formValues);
    setTimeout( () => {
      this.enabledBtn = false;
      if (!this.userRegisterable) {
        this.caseForm = 'dni';
      }
      this.openModal(contenido , this.userRegisterable);
    }, 1500);
  }
  nextInput(actual): void{
    switch (actual) {
      case 'dni':
        this.caseForm = 'nombre';
        this.formValues.dni = this.formRegister.controls.dni.value;
        this.enabledBtn = false;
        break;
      case 'nombre':
        this.caseForm = 'apellido';
        this.formValues.nombre = this.formRegister.controls.nombre.value;
        this.enabledBtn = false;
        break;
      case 'apellido':
        this.caseForm = 'fechaNac';
        this.formValues.apellido = this.formRegister.controls.apellido.value;
        this.enabledBtn = false;
        break;
      case 'fechaNac':
        this.caseForm = 'correo';
        this.formValues.fechaNac = this.formRegister.controls.fechaNac.value;
        this.enabledBtn = false;
        break;
      case 'correo':
        this.caseForm = 'spiner';
        this.formValues.correo = this.formRegister.controls.correo.value;
        this.enabledBtn = false;
        break;
      default:
        this.caseForm = 'dni';
        this.enabledBtn = false;
        break;
    }
  }

  openModal(contenido, succes): void{
    let head: string;
    let bod: string;
    let ico = {};
    const err = 'Los datos suministrados no coinciden con la información en la aplicación, por favor vuelva a intentarlo.';
    const sucss = 'La información suministrada fue validada correctamente, por favor continúe registrando su usuario';
    head = (succes) ? 'Operación exitosa' : 'Error';
    bod = (succes) ? sucss : err ;
    ico = (succes) ? this.iconSucces : this.iconError;
    this.msgModal = {
      header : head,
      body   : bod,
      icon   : ico
    };
    this.modal.open(contenido, {backdrop: 'static' });
  }
  continueRegister(): void{
    this.router.navigate(['home/sign-in-part-2']);
  }
}
