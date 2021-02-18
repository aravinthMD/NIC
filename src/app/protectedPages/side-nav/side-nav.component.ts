import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';


import { UtilService } from '../../services/util.service'

import { environment } from '../../../environments/environment';

import { ClientDetailsService } from '@services/client-details.service';
import { ToasterService } from '@services/toaster.service';
import { UtilityService } from '@services/utility.service';
import { NewAccountService } from '@services/new-account.service';
import { ToggleSideMenuService } from '@services/toggle-sidemenu.service';
import { filter } from 'rxjs/operators';
import { F } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit,OnChanges {

  isLocation: string;

  parentLocation: string;

  accountInfoNav: string;

  version: string;
  buildDate: string;

  isExistingUser: boolean;
  clientId: string;
private loginDetail:any;
public isCustomerModule: boolean;
public smsCreditAllocationModule: boolean;
public purchaseOrderModule: boolean;
public emailModule: boolean;
public reportModule: boolean;
public adminModule: boolean;
public taxInvoiceModule: boolean;
public projectExecutionModule: boolean;
public performaInvoiceModule: boolean;
private mySetting: Array<any>;
insertionFlag: number;
showSideMenu = false;
// showOtherMenus: boolean;
  constructor(
    private location: Location,
    private utilService: UtilService,
    private router: Router,
    private clientDetailService: ClientDetailsService,
    private toasterService: ToasterService,
    private activatedRoute: ActivatedRoute ,
    private utilityService: UtilityService,
    private newAccountService: NewAccountService,
    private toggleSideMenuService: ToggleSideMenuService
    ) {

      this.version = environment.version;
      this.buildDate = environment.buildDate;
      this.loginDetail = this.utilityService.getLoginDetail();
      console.log("loginDetail",this.loginDetail);
      this.mySetting = this.loginDetail["settingsDataList"];
      console.log("mySetting",this.mySetting);
      if(this.mySetting){
        this.isCustomerModule = this.mySetting.find(
            val => val['ScreenName'] == 'CustomerModule')['isMapping'];
            console.log("isCustomerModule",this.isCustomerModule);
        this.smsCreditAllocationModule = this.mySetting.find(
          val => val['ScreenName'] == 'SmsCreditAllocation')['isMapping'];
          console.log("smsCreditAllocationModule",this.smsCreditAllocationModule);
        this.purchaseOrderModule = this.mySetting.find(
          val => val['ScreenName'] == 'PurchaseOrder')['isMapping'];
          console.log("purchaseOrderModule",this.purchaseOrderModule);
          this.emailModule = this.mySetting.find(
            val => val['ScreenName'] == 'EmailOperations')['isMapping'];
            console.log("emailModule",this.emailModule); 
          this.reportModule = this.mySetting.find(
            val => val['ScreenName'] == 'Reports')['isMapping'];
            console.log("reportModule",this.reportModule);
          this.projectExecutionModule = this.mySetting.find(
            val => val['ScreenName'] == 'ProjectExecution')['isMapping'];
            console.log("ProjectExecution",this.projectExecutionModule); 
          this.adminModule = this.mySetting.find(
            val => val['ScreenName'] == 'Admin')['isMapping'];
            console.log("adminModule",this.adminModule); 
          this.taxInvoiceModule = this.mySetting.find(
            val => val['ScreenName'] == 'TaxInvoice')['isMapping'];
            console.log("taxInvoiceModule",this.taxInvoiceModule); 
          this.performaInvoiceModule = this.mySetting.find(
            val => val['ScreenName'] == 'PerformaInvoice')['isMapping'];
            console.log("performaInvoiceModule",this.performaInvoiceModule); 
        }  
  }

  ngOnInit() {

    this.toggleSideMenuService.getToggleListener()
        .subscribe((value) => {
            this.showSideMenu = value;
        });


    this.listenerForGetFlagValues();
    // this.activatedRoute.params.subscribe((res: any) => {
    //   this.clientId = res.id || '';
    // });

    this.utilService.detectSidNav$.subscribe((user)=> {
      console.log('DETECT SIDE NAV ********',user)

      if(user == 'newuser') {
        this.isLocation = '1'
      }else if(user == 'dashboard') {
        this.parentLocation= ''
        this.isLocation = '0'
      }else if(user.includes('users/customerDetails')){
        this.parentLocation= '1'
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.1'
      }else if(user.includes('users/techAdmin')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.2'
      }else if(user.includes('users/billingAdmin')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.3'
      }else if(user.includes('users/smsCredit')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.4'
      }else if(user.includes('users/projectExecution')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.3'
      }else if(user.includes('users/proformaInvoice')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.2'
      }else if(user.includes('users/purchaseOrder')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.4'
      }else if(user.includes('users/taxInvoice')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.5'
      }
    })


    const path = this.location.path();
    // this.highlightsSideMenu(path);

    this.listenerForLocationChange();

    if(path.includes('users/Dashboard')){
      this.isLocation = '0'
    }else if(path.includes('users/proformaInvoice')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.2'
    }else if(path.includes('users/projectExecution')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.3'
    }else if(path.includes('users/purchaseOrder')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.4'
    }else if(path.includes('users/taxInvoice')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.5'
    }else if(path.includes('users/customerDetails')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.1'
    }else if(path.includes('users/techAdmin')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.2'
    }else if(path.includes('users/billingAdmin')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.3'
    }else if(path.includes('users/smsCredit')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.4'
    }else if(path.includes('users/reports')){
      this.isLocation = '3'
    }else if(path.includes('users/sendemail')) {
      this.parentLocation='4'
      this.isLocation = '4.1'
    }else if(path.includes('users/managegroup')) {
      this.parentLocation='4'
        this.isLocation = '4.2'
    }else if(path.includes('admin/manageUser')) {
      this.isLocation = '2.1';
    }else if(path.includes('admin/createuser')) {
      this.isLocation = '2.2';
    }else if(path.includes('admin/manageUsers')){
      this.isLocation = '2.3'
    }else if(path.includes('admin/managelovs')){
      this.isLocation = '2.4'
    }else if(path.includes('admin/manageRoles')){
      this.isLocation = '2.5'
    }else if(path.includes('/admin/manageEmail')){
      this.isLocation = '2.6'
    }

    if(path.includes('users/') && !path.includes('users/Dashboard') && !path.includes('users/reports') &&!path.includes('users/sendemail') &&!path.includes('users/managegroup')) {
      this.parentLocation = '1'
    }else if(path.includes('admin/')) {
      this.parentLocation = '2' 
    }else if(path.includes('/sendemail')||path.includes('/managegroup')){
        this.parentLocation = '4'
    }else {
      this.parentLocation = ''
    }

    if(path.includes('users/proformaInvoice') || path.includes('users/projectExecution') || path.includes('users/purchaseOrder') || path.includes('users/taxInvoice') || path.includes('users/smsCredit')) {

      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.1'
      this.router.navigate(['/users/customerDetails'])

    }
   

  //   this.utilService.projectNumber$.subscribe((pno)=> {
  //     if(pno){
  //       this.isExistingUser = true
  //     }else {
  //       this.isExistingUser = false
  //     }
  // })
   
    
  }

  listenerForGetFlagValues() {
    this.newAccountService.getFlagForShowingPages()
        .subscribe((value) => {
            // if (value === 3) {
            //     this.showOtherMenus = true;
            // } else {
            //   this.showOtherMenus = false;
            // }
            this.insertionFlag = value;
        });
  }


  listenerForLocationChange() {
    // this.activatedRoute.params.subscribe((res) => {
    //     console.log('side nav change', res);
    // });
    
    this.location.onUrlChange((url) => {
        const clientId = this.clientDetailService.getClientId();
        this.isExistingUser = !!clientId;
        console.log('side nav change', clientId);
        this.highlightsSideMenu(url);
    });
  }

  highlightsSideMenu(user) {
    if(user == 'newuser') {
      this.isLocation = '1'
    }else if(user == 'dashboard') {
      this.parentLocation= ''
      this.isLocation = '0'
    }else if(user.includes('users/customerDetails')){
      this.parentLocation= '1'
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.1'
    }else if(user.includes('users/techAdmin')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.2'
    }else if(user.includes('users/billingAdmin')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.3'
    }else if(user.includes('users/smsCredit')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.4'
    }else if(user.includes('users/projectExecution')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.3'
    }else if(user.includes('users/proformaInvoice')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.2'
    }else if(user.includes('users/purchaseOrder')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.4'
    }else if(user.includes('users/taxInvoice')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.5'
    }
  }

  ngOnChanges(){

    

  }

  navigateRoute(route: string) {

    // let projectNo = ''
      // this.utilService.projectNumber$.subscribe((pno)=> {
      //     projectNo = pno;
      // })

      // this.activatedRoute.params.subscribe((value) => {
        // const clientId =  value.id;
      const clientId = this.clientDetailService.getClientId();
      if (!clientId && (route.includes('billingAdmin') || route.includes('techAdmin'))) {
          this.toasterService.showError(
            `Can't proceed without submitting customer details`,
            ''
          );
          return;
      }
      if (this.insertionFlag <= 1 && route.includes('billingAdmin')) {
         return this.toasterService.showError(`Can't proceed without submitting technical admin details`, '');
      }
      if (clientId) {
          this.router.navigate([`${route}/${clientId}`]);
      } else {
          this.router.navigate([route]);
      }

      // });
  }

  navigation(route: string) {
  this.isLocation = route;

  if(route.includes('1.')){
    this.accountInfoNav = '1.1'
  }else {
    this.utilService.setProjectNumber(null)
    this.clientDetailService.setClientId('');
    this.accountInfoNav = ''
  }

  if(route.includes('2.')) {
      this.parentLocation = '2'
  }else if(route.includes('1.')){
    this.parentLocation = '1'
  }else if(route.includes('4.')){
    this.parentLocation='4'
  }else {
    this.parentLocation = ''
  }
  

  }

}
