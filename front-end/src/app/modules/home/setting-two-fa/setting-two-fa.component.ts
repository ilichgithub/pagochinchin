import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-setting-two-fa',
  templateUrl: './setting-two-fa.component.html',
  styleUrls: ['./setting-two-fa.component.css']
})
export class SettingTwoFaComponent implements OnInit {
  actuallyYear = new Date().getFullYear();
  msgModal = {};
  disabledBtn = true;
  modalContinue = false;
  caseForm = 'form';
  formSettingTwoFa: FormGroup;
  constructor( private formBuilder: FormBuilder,
               private route: Router,
               private modal: NgbModal,
               private menu: MenuService)
  {
    this.createForm();
  }

  ngOnInit(): void {
    this.menu.toHiddenMenu(true);
  }
  continueRegister(): void{
    this.route.navigate(['home/sign-in-part-4-pin-2fa']);
  }
  createForm(): void{
    this.formSettingTwoFa = this.formBuilder.group({
      codeKey:   ['', [Validators.required, Validators.minLength(6)]],
      checkbox:  ['', Validators.requiredTrue]
    });
  }
  enabledSubmit(): void{
    this.disabledBtn = !this.formSettingTwoFa.valid;
  }
  sendForm(contenido): void{
    if (this.formSettingTwoFa.valid) {
      this.caseForm = 'spiner';
      setTimeout(() => {
        this.caseForm = 'form';
        this.continueRegister();
        // this.openModal(contenido, this.formSettingTwoFa.valid);
      }, 1500);
    }
  }
  openModal(contenido, succes): void{
    let head: string;
    let bod: string;
    const err = 'Los datos suministrados no coinciden con la información en la aplicación, por favor vuelva a intentarlo.';
    const sucss = 'La información suministrada fue validada correctamente, por favor continúe registrando su usuario';
    head = (succes) ? 'Operación exitosa' : 'Error';
    bod = (succes) ? sucss : err ;
    this.msgModal = {
      header : head,
      body   : bod,
    };
    this.modal.open(contenido, {backdrop: 'static' });
  }
}
