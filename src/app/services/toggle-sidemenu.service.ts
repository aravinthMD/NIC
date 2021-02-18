import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleSideMenuService {
    private toggleSideMenu = new BehaviorSubject(false);

    toggle(value: boolean) {
        this.toggleSideMenu.next(value);
    }
    getToggleListener() {
        return this.toggleSideMenu;
    }
}
