import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {

   $userId = new BehaviorSubject('');
    
    setUserId(userId){
      this.$userId.next(userId)
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
