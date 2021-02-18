import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { BillingAdminService } from '@services/billing-admin.service';
import { ClientDetailsService } from '@services/client-details.service';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UserInfoService } from '@services/user-info.service';
import { UtilService } from '@services/util.service';
import { NewAccountService } from '@services/new-account.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-billing-owner-details',
  templateUrl: './billing-owner-details.component.html',
  styleUrls: ['./billing-owner-details.component.scss']
})
export class BillingOwnerDetailsComponent implements OnInit {

  labels:any;
  name: string;
  billOwnerForm:FormGroup;
  isDirty: boolean;
  propertyFlag : boolean;
  showDataSaveModal : boolean;
  dataValue  = {}

  viewInfoData  : any;


  mobileNumberCodeList = [];

  teleCodeValues = [];

  departmentListData = [];

  user: string;

  accountName: string;
  status: string;

  detectAuditTrialObj: any;

  remarkModal: boolean;


  showView = true;
  userId: string;
  clientId: number;
  isShowViewPage = false;
  insertionFlag: number;
  isWrite = false;

  constructor(
    private labelsService: LabelsService,
    private toasterService: ToasterService,
    private router: Router,
    private utilService: UtilService,
    private userInfoService: UserInfoService,
    private activatedRoute: ActivatedRoute,
    private behser: BehaviourSubjectService,
    private billingAdminService: BillingAdminService,
    private clientDetailService: ClientDetailsService,
    private newAccountService: NewAccountService,
    private utilityService: UtilityService
    ) { }

  ngOnInit() {
    const customerPage = this.utilityService.getSettingsDataList('CustomerModule');
    this.isWrite = customerPage.isWrite;
    this.newAccountService.getFlagForShowingPages()
        .subscribe((value) => {
            this.insertionFlag = value;
        });

    this.initForm();
    this.patchLovValues();

    this.activatedRoute.params.subscribe((value) => {
       if (!value) {
         return;
       }
       this.clientId = Number(value.id || 0);
       this.clientDetailService.setClientId(value.id);
       this.getBillingAdminDetailById(this.clientId);
    });



    this.behser.$userId.subscribe( res => {
      this.userId = res;
    });

    console.log("userId>>", this.userId);
    
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    

    this.user = ''
    this.activatedRoute.params.subscribe((value)=> {
      this.user = value.id;
  });

  console.log(this.activatedRoute)
    if(this.user){

      //this.getBillingAdminDetailById(this.user);
      this.utilService.userDetails$.subscribe((val)=> {

        this.accountName = val['App_name'] || '';
        this.status = val['status'] || '';
      })

      // this.setBillOwnerFormValues();
      }else  {
       this.showView = false
      }
  }

  initForm() {
    this.billOwnerForm = new FormGroup({
      name : new FormControl (null),
      departmentName : new FormControl (null),
      designation: new FormControl (null),
      employeeCode : new FormControl (null),
      email : new FormControl (null),
      mobileNumberCode: new FormControl(''),
      mobileNumber : new FormControl (''),
      telephoneNumber : new FormControl (null),
      telephoneNumberCode: new FormControl(''),
      offAddress1 : new FormControl (null),
      offAddress2 : new FormControl (null),
      offAddress3 : new FormControl (null),
      city : new FormControl (null),
      state : new FormControl (null),
      pinCode : new FormControl (null),
      remark: new FormControl('')
    });
  }

  patchLovValues() {
    const data =  this.activatedRoute.parent.snapshot.data || {};
    const listOfValue = data.listOfValue || {};
    const processVariables = listOfValue.ProcessVariables;
    console.log('listOfValue', processVariables);
    this.mobileNumberCodeList = processVariables.mobileNumberCodeList || [];
    this.departmentListData = processVariables.departmentList || [];
    this.teleCodeValues = processVariables.telephoneNumberCodeList || [];
  }

  setBillOwnerFormValues(data?: any) {
      if (!data.selectedClient) {
        return;
      }
      if (data) {
        this.billOwnerForm.patchValue({
          id: Number(data.id),
          name: data.name,
          departmentName: data.department,
          designation: data.designation,
          employeeCode: data.employeeCode,
          email: data.email,
          mobileNumberCode: data.mobileNumberCode || null,
          mobileNumber: data.mobileNumber,
          telephoneNumber: data.telephoneNumber,
          telephoneNumberCode: data.telephoneNumberCode || null,
          offAddress1: data.oaLine1,
          offAddress2: data.oaLine1,
          offAddress3: data.oaLine1,
          city: data.city,
          state: data.state,
          pinCode: data.pincode,
          remark: data.remark,
          userId: this.clientId,
        });
      }
      this.detectAuditTrialObj = this.billOwnerForm.value;

      this.viewInfoData = [
        {
          key: this.labels.name,
          value: this.billOwnerForm.value.name,
        },
        {
          key: this.labels.email,
          value: this.billOwnerForm.value.email,
        },
        {
          key: this.labels.designation,
          value: this.billOwnerForm.value.designation,
        },
        {
          key: this.labels.employeeCode,
          value: this.billOwnerForm.value.employeeCode,
        },
        {
          key: this.labels.mobileNo,
          value: `${this.billOwnerForm.value.mobileNumberCode}${this.billOwnerForm.value.mobileNumber}`,
        },
        // {
        //   key: this.labels.mobileNo,
        //   value:`91${this.billOwnerForm.value.mobileNumber}`
        // },
        {
          key: this.labels.teleNumber,
          value: `${this.billOwnerForm.value.telephoneNumberCode}${this.billOwnerForm.value.telephoneNumber}`,
        },
        // {
        //   key: this.labels.teleNumber,
        //   value:`044${this.billOwnerForm.value.telephoneNumber}`
        // },
        {
          key: 'Official Address',
          value: `${this.billOwnerForm.value.offAddress1} ${this.billOwnerForm.value.offAddress2} ${this.billOwnerForm.value.offAddress3}, ${this.billOwnerForm.value.city}, ${this.billOwnerForm.value.state} - ${this.billOwnerForm.value.pinCode}`,
        },
        {
          key: this.labels.remark,
          value: this.billOwnerForm.value.remark,
        },
      ];

  }

  detectFormChanges() {

    let iRemark = false;

    const formObject = this.billOwnerForm.value;

    const keyArr = Object.keys(formObject);

    const index = keyArr.findIndex((val)=> {
      return val == 'remark'
    })
    
    keyArr.splice(index,1)

    const found = keyArr.find((element) => {
              return formObject[element] != this.detectAuditTrialObj[element]
        
    });


    if(found && formObject['remark'] == this.detectAuditTrialObj['remark']){
      iRemark = true;
    // this.toasterService.showError('Please enter the remark','')
    this.remarkModal = true;
    this.billOwnerForm.patchValue({
      remark: ''
    })
    
    }else {

      this.detectAuditTrialObj = this.billOwnerForm.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  editData() {
    this.propertyFlag = true;
    this.showView = false;
  }

  onSubmit() {

    if (this.billOwnerForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields', '');
      return;
    }
    // console.log('billOwnerForm', this.billOwnerForm.value);

    const formValue = this.billOwnerForm.value;

    const billingDetails = {
      clientId: this.clientId,
     // id: this.billOwnerForm.value.id,
      currentClientId: this.clientId,
      selectedClient: this.clientId,
      name: formValue.name,
      city: formValue.city,
      designation: formValue.designation,
      email: formValue.email,
      employeeCode: formValue.employeeCode,
      mobileNumberCode: formValue.mobileNumberCode,
      mobileNumber: formValue.mobileNumber,
      telephoneNumberCode: formValue.telephoneNumberCode,
      telephoneNumber: formValue.telephoneNumber,
      oaLine1: formValue.offAddress1,
      oaLine2: formValue.offAddress2,
      oaLine3: formValue.offAddress3,
      state: formValue.state,
      pincode: formValue.pinCode,
      remark: formValue.remark,
    };
    console.log('billingDetails', billingDetails);
    this.userInfoService.createBilling(billingDetails).subscribe((response: any) => {
      const error = response.Error;
      const errorMessage = response.ErrorMessage;

      if (error !== '0') {
         return this.toasterService.showError(errorMessage, '');
      }

      const processVariables = response.ProcessVariables;
      const err = processVariables.error || {};

      if (err.code !== '0') {
        return this.toasterService.showError(err.message, '');
      }

      this.showDataSaveModal = true;
      this.newAccountService.setFlagForShowingPages(3);
      this.dataValue = {
        title: 'Billing Admin Details Updated Successfully',
        message:
          'Are you sure you to proceed to SMS Credit Allocation Screen?',
      };

      console.log('Response', response);

      // if (response["Error"] == "0" && response) {
      //   this.isDirty = false;
      //   this.billOwnerForm.reset();
      //   // this.toasterService.showSuccess(response,'')

      //   this.showDataSaveModal = true;

      //   this.dataValue = {
      //     title: "Billing Admin Details Updated Successfully",
      //     message:
      //       "Are you sure you to proceed to SMS Credit Allocation Screen?",
      //   };
      // } else {
      //   this.toasterService.showError(
      //     response["ProcessVariables"]["response"]["value"],
      //     ""
      //   );
      // }
    });

    // this.detectFormChanges();

    
  }

  editDataBill() {
    this.isShowViewPage = false;
  }

  getBillingAdminDetailById(id) {

    this.billingAdminService.getBillingAdminDetailsById({ currentClientId: id})
        .subscribe((res: any) => {
          console.log('billAdminDetails by id', res);
          const processVariables = res.ProcessVariables;
          if (processVariables.selectedClient) {
            this.isShowViewPage = true;
          }
          this.utilService.setBillAdminUserDetails(processVariables);
          this.setBillOwnerFormValues(processVariables);
        });

    // this.userInfoService.getBillingAdminDetailById(id).subscribe((response: any) => {
    //   // console.log('billAdminDetails by id', response);
    //   const processVariables = response.ProcessVariables;
    //   this.utilService.setBillAdminUserDetails(processVariables);
    //   this.setBillOwnerFormValues(processVariables);
    // });
  }


  back() {

    this.utilService.setCurrentUrl('users/techAdmin');
    this.router.navigate(['/users/techAdmin/' + this.clientId]);

    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val)=> {
    //   pno = val || '1';
    // })


    // if(this.user) {
    //   this.router.navigate(['/users/techAdmin/'+pno])
    // }else {
    //   this.router.navigate(['/users/techAdmin'])
    // }
    
  }

  onNext() {

    if (this.insertionFlag < 3) {
      return this.toasterService.showError(`Can't proceed without submitting billing admin details`, '');
    }
     
     // this.utilService.setCurrentUrl('users/smsCredit')

    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val)=> {
    //   pno = val || '1';
    // })


    // if(this.user) {
    this.router.navigate(['/users/smsCredit/' + this.clientId]);

    // }else {
    // this.router.navigate(['/users/smsCredit'])

    // }
  }

  saveYes() {
    this.utilService.setCurrentUrl('users/smsCredit');
    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val) =>{
    //   pno = val || '1';
    // })

    this.router.navigate(['/users/smsCredit/' + this.clientId]);
  }

  saveCancel() {
    this.showDataSaveModal = false;

  // let pno = '';
  // this.utilService.projectNumber$.subscribe((val)=> {
  //   pno = val || '1';
  // })

  // if(this.user){
    // this.router.navigate(['/users/techAdmin/'+this.clientId])
    this.showView = true;
    this.propertyFlag = true;
  // }else{
  //   this.router.navigate(['/users/techAdmin'])
  // }
  }
  
}


 