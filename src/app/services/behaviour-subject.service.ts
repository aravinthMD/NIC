import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {

   $userId = new BehaviorSubject('');

   private userId: string;

    setUserId(userId) {
      this.userId = userId;
      this.$userId.next(userId);
    }

    getUserId() {
      return this.userId;
    }


    $poNumber = new BehaviorSubject('');

    setPoNumber(poNumber) {
        this.$poNumber.next(poNumber)
    }
    
    $smsapproved = new BehaviorSubject('');
  
    setSmsApproved(smsapproved) {
        this.$smsapproved.next(smsapproved)

    }
  constructor() { }
}
