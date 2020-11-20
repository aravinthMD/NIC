import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  detectSidNav$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setCurrentUrl(data) {
        this.detectSidNav$.next(data)
    }

    clearDirty$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setClearDirty(data) {
        this.clearDirty$.next(data)
    }

    projectNumber$: BehaviorSubject<string> = new BehaviorSubject('');
    
    setProjectNumber(data) {
        this.projectNumber$.next(data)
    }

    userDetails$:BehaviorSubject<string> = new BehaviorSubject<any>({});
    
    setUserDetails(data) {
        this.userDetails$.next(data)
    }




  constructor() { }
}
