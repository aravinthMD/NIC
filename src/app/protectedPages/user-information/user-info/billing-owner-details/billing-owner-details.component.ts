import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UserInfoService } from '@services/user-info.service';
import { UtilService } from '@services/util.service';

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

  viewBillAdminInfoData  : any;


  countryCodeValues = [
    {key:0,value:'+91'},
    {key:1,value:'+60'},
    {key:2,value:'+65'}
  ]

  teleCodeValues = [
    {key:0,value:'+044'},
    {key:1,value:'+040'},
    {key:2,value:'+080'}
  ]

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Ministry of Minority Affairs'},
    {key:2,value:'Visakhapatnam Port Trust'},
    {key:3,value:'Ministry of Tribal Affairs'},
    {key:4,value:'Bureau of Naviks Mumbai'}
    ];

  user: string;

  accountName: string;
  status: string;

  detectAuditTrialObj: any;

  remarkModal: boolean;


  showView: boolean = true;
  userId: string;
 

  constructor(
    private labelsService:LabelsService,
    private toasterService:ToasterService,
    private router:Router,
    private utilService:UtilService,
    private userInfoService:UserInfoService,
    private activatedRoute: ActivatedRoute,
    private behser: BehaviourSubjectService
    ) { }

  ngOnInit() {

    this.behser.$userId.subscribe( res => {
      this.userId = res;
    });

    console.log("userId>>", this.userId);
    
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    this.billOwnerForm=new FormGroup({
      id : new FormControl ([null]),
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      mobileNumberCode: new FormControl(this.countryCodeValues[0].key),
      mobileNumber :new FormControl (''),
      telephoneNumber : new FormControl (''),
      telephoneNumberCode: new FormControl(this.countryCodeValues[0].key),
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

      this.getBillingAdminDetailById(this.user);
      this.utilService.userDetails$.subscribe((val)=> {

        this.accountName = val['App_name'] || '';
        this.status = val['status'] || '';
      })

      this.setBillOwnerFormValues();
      // this.propertyFlag = true;

      }else  {
       this.showView = false
      }
  }

  setBillOwnerFormValues(data?: any) {
 
      if(data){

      this.billOwnerForm.patchValue({
        id  : Number (data.currentBillId),
        name : data.name,
        departmentName : data.department,
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
    this.detectAuditTrialObj = this.billOwnerForm.value;


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
        value:`${this.billOwnerForm.value.mobileNumberCode}${this.billOwnerForm.value.mobileNumber}`
      },
      // {
      //   key: this.labels.mobileNo,
      //   value:`91${this.billOwnerForm.value.mobileNumber}`
      // },
      {
        key  : this.labels.teleNumber,
        value : `${this.billOwnerForm.value.telephoneNumberCode}${this.billOwnerForm.value.telephoneNumber}`
      },
      // {
      //   key: this.labels.teleNumber,
      //   value:`044${this.billOwnerForm.value.telephoneNumber}`
      // },
      {
        key: 'Official Address',
        value:`${this.billOwnerForm.value.offAddress1} ${this.billOwnerForm.value.offAddress2} ${this.billOwnerForm.value.offAddress3}, ${this.billOwnerForm.value.city}, ${this.billOwnerForm.value.state} - ${this.billOwnerForm.value.pinCode}`
      },
      {
        key: this.labels.remark,
        value:this.billOwnerForm.value.remark
      }
    ]

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

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }
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

  onSubmit(){

    if(this.billOwnerForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.billOwnerForm.value)

    const billingDetails = {
      // "selectedClient":"55",
      // "clientId":this.userId,
      "id":this.billOwnerForm.value.id,
      "selectedClient":this.userId,
      "name":this.billOwnerForm.value.name,
      "city":this.billOwnerForm.value.city,
      "designation":this.billOwnerForm.value.designation,
      "email":this.billOwnerForm.value.email,
      "employeeCode":this.billOwnerForm.value.employeeCode,
      "mobileNumberCode":this.billOwnerForm.value.mobileNumberCode,
      "mobileNumber":this.billOwnerForm.value.mobileNumber,
      "telephoneNumberCode":this.billOwnerForm.value.telephoneNumberCode,
      "telephoneNumber":this.billOwnerForm.value.telephoneNumber,
      "oaLine1":this.billOwnerForm.value.offAddress1,
      "oaLine2":this.billOwnerForm.value.offAddress2,
      "oaLine3":this.billOwnerForm.value.offAddress3,
      "state":this.billOwnerForm.value.state,
      "pincode":this.billOwnerForm.value.pinCode,
      "remark":this.billOwnerForm.value.remark, 
    }
     this.userInfoService.createBilling(billingDetails).subscribe((response)=> {
      
            console.log('Response',response)
      
             
            if(response['Error'] == '0' && response) {
      
              this.isDirty=false;
              this.billOwnerForm.reset()
              // this.toasterService.showSuccess(response,'')

              this.showDataSaveModal = true;

    this.dataValue = {
      title : "Billing Admin Details Updated Successfully",
      message : "Are you sure you to proceed to SMS Credit Allocation Screen?"
    }
      
            }else {
              this.toasterService.showError(response['ProcessVariables']['response']['value'],'')
            }
      
          })

    // this.detectFormChanges();

    
  }

  getBillingAdminDetailById(id:string) {

    this.userInfoService.getBillingAdminDetailById(id).subscribe((response)=> {

      console.log("billAdminDetails by id",response)
      this.utilService.setBillAdminUserDetails(response["ProcessVariables"]);

      this.setBillOwnerFormValues(response["ProcessVariables"]);
    
    },(error) => {
    
      console.log(error)
    
    })
  }

  
  back() {

    this.utilService.setCurrentUrl('users/techAdmin')

    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val || '1';
    })


    if(this.user) {
      this.router.navigate(['/users/techAdmin/'+pno])
    }else {
      this.router.navigate(['/users/techAdmin'])
    }
    
  }

  next() {
    this.utilService.setCurrentUrl('users/smsCredit')

    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val || '1';
    })


    if(this.user) {
    this.router.navigate(['/users/smsCredit/'+pno])

    }else {
    this.router.navigate(['/users/smsCredit'])

    }
  }

  saveYes(){
    this.utilService.setCurrentUrl('users/smsCredit')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) =>{
      pno = val || '1';
    })

    this.router.navigate(['/users/smsCredit/'+pno])
  }

  saveCancel() {
    this.showDataSaveModal = false;

  let pno = '';
  this.utilService.projectNumber$.subscribe((val)=> {
    pno = val || '1';
  })

  if(this.user){
    this.router.navigate(['/users/techAdmin/'+pno])
    this.showView = true
    this.propertyFlag = true
  }else{
    this.router.navigate(['/users/techAdmin'])
  }
  }
  
}


 