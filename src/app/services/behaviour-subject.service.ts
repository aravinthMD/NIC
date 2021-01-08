import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {

   $userId = new BehaviorSubject('');
    // user = this.userId.asObservable();

    setUserId(userId){
      this.$userId.next(userId)
    }

  constructor() { }
}
