import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
/* Service */
import { AuthService } from '../../../services/user/auth.service';
/* Constantes */
import { images } from '../../../data/constant/images';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-forgotten-pass',
  templateUrl: './forgotten-pass.component.html',
  styleUrls: ['./forgotten-pass.component.css']
})
export class ForgottenPassComponent implements OnInit {
  actuallyYear = new Date().getFullYear();
  logoTvs = images.logoWhiteTVS;
  enabledBtn = false;
  isSubmitted = false;
  userValid = false;
  formForgotten: FormGroup;
  msgModal = {};
  constructor(  private formBuilder: FormBuilder,
                private auth: AuthService,
                private modal: NgbModal,
                private router: Router,
                private menu: MenuService
    ) { this.createForm(); }

  ngOnInit(): void {
    this.menu.toHiddenMenu(true);
  }

  get getForm(): any{
    return this.formForgotten.controls;
  }

  createForm(): void{
    this.formForgotten = this.formBuilder.group({
      userForgotten: ['', Validators.compose([ Validators.required, Validators.minLength(4) ])]
    });
  }

  sendForm(contenido): void{
    this.isSubmitted = true;
    if (this.formForgotten.invalid){
      return;
    } else {
      this.onSendUser(contenido);
    }
  }

  onSendUser(contenido): void{
    let valid: boolean;
    valid = this.auth.searchUser(this.formForgotten.controls.userForgotten.value);
    this.userValid = valid;
    this.openModal(contenido, valid);
  }

  enabledButton(event): void{
    if ( String(event.value).length >= 6) {
      this.enabledBtn = true;
    } else {
      this.enabledBtn = false;
    }
  }

  openModal(contenido, succes): void{
    let head: string;
    let bod: string;
    const sucss = 'Se ha enviado a su correo electrónico la contraseña.';
    const err = 'los datos ingresados no exiten en el sistema, por favor vuelva a intertalo.';
    head = (succes) ? 'Información' : 'Error';
    bod = (succes) ? sucss : err ;
    this.msgModal = {
      header : head,
      body   : bod
    };
    this.modal.open(contenido, {backdrop: 'static' });
  }

  redirectHome(): void{
    this.router.navigate(['home/login']);
  }
}
