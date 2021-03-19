import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
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
  selector: 'app-technical-admin-details',
  templateUrl: './technical-admin-details.component.html',
  styleUrls: ['./technical-admin-details.component.scss']
})

export class TechnicalAdminDetailsComponent implements OnInit {
 
      labels:any ;
      
      technicaladminform:FormGroup;

      billOwnerForm  :FormGroup;

      isDirty: boolean;
      propertyFlag : boolean;
      showDataSaveModal  :boolean;
      dataValue  = {};
      showView: boolean = true;
      viewInfoData  = [];

      viewBillAdminInfoData = [];

    // teleCodeValues = []

    dataSource = [];

    user: string;
    name: string;

    accountName: string;
    status: string;

    detectAuditTrialObj: any;

    remarkModal: boolean;

    hideEditButton = false;
    showViewBill = true;
    userId;
    adminsList: any;
    form: any;
    BillDetailsList: any;
    clientId: number;
    clientUserId: string;
    mobileNumberCodeList = [];
    departmentListData = [];
    teleCodeValues = [];

    isShowTechViewPage  = true;
    insertionFlag: number;
 
    isWrite = true;

    constructor(
      private labelsService: LabelsService,
      private toasterService: ToasterService,
      private router: Router,
      private userInfoService: UserInfoService,
      private utilService: UtilService,
      private activatedRoute: ActivatedRoute,
      private behser: BehaviourSubjectService,
      private clientDetailService: ClientDetailsService,
      private billAdminService: BillingAdminService,
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

    this.patchLovValues();

    this.activatedRoute.params.subscribe((value) => {
      // this.showView = false;
      if (!value) {
        return;
      }
      // this.showView = true;
      this.clientId = Number(value.id || 0);
      // this.clientDetailService.setClientId(value.id);
      this.getTechAdminsById(this.clientId);

      // this.getBillingAdminDetailById(this.clientId);
    });

    // this.clientId = Number(this.client.getClientId());
    this.behser.$userId.subscribe( res => {
      console.log("Cleint ID  ",res)
      this.userId = res;
    });

    console.log("userId>>>>>>>>>>>>>", this.userId);
    
   
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });

    
    
    this.technicaladminform=new FormGroup({
      id : new FormControl ([null]),
      name : new FormControl ([null]),
      departmentName : new FormControl (''),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      mobileNumberCode : new FormControl(''),
      mobileNumber :new FormControl (''),
      telephoneNumber : new FormControl (''),
      telephoneNumberCode: new FormControl(''),
      offAddress1 : new FormControl ([null]),
      offAddress2 : new FormControl ([null]),
      offAddress3 : new FormControl ([null]),
      city : new FormControl ([null]),
      state : new FormControl ([null]),
      pinCode : new FormControl (''),
      remark: new FormControl('')
    })


    this.billOwnerForm = new FormGroup({
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      countryCode: new FormControl(null),
      mobileNumber :new FormControl (''),
      telPhno : new FormControl (''),
      teleCode: new FormControl(),
      offAddress1 : new FormControl ([null]),
      offAddress2 : new FormControl ([null]),
      offAddress3 : new FormControl ([null]),
      city : new FormControl ([null]),
      state : new FormControl ([null]),
      pinCode : new FormControl (''),
      remark: new FormControl('')
    })


    this.user = ''
    this.activatedRoute.params.subscribe((value)=> {
      this.user = value.id;
     });

    console.log(this.activatedRoute)
      if(this.user){
       // this.getTechAdminsById(this.user);
      this.utilService.userDetails$.subscribe((val)=> {

        this.accountName = val? val['App_name'] : '';
        this.status = val ? val['status'] : '';
      })
      this.propertyFlag = true;
      // this.getBillingAdminDetailById(this.user);
      }else {
        // this.showView = false;
      }
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

  setBillOwnerFormValues(data?: any){

    if (!data) {
      return;
    }
     
    if(data){
    
    this.billOwnerForm.patchValue({
      name : data.name,
      departmentName : Number(data.department),
      designation : data.designation,
      employeeCode : data.employeeCode,
      email : data.email,
      mobileNumberCode: data.mobileNumberCode,
      mobileNumber : data.mobileNumber,
      telephoneNumber : data.telephoneNumber,
      telephoneNumberCode: data.telephoneNumberCode,
      offAddress1 : data.oaLine1,
      offAddress2 : data.oaLine1,
      offAddress3 : data.oaLine1,
      city : data.city,
      state : data.state,
      pinCode : data.pincode,
      remark: data.remarks,
      userId: data.selectedClient
    })
  }

    this.viewBillAdminInfoData = [
      {
        key: this.labels.name,
        value:this.billOwnerForm.value.name
      },
      {
        key: this.labels.email,
        value:this.billOwnerForm.value.email
      },
      {
        key: this.labels.designation,
        value:this.billOwnerForm.value.designation
      },
      {
        key: this.labels.employeeCode,
        value:this.billOwnerForm.value.employeeCode
      },
      {
        key: this.labels.mobileNo,
        value:data.mobileNumber
      },
      // {
      //   key: this.labels.mobileNo,
      //   value:`91${this.billOwnerForm.value.mobileNumber}`
      // },
      {
        key  : this.labels.teleNumber,
        value : data.telephoneNumber,
      },
      // {
      //   key: this.labels.teleNumber,
      //   value:`044${this.billOwnerForm.value.telephoneNumber}`
      // },
      {
        key: 'Official Address',
        value:`${this.billOwnerForm.value.offAddress1} ${this.billOwnerForm.value.offAddress2} ${this.billOwnerForm.value.offAddress3} ${this.billOwnerForm.value.city} ${this.billOwnerForm.value.state}  ${this.billOwnerForm.value.pinCode}`
      },
      {
        key: this.labels.remark,
        value: data.remark
      }]

  
    }

  editData() {
    this.isShowTechViewPage = false;
    this.propertyFlag = false;
    this.showView = false;
    // this.hideEditButton = true;
  }

  setViewPageDataForTechAdminDetails(data) {
    if (!data) {
      return;
    }

    const department = (this.departmentListData.find( value =>
                          String(value.key) === String(data.department)) || {}).value;



    this.viewInfoData = [
      {
        key : this.labels.name,
        value : data.name
      },
      {
        key  : this.labels.email,
        value  : data.emailAddress
      },
      {
        key  : this.labels.department,
        value :  department
      },
      {
        key  : this.labels.designation,
        value :  data.designation
      },
      {
        key  : this.labels.employeeCode,
        value :  data.employeeCode
      },
      {
        key  : this.labels.mobileNo,
        value  :  data.mobileNumber
      },
      {
        key  : this.labels.teleNumber,
        value :  data.telephoneNumber
      },
      {
        key  : 'Official Address',
        value :  `${data.officeAddressLine1}
        ${data.officeAddressLine2}
        ${data.officeAddressLine3}
        ${data.city} ${data.state}
        ${data.pincode}`
      },
      {
        key  : this.labels.remark,
        value  : data.remark
      },
      {
        key : '',
        value :  ''
      },
      {
        key :  '',
        value :  ''
      },
      {
        key  : '',
        value :  ''
      }
    ];

  }

  setFormValues(data?: any) {

    if(data){

    this.technicaladminform.patchValue({
      id  :  Number(this.insertionFlag<2 ? 0 : data.id),
      name : data.name || '',
      departmentName : data.department || '',
      designation : data.designation || '',
      employeeCode : data.employeeCode || '',
      email : data.emailAddress || '',
      mobileNumberCode : data.mobileCode || '',
      mobileNumber : data.mobileNumber || '',
      telephoneNumber : data.telephoneNumber || '',
      telephoneNumberCode: data.telephoneCode || '',
      offAddress1 : data.officeAddressLine1 || '',
      offAddress2 : data.officeAddressLine2 || '',
      offAddress3 : data.officeAddressLine3 || '',
      city : data.city || '',
      state : data.state || '',
      pinCode : data.pincode || '',
      remark: data.remark || '',
      userId: data.clientUserId
    })

  }
    this.detectAuditTrialObj = this.technicaladminform.value;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();


// const departmentListData = this.departmentListData.filter((val)=> {
//   return val.key == this.technicaladminform.value.departmentName
  
// })

// console.log("departmentList",this.departmentListData,this.technicaladminform.value.departmentName)

    


  }

  onSubmit() {
    if (this.technicaladminform.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return;
    }

    const techAdminDetails = {
      id: this.technicaladminform.value.id,
      name: this.technicaladminform.value.name,
      department: this.technicaladminform.value.departmentName,
      designation: this.technicaladminform.value.designation,
      employeeCode: this.technicaladminform.value.employeeCode,
      emailAddress: this.technicaladminform.value.email,
      mobileCode: this.technicaladminform.value.mobileNumberCode,
      mobileNumber: this.technicaladminform.value.mobileNumber,
      telephoneNumber: this.technicaladminform.value.telephoneNumber,
      telephoneCode: this.technicaladminform.value.telephoneNumberCode,
      officeAddressLine1: this.technicaladminform.value.offAddress1,
      officeAddressLine2: this.technicaladminform.value.offAddress2,
      officeAddressLine3: this.technicaladminform.value.offAddress3,
      city: this.technicaladminform.value.city,
      state: this.technicaladminform.value.state,
      pincode: this.technicaladminform.value.pinCode,
      remark: this.technicaladminform.value.remark,
      clientUserId: this.clientId,
    };
    console.log('techAdminDetails', techAdminDetails);
    this.userInfoService
      .createTechnicalAdmin(techAdminDetails)
      .subscribe((response: any) => {
        const error = response.Error;
        const errorMessage = response.ErrorMessage;

        if (error !== '0') {
          return this.toasterService.showError(errorMessage, '');
        }
        this.isDirty = false;
        this.showDataSaveModal = true;
        this.newAccountService.setFlagForShowingPages(2);
        this.dataValue = {
          title: 'Technical Admin details saved Successfully',
          message: 'Are you sure want to proceed to Billing Admin Detail?',
        };
      });

    console.log('technicaladminform',this.technicaladminform.value);
  }

  onNext() {
    if (this.insertionFlag < 2) {
      return this.toasterService.showError(`Can't proceed without submitting technical admin details`, '');
    }
    this.router.navigate(['/users/billingAdmin/' + this.clientId]);
  }

  fetchAllTechAdmins() {

    this.userInfoService.fetchAllTechAdmins().subscribe((response)=> {

      console.log("techAdminDetails",response)

      this.adminsList = response['ProcessVariables'];

      this.dataSource = this.adminsList;
    })
  }

  getBillingAdminDetailById(id) {
  
    this.billAdminService.getBillingAdminDetailsById({ currentClientId: id})
        .subscribe((res: any) => {
              const processVariables = res.ProcessVariables;
              this.utilService.setBillAdminUserDetails(processVariables);
              this.setBillOwnerFormValues(processVariables);
        });

    // this.userInfoService.getBillingAdminDetailById(id).subscribe((response)=> {

    //   console.log("billAdminDetails by id",response)
    //   this.utilService.setBillAdminUserDetails(response["ProcessVariables"]);

    //   this.setBillOwnerFormValues(response["ProcessVariables"]);
    
    // },(error) => {
    
    //   console.log(error)
    
    // })
  }

  
  


  getTechAdminsById(id){    

    this.userInfoService.getTechAdminDetailById(id).subscribe((response: any) => {

      console.log("get TechAdmins by id",response)
      const processVariables = response.ProcessVariables;
      if (this.insertionFlag<2) {
          this.isShowTechViewPage = false;
          this.propertyFlag = false;
          this.showView = false;
      }else{
        this.showView = true;
      }   
      this.utilService.setTechAdminUserDetails(processVariables);
      this.setFormValues(processVariables);
      this.setViewPageDataForTechAdminDetails(processVariables);
       

    },(error) => {

      console.log(error)

    })

  }

  detectFormChanges() {

    let iRemark = false;

    const formObject = this.technicaladminform.value;

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
    this.technicaladminform.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }
      this.detectAuditTrialObj = this.technicaladminform.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }


  back(value ? :string) {

    this.utilService.setCurrentUrl('users/customerDetails')

    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val || '1';
    })


    if(value  === 'view' || value == 'billAdmin'){
      if(this.user) {
        this.router.navigate(['/users/customerDetails/'+this.clientId])
      }else {
        this.router.navigate(['/users/customerDetails'])
      }
    }else if(value == 'show'){
      if(this.user){
        this.router.navigate(['/users/techAdmin/'+this.clientId])
        this.showView = true
        this.propertyFlag = true
      }else{
        this.router.navigate(['/users/techAdmin'])
      }
    }
    

    
  }

  next() {

    // if(!this.user) {

    //   this.utilService.setCurrentUrl('users/billingAdmin')

    //   let pno = '';
    //   this.utilService.projectNumber$.subscribe((val)=> {
    //     pno = val || '1';
    //   })

    //   if(this.user) {
        this.router.navigate(['/users/billingAdmin/' + this.clientId]);
         //   }else {
    //     this.router.navigate(['/users/billingAdmin'])
    //   }

    // }else {

    //   this.utilService.setCurrentUrl('users/smsCredit')

    //   let pno = '';
    //   this.utilService.projectNumber$.subscribe((val)=> {
    //     pno = val || '1';
    //   })


    //   if(this.user) {
    //   this.router.navigate(['/users/smsCredit/'+pno])

    //   }else {
    //   this.router.navigate(['/users/smsCredit'])

    //  }

    // }
   

       
   
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  saveYes() {
    // this.utilService.setCurrentUrl('users/billingAdmin');
    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val) =>{
    //   pno = val;
    // })
    this.router.navigate(['/users/billingAdmin/' + this.clientId]);
  }

  saveCancel() {
    this.showDataSaveModal = false;
    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val)=> {
    //   pno = val || '1';
    // })

   // if(this.user){
    this.router.navigate(['/users/techAdmin/' + this.clientId]);
    this.showView = true;
    this.propertyFlag = true;
    // }else{
    //   this.router.navigate(['/users/techAdmin'])
    // }

  }

  editDataBill() {

    this.utilService.setCurrentUrl('users/billingAdmin');
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) =>{
      pno = val;
    })
    this.router.navigate(['/users/billingAdmin/'+this.user]);
  }


}




 



 
 
 

 
