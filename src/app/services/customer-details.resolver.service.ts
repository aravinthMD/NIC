import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ClientDetailsService } from './client-details.service';
import { NewAccountService } from './new-account.service';
import { UserInfoService } from './user-info.service';
import { UtilService } from './util.service';


@Injectable({
    providedIn: 'root'
})
export class CustomerDetailsResolver implements Resolve<any> {

    constructor(
        private userInfoService: UserInfoService,
        private utilService: UtilService,
        private clientDetailService: ClientDetailsService,
        private newAccountService: NewAccountService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const customerId = (route.firstChild.params || {}).id;
        console.log('customerId', customerId);
        if (!customerId) {
            return;
        }
        this.clientDetailService.setClientId(customerId);
        this.userInfoService.getCustomerDetailByCustomerId(customerId)
            .subscribe((response: any) => {
                const processVariables = response.ProcessVariables;
                this.utilService.setCustomerDetails(processVariables);
                // this.newAccountService.setFlagForShowingPages(processVariables.insertionFlag);
            });
        // console.log('id', route.firstChild.params);
    }

}

