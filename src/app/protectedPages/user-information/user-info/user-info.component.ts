import { Component, OnInit ,ViewChild,Input, OnChanges} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { UtilService } from '../../../services/util.service';
import { Location } from '@angular/common';

import { DatePipe } from '@angular/common';

import {ToasterService} from '@services/toaster.service';

import { Router,ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit,OnChanges {


  // @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion; 
  @Input('userObj') user : any;

  form : FormGroup
  existingUserFlag : boolean = false;
  buttonName : any = "Save";
  propertyFlag : boolean;
  labels: any = {};
  panelOpenState = false;
  isDirty: boolean;

  // deparmentList : any[] = ['','Department of Sainik Welfare',
  //  'Minstry of minority affairs',
  //   'Vishakhapatnam port Trust' ,
  //   'minstry of trible affairs',
  //   'Bureasu of Naviks.Mumbai'];

  departmentListData = [
      {key:0,value:'Department of Sainik Welfare'},
      {key:1,value:'Ministry of Minority Affairs'},
      {key:2,value:'Visakhapatnam Port Trust'},
      {key:3,value:'Ministry of Tribal Affairs'},
      {key:4,value:'Bureau of Naviks.Mumbai'}
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

  showStatusModal: boolean;
  modalMsg: string;

  accountName: string;
  status:string;

  showUploadModal: boolean;
  showPdfModal: boolean;
  showDeleteModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;

  detectAuditTrialObj: any;

  remarkModal: boolean;

  ipValidation: {
    rule?: any;
    msg?: string;
  }[];


  constructor(private formBuilder : FormBuilder,private labelsService: LabelsService, private location: Location,private datePipe : DatePipe,private utilService: UtilService,private toasterService: ToasterService,private router: Router,private activatedRoute: ActivatedRoute) {

    this.form =this.formBuilder.group({
      applicantName : [null],
      departmentName : [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      countryCode: [null],
      mobileNo : [null],
      OfficerName:[null],
      OfficerEmail:[null],
      OfficerMobile:[null],
      telPhno : [null],
      teleCode: [null],
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
      userId: [null,Validators.pattern("^[0-9]{0,50}$")],
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


    console.log(this.activatedRoute)
      if(this.user){

        this.utilService.userDetails$.subscribe((val)=> {

          this.accountName = val['userId'] || '';
          this.status = val['status'] || '';
        })

        this.setFormValues();
        this.buttonName = 'Edit';
        this.propertyFlag = true;

        }
         

        this.form.valueChanges.subscribe(data => {
          console.log('Form changes', data)

         
                // this.detectFormChanges()
            });

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

  editData() {
    this.propertyFlag = false;
  }

  ngOnChanges() {

    let path = this.location.path();

    if(!path.includes('customerDetails/')) {
      this.form.reset()
    }
  }


  setFormValues(){
    
    this.existingUserFlag = true;
    
    this.form.patchValue({
      applicantName : this.accountName || 'Arul.auth',
      departmentName : '1',
      designation : 'Senior Engineer',
      employeeCode : '12008',
      email : 'authregister@nic.com',
      mobileNo : '8754809950',
      telPhno : '9801756',
      teleCode: '0',
      offAddress1 : '235,bhandup,Mumbai',
      offAddress2 : '235,bhandup Mumbai',
      offAddress3 : '235,bhandup,Mumbai',
      city : 'Mumbai',
      state : 'Maharastra',
      pinCode : '641008',
      smsTariffMonthWise : '1000',
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
      creditsSMSQuota: '4000',
     
      availableCredit: '3000',
      nameOfTheApplication: 'Sathish',
      applicationUrl: 'www.applicant.com',
      serverLocation: 'Chennai',
      purpOfTheApplication: 'Test application',
      smsGatewayAccess: '175.43.34.344',
      ipServReqd: '192.168.1.101',
      domMonSmsTraffic: '5000',
      intMonSmsTraffic: '6000',
      appSecurAudClear: 'Secure',
      auditDate:new Date(),
      traiSenderId: '0',
      userId: '1001',
      password: 'nic@123',
      status: (this.status == 'Active')?'0':'1',
      remark:'Officer Name Changed'
      
      

    })

    this.detectAuditTrialObj = this.form.value;
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
    this.propertyFlag = false;
    this.buttonName = 'Update';

    // this.form.value['creditDate'] = this.datePipe.transform(this.form.value['creditDate'], 'dd/MM/yyyy')
    // this.form.value['creditAddedAgainstPi'] = this.datePipe.transform(this.form.value['creditAddedAgainstPi'], 'dd/MM/yyyy')
    // this.form.value['auditDate'] = this.datePipe.transform(this.form.value['auditDate'], 'dd/MM/yyyy')
    // console.log(this.fromDate)
    console.log(this.form.value)

    this.detectFormChanges()

    
  }



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

    if(this.user) {
      this.utilService.setCurrentUrl('users/techAdmin')
      this.router.navigate(['/users/techAdmin/1'])
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

}
