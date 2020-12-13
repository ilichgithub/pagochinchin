import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* Constant */
import { images } from '../../../data/constant/images';
/* Modulos */
import { AuthService } from '../../../services/user/auth.service';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-login-with-two-fa',
  templateUrl: './login-with-two-fa.component.html',
  styleUrls: ['./login-with-two-fa.component.css']
})
export class LoginWithTwoFaComponent implements OnInit {
  actuallyYear = new Date().getFullYear();
  msgModal: object = {};
  logo = images.logoWhiteTVS;
  enabledBtn = false;
  twoFaForm: FormGroup;
  isValid = false;
  /* Native Functions */
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private onAuth: AuthService,
    private router: Router,
    private menu: MenuService
  ){this.createForm(); }

  ngOnInit(): void {
    this.menu.toHiddenMenu(true);
  }
  /* Additional Functions*/
  checkReadyToSend(input, event): void{
    console.log(event.key);
    (event.key === 'Enter') ? event.srcElement.blur () : console.log('no es enter');
    this.enabledBtn = (String(input.value).length === 6) ? true : false;
  }
  createForm(): void{
    this.twoFaForm = this.formBuilder.group({
      pin: ['', [ Validators.required, Validators.maxLength(6), Validators.minLength(6) ]]
    });
  }
  sendPin(contenido): void{
    if (this.twoFaForm.valid) {
      let valid = false;
      const pin = this.twoFaForm.controls.pin.value;
      valid = this.onAuth.doTwoFa(pin);
      this.openModal(contenido, valid);
    }
  }
  openModal(contenido, succes): void{
    let head: string;
    let bod: string;
    this.isValid = succes;
    head = (succes) ? 'Información' : 'Error';
    bod = (succes) ? 'Usted se ha registrado correctamente Por favor inicie sesión' : 'El Pin que introdujo es incorrecto';
    this.msgModal = {
      header : head,
      body   : bod
    };
    this.modal.open(contenido, {backdrop: 'static' });
  }
  redirectLogin(): void{
    this.router.navigate(['home/login']);
  }

}
