import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService{

  private openMenu = new BehaviorSubject(false);
  currentOpenMenu = this.openMenu.asObservable();
  private hiddenMenu = new BehaviorSubject(true);
  currentHiddenMenu = this.hiddenMenu.asObservable();
  constructor() { }

  toggleMenu(status: boolean): void{
    this.openMenu.next(status);
  }

  toHiddenMenu(hidden: boolean): void{
    this.hiddenMenu.next(hidden);
  }
}
