import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ChildActivationEnd } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { usernamePatternValidator} from '../../../data/constant/patternValidators';
import {images} from '../../../data/constant/images';
import { AuthService } from '../../../services/user/auth.service';
import { MenuService } from '../../../services/menu/menu.service';

import { LoginServiceService } from '../../../login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {






  actuallyYear = new Date().getFullYear();
  logo = images.imgPagochinchin;
  iconUser = images.iconLoginUser;
  iconPass = images.iconLoginPassword;
  msgModal: object = {
    header: ['Error', 'Información'],
    body: [ 'Lo sentimos su nombre de usuario\n\n\ty/o contraseña son incorrectos.\n\n\tPor favor, intentelo nuevamente',
            'El usuario ha sido bloqueado, por favor comunicarse con soporte.',
            'Ha ocurrido un error inesperado, por favor vuelva a intentarlo, si persiste el error comunicarse con soporte.']
  };
  disabled = false;
  loginForm: FormGroup;
  stylesForgoot = {width: '13rem'};
  styles = {width: '12.5rem'};
  errorUsername: string;
  errorPassword: string;
  isSubmitted = false;
  get getForm(): any{
    return this.loginForm.controls;
  }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private onAuth: AuthService,
    private modal: NgbModal,
    private loginService: LoginServiceService,
    private menu: MenuService
  ){
    this.createForm();  
  } 
  ngOnInit(): void {
    let a =  this.loginService.getInfo().subscribe((res) => {
      console.log('Res',res.data)
      res.data.forEach(element => {
        //if (element.b == 'ETH' && element.q == 'BUSD'){
        if(element.pm.startsWith("USD") && element.q == 'BUSD' && (element.b == 'BTC' || element.b == 'ETH' || element.b == 'DASH' || element.b == 'PTR' || element.b == 'BS' || element.b == 'EUR') ){
          console.log(element)
        }
        
      });
    });
    this.menu.toHiddenMenu(true);
  }
  onSingIn(): void{
    this.router.navigate(['home/sign-in']);
  }
  onForgotPass(): void{
    this.router.navigate(['home/forgotten-password']);
  }
  onLogin(contenido): void{
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else{
      this.onSendLogin(contenido);
    }
  }
  onSendLogin(contenido): void{

    let json = {
      user : this.loginForm.controls.username.value, 
      pass : this.loginForm.controls.password.value
    }
    
    this.loginService.loginUser(json).subscribe((res) => {
      console.log('Res',res)
      const result = res.result;
      if(result) {
        this.router.navigate(['main/home']);
      }
      else{
        this.openSM(contenido);
      }
    });
  }
  createForm(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
                    Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(6),
                    usernamePatternValidator
                  ])],
      password: ['', [Validators.minLength(6), Validators.maxLength(10), Validators.required]]
    });
  }
  openSM(contenido): void{
    this.modal.open(contenido, {backdrop: 'static' });
  }

}
