import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UserInfoService } from '@services/user-info.service';
import { UtilService } from '@services/util.service';

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

  viewInfoData :  any;

  viewBillAdminInfoData = []

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Ministry of Minority Affairs'},
    {key:2,value:'Visakhapatnam Port Trust'},
    {key:3,value:'Ministry of Tribal Affairs'},
    {key:4,value:'Bureau of Naviks Mumbai'}
];

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

dataSource = new MatTableDataSource<any>();

user: string;
name: string;

accountName: string;
status: string;

detectAuditTrialObj: any;

remarkModal: boolean;

hideEditButton: boolean = false;
showViewBill:boolean = true;
userId;
  adminsList: any;
  form: any;
  BillDetailsList: any;
  clientId: string;
 


  constructor(
    private labelsService:LabelsService,
    private toasterService:ToasterService,
    private router:Router,
    private userInfoService:UserInfoService,
    private utilService:UtilService,
    private activatedRoute: ActivatedRoute,
    private behser: BehaviourSubjectService
    ) { }

  ngOnInit() {
    this.behser.$userId.subscribe( res => {
      console.log("Cleint ID  ",res)
      this.userId = res;
    });

    console.log("userId>>>>>>>>>>>>>", this.userId);
    
   
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });

    
    
    this.technicaladminform=new FormGroup({
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      countryCode : new FormControl(this.countryCodeValues[0].key),
      mobileNo :new FormControl (''),
      telPhno : new FormControl (''),
      teleCode: new FormControl(this.teleCodeValues[0].key),
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
      mobileNo :new FormControl (''),
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
      
      this.getTechAdminsById(this.clientId);
      this.utilService.userDetails$.subscribe((val)=> {

        this.accountName = val['userId'] || '';
        this.status = val['status'] || '';
      })


       this.setFormValues();
      this.setBillOwnerFormValues();
      this.propertyFlag = true;

      }else {
        this.showView = false;
      }

      this.fetchAllTechAdmins();

       this.getTechAdminsById('22');

       this.getBillingAdminDetailById('23');
  }

  setBillOwnerFormValues(data?: any){
     
    if(data){
    
    this.billOwnerForm.patchValue({
      name : data.name,
      departmentName : data.department,
      designation : data.designation,
      employeeCode : data.employeeCode,
      email : data.email,
      countryCode: data.mobileCode,
      mobileNo : data.mobileNumber,
      telPhno : data.telephoneNumber,
      teleCode:data.telephoneCode,
      offAddress1 : data.officeAddressLine1,
      offAddress2 : data.officeAddressLine2,
      offAddress3 : data.officeAddressLine3,
      city : data.city,
      state : data.state,
      pinCode : data.pincode,
      remark: data.remarks,
      userId: data.clientId
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
        value:`91${this.billOwnerForm.value.mobileNo}`
      },
      {
        key: this.labels.teleNumber,
        value:`044${this.billOwnerForm.value.telPhno}`
      },
      {
        key: 'Official Address',
        value:`${this.billOwnerForm.value.offAddress1} ${this.billOwnerForm.value.offAddress2} ${this.billOwnerForm.value.offAddress3}, ${this.billOwnerForm.value.city}, ${this.billOwnerForm.value.state} - ${this.billOwnerForm.value.pinCode}`
      },
      {
        key: this.labels.remark,
        value:this.billOwnerForm.value.remark
      }]

  
    }

  editData() {
    this.propertyFlag = false;
    this.showView = false;
    // this.hideEditButton = true;
  }

  setFormValues(data?: any) {

    if(data){

    this.technicaladminform.patchValue({
      name : data.name,
      departmentName : data.department,
      designation :data.designation,
      employeeCode : data.employeeCode,
      email : data.email,
      countryCode : data.mobileNumberCode,
      mobileNo : data.mobileNumber,
      telPhno : data.telephoneNumber,
      teleCode: data.telephoneNumberCode,
      offAddress1 : data.officialAddress1,
      offAddress2 : data.officialAddress2,
      offAddress3 : data.officialAddress3,
      city : data.city,
      state : data.state,
      pinCode : data.pinCode,
      remark: data.remark,
      userId: data.clientId
    })

  }
    this.detectAuditTrialObj = this.technicaladminform.value;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();


const departmentListData = this.departmentListData.filter((val)=> {
  return val.key == this.technicaladminform.value.departmentName
  
})
console.log("departmentList",this.departmentListData,this.technicaladminform.value.departmentName)

    this.viewInfoData = [
      {
        key : this.labels.name,
        value : this.technicaladminform.value.name
      },
      {
        key  : this.labels.email,
        value  : this.technicaladminform.value.email
      },
      {
        key  : this.labels.department,
        value :  departmentListData[0]?departmentListData[0].value:null
      },
      {
        key  : this.labels.designation,
        value :  this.technicaladminform.value.designation
      },
      {
        key  : this.labels.employeeCode,
        value :  this.technicaladminform.value.employeeCode
      },
      {
        key  : this.labels.mobileNo,
        value  :  `91${this.technicaladminform.value.mobileNo}`
      },
      {
        key  : this.labels.teleNumber,
        value :  `044${this.technicaladminform.value.telPhno}`
      },
      {
        key  : "Official Address",
        value :  `${this.technicaladminform.value.offAddress1} ${this.technicaladminform.value.offAddress2} ${this.technicaladminform.value.offAddress3},${this.technicaladminform.value.city},${this.technicaladminform.value.state} - ${this.technicaladminform.value.pinCode}`
      },
      {
        key  : this.labels.remark,
        value  : this.technicaladminform.value.remark
      },
      {
        key : "",
        value :  ""
      },
      {
        key :  "",
        value :  ""
      },
      {
        key  : "",
        value :  ""
      }
    ]


  }

  onSubmit(){
    if(this.technicaladminform.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }

    const techAdminDetails = {

      "name": this.technicaladminform.value.name,
      "department":this.technicaladminform.value.departmentName,
      "designation":this.technicaladminform.value.designation,
      "employeeCode":this.technicaladminform.value.employeeCode,
      "emailAddress":this.technicaladminform.value.email,
      "mobileCode":this.technicaladminform.value.countryCode,
      "mobileNumber":this.technicaladminform.value.mobileNo,
      "telephoneNumber":this.technicaladminform.value.telPhno,
      "telephoneCode":this.technicaladminform.value.teleCode,
      "officeAddressLine1":this.technicaladminform.value.offAddress1,
      "officeAddressLine2":this.technicaladminform.value.offAddress2,
      "officeAddressLine3":this.technicaladminform.value.offAddress3,
      "city":this.technicaladminform.value.city,
      "state":this.technicaladminform.value.state,
      "pincode":this.technicaladminform.value.pinCode,
      "remark":this.technicaladminform.value.remark, 
      "clientUserId":this.userId,
      
    }
      this.userInfoService.createTechnicalAdmin(techAdminDetails).subscribe((response)=> {
  
        console.log('Response',response)
  
         
        if(response['Error'] == '0' && response) {
       
          this.isDirty=false;

          this.technicaladminform.reset()
          // this.toasterService.showSuccess(response,'')
          this.showDataSaveModal = true;   

          this.dataValue = {
            title : "Technical Admin details saved Sucessfully",
            message : "Are you sure want to proceed to Billing Admin Detail?"
          }
                
        }else {
          this.toasterService.showError(response['ErrorMessage'],'')
        }
  
      })

    

    console.log('billOwnerForm',this.technicaladminform.value)

    // this.detectFormChanges()
  
  
  }

  fetchAllTechAdmins() {

    this.userInfoService.fetchAllTechAdmins().subscribe((response)=> {

      console.log("techAdminDetails",response)

      this.adminsList = response['ProcessVariables'];

      this.dataSource = new MatTableDataSource<any>(this.adminsList);
    })
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

  
  


  getTechAdminsById(id:string){    

    this.userInfoService.getTechAdminDetailById(id).subscribe((response) => {

      console.log("get TechAdmins by id",response)
      this.utilService.setTechAdminUserDetails(response["ProcessVariables"]);
      this.setFormValues(response["ProcessVariables"]);
       

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
        this.router.navigate(['/users/customerDetails/'+pno])
      }else {
        this.router.navigate(['/users/customerDetails'])
      }
    }else if(value == 'show'){
      if(this.user){
        this.router.navigate(['/users/techAdmin/'+pno])
        this.showView = true
        this.propertyFlag = true
      }else{
        this.router.navigate(['/users/techAdmin'])
      }
    }
    

    
  }

  next() {

    if(!this.user) {

      this.utilService.setCurrentUrl('users/billingAdmin')

      let pno = '';
      this.utilService.projectNumber$.subscribe((val)=> {
        pno = val || '1';
      })
  
  
      if(this.user) {
        this.router.navigate(['/users/billingAdmin/'+pno])
      }else {
        this.router.navigate(['/users/billingAdmin'])
      }

    }else {

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
   

       
   
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  saveYes(){
    this.utilService.setCurrentUrl('users/billingAdmin');
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) =>{
      pno = val;
    })
    this.router.navigate(['/users/billingAdmin/'+pno]);
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

  editDataBill() {

    this.utilService.setCurrentUrl('users/billingAdmin');
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) =>{
      pno = val;
    })
    this.router.navigate(['/users/billingAdmin/'+pno]);
  }


}



 
 
 

 
