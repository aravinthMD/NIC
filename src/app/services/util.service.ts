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



  constructor() { }
}
