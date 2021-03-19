import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
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
        return this.userInfoService.getCustomerDetailByCustomerId(customerId)
            .pipe(
                map((response: any) => {
                    const processVariables = response.ProcessVariables;
                    this.utilService.setUserDetails(processVariables);
                    this.utilService.setCustomerDetails(processVariables);
                    this.clientDetailService.setClientStatus(processVariables.status == '1');
                    this.newAccountService.setFlagForShowingPages(processVariables.insertionFlag);
                })
               );
        console.log('id', route.firstChild.params);
        // return this.userInfoService.getCustomerDetailByCustomerId(customerId);
    }

}

