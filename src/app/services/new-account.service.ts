import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewAccountService {
    private insertionFlag = new BehaviorSubject(0);
    private flagValue = 0;

    setFlagForShowingPages(value) {
        if (value === 'reset') {
            this.flagValue = 0;
            this.insertionFlag.next(0);
            return;
        }
        if (this.flagValue === value || this.flagValue > value) {
            return;
        }
        if (this.flagValue < value) {
            this.flagValue = value;
        }
        this.insertionFlag.next(value);
    }

    getFlagForShowingPages() {
        return this.insertionFlag;
    }


}
