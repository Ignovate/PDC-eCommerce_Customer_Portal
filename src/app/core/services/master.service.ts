import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class masterService {
    private variable = new BehaviorSubject<string>('0');
    private variableLogin = new BehaviorSubject<boolean>(false);
    private variableLoginUser = new BehaviorSubject<string>('');
    castLogin = this.variableLogin.asObservable();
    casting = this.variable.asObservable();
    castLoginUser = this.variableLogin.asObservable();
    
    constructor() {
    }
    variableWatches(newValue){
         this.variable.next(newValue);
    }
    variableWatchesLogin(newValue){
          this.variableLogin.next(newValue);
    }
    variableWatchesLoginUser(newValue){
         this.variableLoginUser.next(newValue);
    }
}