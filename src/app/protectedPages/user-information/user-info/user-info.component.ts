import { Component, OnInit ,ViewChild,Input, OnChanges} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { UtilService } from '../../../services/util.service';
import { Location } from '@angular/common';

import { DatePipe } from '@angular/common';

import {ToasterService} from '@services/toaster.service';

import { Router,ActivatedRoute } from '@angular/router'
import { UserInfoService } from '@services/user-info.service';
import { MatTableDataSource } from '@angular/material';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { ResetPasswordComponent } from 'src/app/reset-password/reset-password.component';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit,OnChanges {


  // @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion; 
  @Input('userObj') user : any;

  showDataSaveModal:boolean;
     
  hide = true;

  form : FormGroup
  existingUserFlag : boolean = false;
  hideEditButton : boolean = false;
  existingPreviewUserFlag :  boolean;
  buttonName : any = "Save";
  propertyFlag : boolean;
  labels: any = {};
  panelOpenState = false;
  isDirty: boolean;
  newUserFlag : boolean

  dataValue = {}

  viewInfoData : any;
  type:String;
  applicantName:string;

  // deparmentList : any[] = ['','Department of Sainik Welfare',
  //  'Minstry of minority affairs',
  //   'Vishakhapatnam port Trust' ,
  //   'minstry of trible affairs',
  //   'Bureasu of Naviks.Mumbai'];

  departmentListData = [
      {key:0,value:'Department of Sainik Welfare'},
      {key:1,value:'Ministry of Minority Affairs'},
      {key:2,value:'Visakhapatnam Port Trust'},
      {key:13,value:'Ministry of Tribal Affairs'},
      {key:4,value:'Bureau of Naviks Mumbai'}
  ];
  smsServiceReqd=[
    {key:0,value:'Prepaid'},
    {key:1,value:'Post-Paid'}
  ]

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

  statusList= [
    {
      key:0,value: 'Active',
    },
    {
      key:1,value:'Inactive'
    }
  ]
  traiSenderId= [
    {
      key:0,value: 'Yes',
    },
    {
      key:1,value:'No'
    }
  ]

  dataSource = new MatTableDataSource<any>();

  showStatusModal: boolean;
  modalMsg: string;

  accountName: string;
  status:string;

  showUploadModal: boolean;
  showPdfModal: boolean;
  showDeleteModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';
  customersList: any;
  
;
  fileType: string;

  detectAuditTrialObj: any;

  remarkModal: boolean;

  ipValidation: {
    rule?: any;
    msg?: string;
  }[];
 private userPassWord: string;

  constructor(private formBuilder : FormBuilder,private labelsService: LabelsService, private location: Location,private datePipe : DatePipe,private utilService: UtilService,private userInfoService:UserInfoService,private toasterService: ToasterService,private router: Router,private activatedRoute: ActivatedRoute, private beheSer : BehaviourSubjectService) {

    this.form =this.formBuilder.group({
      applicantName : [null],
      departmentName : [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode: [this.countryCodeValues[0].key],
      mobileNo : [null],
      OfficerName:[null],
      OfficerEmail:[null],
      OfficerMobile:[null],
      telPhno : [null],
      teleCode: [this.teleCodeValues[0].key],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      smsServiceReqd: [''],
      creditsSMSQuota: [null,Validators.pattern("^[0-9]{0,12}$")],
      smsTariffMonthWise : [null,Validators.pattern("^[0-9]{0,12}$")],
      availableCredit: [null],
      nameOfTheApplication: [null],
      applicationUrl: [null],
      serverLocation: [null],
      purpOfTheApplication: [null],
      smsGatewayAccess: [null],
      ipServReqd: [null],
      domMonSmsTraffic: [null],
      intMonSmsTraffic: [null],
      appSecurAudClear: [null],
      auditDate:[null],
      traiSenderId: [''],
      userId: [null],
      password: [null],
      piDuration : [null],
      projectNo : [null,Validators.pattern("^[0-9]{0,15}$")],
      creditAdded : [null],
      creditApprover : [null],
      creditDate : [null],
      creditAddedAgainstPi : [null],
      fromDate: [null],
      toDate: [null],
      status:[null],
      remark:[null]    
    });

   }

  ngOnInit() {
    

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })
    this.user = '';
    
    this.activatedRoute.params.subscribe((value)=> {
        this.user = value.id;
    });

    this.ipValidation = this.ipAddressValiationCheck()

    if(!this.user){
      this.newUserFlag = true;
      this.existingPreviewUserFlag = false;

    }

    console.log(this.activatedRoute)
      if(this.user){

        this.utilService.userDetails$.subscribe((val)=> {

          this.accountName = val['userId'] || '';
          this.status = val['status'] || '';
        })

        // this.setFormValues();

        this.existingPreviewUserFlag = true
        this.setFormValues();
        this.buttonName = 'Edit';
        this.propertyFlag = true;

        }
         

        this.form.valueChanges.subscribe(data => {
          console.log('Form changes', data)

         
                // this.detectFormChanges()
            });
            
            this.fetchAllCustomerDetails();
            // this.getCustomerDetailByCustomerId('');

  }

  ipAddressValiationCheck() {
    const ipAddress = [
      {
        rule: (ip) => {
          return !(/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(ip))
        },
        msg: 'Invalid IP Address',
      }
    ];
    return ipAddress;
  }

  editData(value ?: string) {
    this.propertyFlag = false;
    this.existingPreviewUserFlag  = false;
    this.existingUserFlag =  true
    // this.hideEditButton = true;
    this.setFormValues();
  }

  ngOnChanges() {

    let path = this.location.path();

    if(!path.includes('customerDetails/')) {
      this.form.reset()
    }
  }


  setFormValues(){
  
    
    this.form.patchValue({
      applicantName : this.accountName.split('.')[0] || 'Arul',
      departmentName : '1',
      designation : 'Senior Engineer',
      employeeCode : '12008',
      email : 'authregister@nic.com',
      mobileNo : '8754809950',
      telPhno : '2281756',
      teleCode: '0',
      offAddress1 : '23, Bhandup West, Mumbai',
      offAddress2 : 'Bhairavi Voras',
      offAddress3 : 'Lab West',
      city : 'Mumbai',
      state : 'Maharastra',
      pinCode : '641008',
      // smsTariffMonthWise : '1000',
      piDuration : '6',
      projectNo : this.user || '8776',
      creditAdded : '1000',
      creditApprover : 'Vikash',
      fromDate: new Date(),
      toDate: new Date(),
      creditDate : new Date(),
      creditAddedAgainstPi : new Date(),
      countryCode: '0',
      
      OfficerName:'Sri Ram',
      OfficerEmail:'sriram@gmail.com',
      OfficerMobile:'9768674555',
     
      smsServiceReqd: '1',
      // creditsSMSQuota: '4000',
     
      // availableCredit: '3000',
      nameOfTheApplication: 'Sathish',
      applicationUrl: 'www.applicant.com',
      serverLocation: 'Chennai',
      purpOfTheApplication: 'Test application',
      smsGatewayAccess: '175.43.34.344',
      ipServReqd: '192.168.1.101',
      domMonSmsTraffic: '1000',
      intMonSmsTraffic: '1000',
      appSecurAudClear: 'Secure',
      auditDate:new Date(),
      traiSenderId: '0',
      userId: this.accountName || 'Arul.auth',
      password: 'nic@123',
      status: (this.status == 'Active')?'0':'1',
      remark:'Officer Name Changed'
      
      

    })

    this.detectAuditTrialObj = this.form.value;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

  
    
    this.viewInfoData = [
      
      {
        key : this.labels.applicantName,
        value : this.form.value.applicantName
      },
      {
        key  :this.labels.applicantEmail,
        value : this.form.value.email
      },
      {
        key : this.labels.applicantMobile,
        value : this.form.value.mobileNo
      },
      {
        key: this.labels.department,
        value : "Ministry of Home Affairs"
      },
      {
        key  :this.labels.designation,
        value : this.form.value.designation
      },
      {
        key  : this.labels.projectNo,
        value : this.form.value.projectNo
      },
      // {
      //   key  : this.labels.userId,
      //   value  :  this.form.value.userId
      // },
      {
        key : this.labels.password,
        value : this.form.value.password?this.replaceStrar( this.form.value.password) : null
      },
      {
        key : "Officer Name",
        value : this.form.value.OfficerName
      },
      {
        key : "Officer Email",
        value : this.form.value.OfficerEmail
      },
      {
        key  :"Officer Mobile",
        value :this.form.value.OfficerMobile
      },
      {
        key  : "Official Address",
        value  : `${this.form.value.offAddress1} ${this.form.value.offAddress2} ${this.form.value.offAddress3},${this.form.value.city},${this.form.value.state} - ${this.form.value.pinCode}`
      },
      {
        key  : this.labels.teleNumber,
        value : `${this.form.value.teleCode}${this.form.value.telPhno}`
      },
    
      {
        key  : this.labels.smsServiceReqd,
        value : 'Post Paid'
      },
      {
        key  : this.labels.nameOfTheApplication,
        value  : this.form.value.nameOfTheApplication
      },
      {
        key : this.labels.applicationUrl,
        value : this.form.value.applicationUrl
      },
      {
        key  : this.labels.serverLocation,
        value : this.form.value.serverLocation
      },
      {
        key : this.labels.purpOfTheApplication,
        value : this.form.value.purpOfTheApplication
      },
      {
        key  : "SMS GateWay IP",
        value : this.form.value.smsGatewayAccess
      },
      {
        key  : "IP of Staging Server",
        value  : this.form.value.ipServReqd
      },{
        key : "PDMST",
        value : this.form.value.domMonSmsTraffic
      },
      {
        key : "PIMST",
        value  : this.form.value.intMonSmsTraffic
      },
      {
        key : this.labels.applicationsecurAuditCleared,
        value : this.form.value.appSecurAudClear
      },
      {
        key  : "Audit Date Cleared",
        value  :   `${day}/${month}/${year}`
      },
      {
        key : "TRAI Exempted Sender ID",
        value : "No"
      },
      {
        key  : this.labels.creditAdded,
        value  : this.form.value.creditAdded
      },
      {
        key  :this.labels.creditApprover,
        value :  this.form.value.creditApprover
      },
      {
        key  : this.labels.creditDate,
        value :    `${day}/${month}/${year}`
      },
      {
        key :  "Credit Against PI",
        value :    `${day}/${month}/${year}`
      },
      {
        key  : this.labels.uploadDoc,
        value  : 'Invoice.pdf'
      },
      {
        key  : this.labels.status,
        value  : 'Active'
      },
      {
        key  : this.labels.remark,
        value :  this.form.value.remark
      }
    ]

  }

  formDateFunc(date) {
  //  const value =  this.datePipe.transform(date, 'dd-MM-yyyy');
  //   console.log('DTAE ******',value)
  }

  Onsubmit(){

    

    if(this.form.invalid) {
     
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')

      return
    }
    const userInfo = {
      "department":this.form.value.departmentName,
      "App_name":this.form.value.applicantName,
      "App_email":this.form.value.email,
      "App_mobile":this.form.value.mobileNo,
      "FO_name":this.form.value.OfficerName,
      "FO_email":this.form.value.OfficerEmail,
      "countryCode": "",
      "FO_mobile":this.form.value.OfficerMobile,
      "FO_designation":this.form.value.designation,
      "Tele_number": this.form.value.teleCode,
      "Tele_number_OF":this.form.value.telPhno,
      "OA_line1":this.form.value.offAddress1,
      "OA_line2":this.form.value.offAddress2,
      "OA_line3":this.form.value.offAddress3,
      "city":this.form.value.city,
      "state":this.form.value.state,
      "pincode":this.form.value.pinCode,
      "sms_service":this.form.value.smsServiceReqd,
      "credits":this.form.value.creditsSMSQuota,
      "sms_traffic":this.form.value.domMonSmsTraffic,
      "name_applicant":this.form.value.nameOfTheApplication,
      "available_credit":this.form.value.userName,
      "App_url":this.form.value.applicationUrl,
      "server_location":this.form.value.serverLocation,
      "purpose_applicant":this.form.value.purpOfTheApplication,
      "Ip_form":this.form.value.smsGatewayAccess,
      "Ip_staging":this.form.value.ipServReqd,
      "proj_international":this.form.value.intMonSmsTraffic,
      "proj_domestic":this.form.value.domMonSmsTraffic,
      "app_security":this.form.value.appSecurAudClear,
      "audit_date":this.form.value.auditDate,
      "trai_extempted":this.form.value.traiSenderId,
      "proj_number":this.form.value.projectNo,
      "userId":this.form.value.userId,
      "password":this.form.value.password,
      "upload_document":"",
      "remark":this.form.value.remark,
      "creationStatus":"",
    }
    this.userInfoService.createCustomerDetails(userInfo).subscribe((response)=> {

      console.log('Response',response)
 
      if(response['Error'] == '0' && response) {

        this.isDirty=false;
        this.form.reset()
        this.toasterService.showSuccess(response,'')
        console.log('userId........', userInfo.userId);
        this.beheSer.setUserId(userInfo.userId);
        // console.log('userId ]]]]]]',this.beheSer.userId);
      }else {
        this.toasterService.showError(response['ProcessVariables']['response']['value'],'')
      }

    })

    this.propertyFlag = false;
    this.buttonName = 'Update';
     
    // this.form.value['creditDate'] = this.datePipe.transform(this.form.value['creditDate'], 'dd/MM/yyyy')
    // this.form.value['creditAddedAgainstPi'] = this.datePipe.transform(this.form.value['creditAddedAgainstPi'], 'dd/MM/yyyy')
    // this.form.value['auditDate'] = this.datePipe.transform(this.form.value['auditDate'], 'dd/MM/yyyy')
    // console.log(this.fromDate)
    console.log(this.form.value)

    // this.detectFormChanges()

    this.showDataSaveModal = true;

    this.dataValue = {
      title: "Customer Information Saved Sucessfully",
      message : "Are you sure you want to proceed to Technical Admin page?"
    }

    this.toasterService.showSuccess('Data Saved Successfully',"");
    
  }

  fetchAllCustomerDetails() {

    this.userInfoService.fetchAllCustomers().subscribe((response)=> {

      this.customersList = response['ProcessVariables']['customerList'];

      console.log(response)

      this.dataSource = new MatTableDataSource<any>(this.customersList);
    })
  }

  // getCustomerDetailByCustomerId(id:string){

  //   this.userInfoService.getCustomerDetailByCustomerId('id').subscribe((data) => {

  //     console.log(data)

  //   },(error) => {

  //     console.log(error)

  //   })

  // }



  detectFormChanges() {

    let iRemark = false;

    const formObject = this.form.value;

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
    this.form.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }

      this.detectAuditTrialObj = this.form.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  back() {

    this.utilService.setCurrentUrl('dashboard')
    this.router.navigate(['/users/Dashboard'])
  }

  next(){

    console.log(this.user)

    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val || '1';
    })


    if(this.user) {
      this.utilService.setCurrentUrl('users/techAdmin')
      this.router.navigate(['/users/techAdmin/'+pno])
    }else {
      this.utilService.setCurrentUrl('users/techAdmin')
      this.router.navigate(['/users/techAdmin'])
    }
    
    
  }

  statusChange(event){

    this.showStatusModal = true;
    if(event.value == 'Active') {
      this.modalMsg = 'Are you sure you want to activate this user ?'
    }else {
      this.modalMsg = 'Are you sure you want to inactivate this user ?'
    }
  }

  onStatusCancel() {
    this.showStatusModal = false;
    if(this.modalMsg == 'Are you sure you want to activate this user ?') {
      this.form.patchValue({
        status: '1'
      })
    }else {
      this.form.patchValue({
        status: '0'
      })
    }
  }

  onStatusYes() {
    this.showStatusModal = false;
    this.toasterService.showSuccess('Status updated successfully', '')
    if(this.modalMsg == 'Are you sure you want to activate this user ?') {

      this.utilService.setUserDetails({
        userId: this.accountName,
        status: 'Active'
      })
      this.status = 'Active'
    }else{
      this.utilService.setUserDetails({
        userId: this.accountName,
        status: 'InActive'
      })
      this.status = 'InActive'
    }
  }

  viewDoc() {

    this.showUploadModal = true;
  }


  async onFileSelect(event) {

    // alert('Success')
    const files: File = event.target.files[0];


    if(files.type == 'application/pdf') {

      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = ((e)=> {
        
        
        // this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + reader.result.toString())
        // target.files[0]

       // this.selectedPdf = ''
        this.fileSize = `Size - ${this.bytesToSize(files.size)}`
        this.fileName = files.name;  
        console.log('fileSize',this.fileSize)
        
      });

    }else {

      const base64: any = await this.toBase64(event);
      this.imageUrl = base64;
      this.fileSize = this.bytesToSize(files.size);
      this.fileName = files.name;

    }
   
  }


  toBase64(evt) {
    return new Promise((resolve, reject) => {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = (function(theFile) {
      //   return function(e) {
      //     const binaryData = e.target.result;
      //     const base64String = window.btoa(binaryData);
      //     console.log('base64String', base64String);
      //     resolve(base64String)
      //   };
      // })(file);
      var f = evt.target.files[0]; // FileList object
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          var binaryData = e.target.result;
          //Converting Binary Data to base 64
          var base64String = window.btoa(binaryData);
          console.log('base64String', base64String);
          resolve(base64String)
          //showing file converted to base64
          // document.getElementById('base64').value = base64String;
          // alert('File converted to base64 successfuly!\nCheck in Textarea');
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
      // Read in the image file as a data URL.
      // reader.readAsBinaryString(file);
      // reader.onloadend = () => {
      //   let result = '';

      //   if (this.fileType === 'jpeg' || this.fileType === 'png') {
      //     result = reader.result
      //       .toString()
      //       .replace(/^data:image\/[a-z]+;base64,/, '');
      //   } else if (this.fileType === 'pdf') {
      //     result = reader.result
      //       .toString()
      //       .replace(/^data:application\/[a-z]+;base64,/, '');
      //   } else if (this.fileType.includes('xls')) {
      //     result = reader.result.toString().split(',')[1];
      //   } else if (this.fileType === 'docx') {
      //     result = reader.result.toString().split(',')[1];
      //   } else {
      //     result = reader.result.toString();
      //   }
      //   resolve(result);
      // };

      // reader.onerror = (error) => reject(error);
    });
  }

  private bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }


  showPDF() {
    this.showUploadModal = false;
    this.showPdfModal = true;
  }

  download() {

  }

  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'creditAddedAgainstPi') {
  
      this.form.patchValue({
        creditAddedAgainstPi: ''
      })
      this.toasterService.showError('Please click the creditAddedAgainstPi icon to select date','');
    }else if(type == 'auditDate') {
  
      this.form.patchValue({
        auditDate: ''
      })
      this.toasterService.showError('Please click the auditDate icon to select date','');
    }else if(type == 'creditDate') {
  
      this.form.patchValue({
        creditDate: ''
      })
      this.toasterService.showError('Please click the creditDate icon to select date','');
    }
    
  }

  saveCancel() {
    this.showDataSaveModal = false;
  }

  saveYes(){
    this.utilService.setCurrentUrl('users/techAdmin')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) =>{ 
      pno  = val;
    })
    this.router.navigate(['/users/techAdmin/'+pno])
  }
  replaceStrar(getPassWord){
    this.userPassWord = getPassWord;
    return '*'.repeat(this.userPassWord.length)
  }

}



// table Data

// applicantEmail: "test@gmail.com"
// applicantMobile: "8675898756"
// applicantName: "test"
// applicantSecurityAudit: "cleared"
// applicationName: "application"
// applicationPurpose: "purpose"
// appurl: "url"
// auditDate: "2021-01-03T18:30:00.000Z"
// availableCredits: ""
// city: "test"
// credits: ""
// department: "2"
// departmentName: "Department Test"
// foDesignation: "test"
// foEmail: "test@gmail.com"
// foMobile: "8576478567"
// foName: "officername"
// ipForm: "sms"
// ipStaging: "23.23.23.23"
// officeTeleNumber: "9867859"
// officialAddress1: "line1"
// officialAddress2: "line2"
// officialAddress3: "line3"
// passWord: "demo@123"
// pincode: ""
// projectNumber: "12"
// projectedDomestic: "sms"
// projectedInternational: "projected"
// requiredSmsService: "0"
// serverLocation: "location"
// smsTraffic: "sms"
// state: "test"
// traiExempted: "0"
// uploadDocument: ""
// userId: "72"


 

