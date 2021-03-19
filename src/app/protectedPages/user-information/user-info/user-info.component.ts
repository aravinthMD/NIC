import { Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LabelsService } from '../../../services/labels.service';
import { UtilService } from '../../../services/util.service';
import { Location } from '@angular/common';
import {ToasterService} from '@services/toaster.service';

import { Router, ActivatedRoute } from '@angular/router'
import { UserInfoService } from '@services/user-info.service';
import { MatTableDataSource } from '@angular/material';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { ClientDetailsService } from '@services/client-details.service';
import { AdminService } from '@services/admin.service';
import { environment } from 'src/environments/environment';
import { NewAccountService } from '@services/new-account.service';

import { UtilityService } from '@services/utility.service';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';




@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {


  @Input('userObj') user: any;


  docAvailFlag : boolean;

  showDataSaveModal: boolean;
  hide = true;

  form: FormGroup;
  existingUserFlag: boolean = false;
  hideEditButton: boolean = false;
  existingPreviewUserFlag: boolean;
  buttonName: any = 'Save';
  propertyFlag: boolean;
  labels: any = {};
  panelOpenState = false;
  isDirty: boolean;
  newUserFlag: boolean
  dataValue = {};

  viewInfoData: any;
  type: string;
  applicantName: string;

  file : any;

  documentUploadId : string = '';
  previewDocumentId : string = '';

  uploadedData : any = {}

  host  = environment.host;
  newAppiyoDrive  = environment.previewDocappiyoDrive;
  previewUrl : string = ''

  departmentListData = [];
  smsServiceReqd=[]

 

  mobileNumberCodeList = []

  teleCodeValues = []

  statusList = [
    {
      key:'1',value: 'Active',
    },
    {
      key:'0',value:'Inactive'
    }
  ];

  traiSenderId = [];

  dataSource = new MatTableDataSource<any>();

  showStatusModal: boolean;
  modalMsg: string;

  accountName: string;
  status: string;

  showUploadModal: boolean;
  showPdfModal: boolean;
  showDeleteModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';
  customersList: any;
  applicantUrl: any;
  _applicantUrl: any;
  
  
;
  fileType: string;

  detectAuditTrialObj: any;

  remarkModal: boolean;

  ipValidation: {
    rule?: any;
    msg?: string;
  }[];

   initialStatus = '1';

    private userPassWord: string;
    projectNo: string;
    userId: string;
    clientId: string;
    isWrite = true;

  constructor(
    private formBuilder: FormBuilder,
    private labelsService: LabelsService,
    private location: Location,
    private utilService: UtilService,
    private userInfoService: UserInfoService,
    private toasterService: ToasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private beheSer: BehaviourSubjectService,
    private clientDetailService: ClientDetailsService,
    private newAccountService: NewAccountService,
    private utilityService: UtilityService,
    private customDateAdapter: CustomDateAdapter
    ) {

      // this.departmentListData = this.activatedRoute.parent.snapshot.data.listOfValue['ProcessVariables']['departmentList'];
      // this.mobileNumberCodeList = this.activatedRoute.parent.snapshot.data.listOfValue['ProcessVariables']['mobileNumberCodeList'];
      // this.teleCodeValues = this.activatedRoute.parent.snapshot.data.listOfValue['ProcessVariables']['telephoneNumberCodeList'];

    this.form =this.formBuilder.group({
      id: [null],
      applicantName : [null],
      departmentName : [''],
      designation : [null],
      employeeCode : [null],
      email : [null],
      mobileNumberCode: [''],
      mobileNo : [null],
      OfficerName: [null],
      OfficerEmail: [null],
      officerMobileCode: [''],
      OfficerMobile: [null],
      telPhno : [null],
      teleCode: [''],
      offAddress1 : [null],
      offAddress2 : [null],
      offAddress3 : [null],
      city : [null],
      state : [null],
      pinCode : [null],
      smsServiceReqd: [''],
      creditsSMSQuota: [null, Validators.pattern('^[0-9]{0,12}$')],
      smsTariffMonthWise : [null, Validators.pattern('^[0-9]{0,12}$')],
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
      auditDate: [null],
      traiSenderId: [''],
      userId: [null],
      password: [null],
      piDuration : [null],
      projectNo : [null],
      // creditAdded : [null],
      // creditApprover : [null],
      // creditDate : [null],
      // creditAddedAgainstPi : [null],
      fromDate: [null],
      toDate: [null],
      status: new FormControl(),
      remark: [null],
    });
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
    this.user = '';
    this.activatedRoute.params.subscribe((value) => {
        this.user = value.id;
        // this.clientDetailService.setClientId(value.id || '');
        console.log("user Id",this.user);
    });
   }


   patchLovValues() {
    const data =  this.activatedRoute.parent.snapshot.data || {};
    const listOfValue = data.listOfValue || {};
    const processVariables = listOfValue.ProcessVariables;
    this.mobileNumberCodeList = processVariables.mobileNumberCodeList || [];
    this.departmentListData = processVariables.departmentList || [];
    this.teleCodeValues = processVariables.telephoneNumberCodeList || [];
    this.smsServiceReqd = processVariables.smsservice  || [];
    this.traiSenderId = processVariables.Bool || []
   }


  ngOnInit() {
    const customerPage = this.utilityService.getSettingsDataList('CustomerModule');
    this.isWrite = customerPage.isWrite;
    // console.log('data', );


    this.patchLovValues();
    this.ipValidation = this.ipAddressValiationCheck();
    this.activatedRoute.params.subscribe((value)=> {
      this.user = value.id;
      this.clientId = value.id;
      console.log("user Id",this.user);
      if (this.clientId) {
        // this.clientDetailService.setClientId(this.clientId);
        this.getCustomerDetailByCustomerId(this.clientId);
      } else {
        this.newUserFlag = true;
        this.existingPreviewUserFlag = false;
      }

      if(!this.user){
        this.newUserFlag = true;
        this.existingPreviewUserFlag = false;
  
      }

      if(this.user){
           

        this.utilService.userDetails$.subscribe((val: any)=> {
          console.log('val', val);
          if(val){
            this.accountName = val['App_name'] || '';
            this.status = val['status'] || '';
            this.projectNo = val.projectNo || '';
          }
        })

        this.existingPreviewUserFlag = true
       
        this.buttonName = 'Edit';
        this.propertyFlag = true;

        }
         

        this.form.valueChanges.subscribe(data => {
          // console.log('Form changes', data)

         
                // this.detectFormChanges()
            });
  });


   

    

      
            
           // this.fetchAllCustomerDetails();
            // this.getCustomerDetailByCustomerId('62');

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


  setValueForViewPage(data: any) {
    console.log('view page data', data);

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const mobileNumberCode = (this.mobileNumberCodeList.find(code => String(code.key)
                                === String(data.mobileNumberCode)) || {value: ''}).value;
    const mobile = `${mobileNumberCode} ${data.App_mobile}`;
    const department = (this.departmentListData.find(value => String(value.key)
                             ===  String(data.department)) || {value: ''}).value;
   // const department = data.department;
    const officeMobileCode = (this.mobileNumberCodeList.find(value => String(value.key)
                                === String(data.foMobileCode)) || {value: ''}).value;
    const officeMobile = `${officeMobileCode} ${data.FO_mobile}`;
    const officeAddress = `${data.OA_line1}, ${data.OA_line2}, ${data.OA_line3},
    ${data.city}, ${data.state} - ${data.pincode}`;
    const teleNumberCode = (this.teleCodeValues.find(value => String(value.key) 
                              === String(data.telephoneNumberCode)) || {value: ''}).value;
    const teleNumber = `${teleNumberCode} ${data.Tele_number_OF}`;
    const smsService = (this.smsServiceReqd.find(value => String(value.key) 
                            === String(data.sms_service)) || {value: ''}).value;
    const trai = (this.traiSenderId.find(value => String(value.key) 
                      === String(data.trai_extempted)) || {value: ''}).value;

    const status = (this.statusList.find(value => String(value.key)
                      === String(data.status || 0)) || {value : ''}).value;


    this.viewInfoData = [
      {
        key : this.labels.applicantName,
        value : data.App_name
      },
      {
        key: this.labels.applicantEmail,
        value : data.App_email
      },
      {
        key  : this.labels.applicantMobile,
        value : mobile
      },
      {
        key: this.labels.department,
        value : department
      },
      {
        key : this.labels.designation,
        value : data.FO_designation
      },
      {
        key  : this.labels.projectNo,
        value : data.proj_number
      },
      {
        key : this.labels.userId,
        value  : data.userId
      },
      {
        key : this.labels.password,
        value : this.replaceStrar(data.password)
      },
      {
        key : 'Officer Name',
        value : data.FO_name
      },
      {
        key : 'Officer Email',
        value : data.FO_email
      },
      {
        key  : 'Officer Mobile',
        value : officeMobile
      },
      {
        key  : 'Official Address',
        value  : officeAddress
      },
      {
        key  : this.labels.teleNumber,
        value : teleNumber
      },
      {
        key  : this.labels.smsServiceReqd,
        value : smsService
      },
      {
        key  : this.labels.nameOfTheApplication,
        value  : data.name_applicant
      },
      {
        key : this.labels.applicationUrl,
        value : data.App_url
      },
      {
        key  : this.labels.serverLocation,
        value : data.server_location
      },
      {
        key : this.labels.purpOfTheApplication,
        value : data.purpose_applicant
      },
      {
        key  : 'SMS Gateway IP',
        value : data.Ip_form
      },
      {
        key  : 'IP of Staging Server',
        value  : data.Ip_staging
      },
      {
        key : 'PDMST',
        value : data.proj_domestic
      },
      {
        key : 'PIMST',
        value  : data.proj_international
      },
      {
        key : this.labels.applicationsecurAuditCleared,
        value : data.app_security
      },
      {
        key  : 'Audit Date Cleared',
        value  :   data.audit_date
      },
      {
        key : 'TRAI Exempted Sender ID',
        value : trai
      },{
        key : this.labels.status,
        value : status
      },
      {
        key  : this.labels.remark,
        value :  this.form.value.remark
      },
      {
        isButton: true,
        key  : 'View Pdf',
        value :  data.upload_document
      },
      {
        key  : '',
        value :  ''
      },
      {
        key  : '',
        value :  ''
      }
    ]

  }


  setFormValues(data?: any){
  
    if(data){

   
    this.form.patchValue({
      id:Number (data.currentCustomerId),
      applicantName : data.App_name,
      departmentName : data.department,
      designation :  data.FO_designation,
      mobileNumberCode : Number(data.mobileNumberCode),
      // mobileNumberCode : 0,
      email : data.App_email,
      mobileNo : data.App_mobile,
      telPhno : data.Tele_number_OF,
      teleCode: data.telephoneNumberCode,
      offAddress1 : data.OA_line1,
      offAddress2 : data.OA_line2,
      offAddress3 : data.OA_line3,
      city : data.city,
      state : data.state,
      pinCode : data.pincode,
      piDuration : data.proj_international,
      projectNo : data.proj_number,
      creditAdded : data.FO_email,
      // creditApprover : data.FO_email,
      // fromDate: new Date(),
      // toDate: new Date(),
      OfficerName: data.FO_name,
      OfficerEmail: data.FO_email,
      officerMobileCode: data.foMobileCode,
      OfficerMobile: data.FO_mobile,
      smsServiceReqd: data.sms_service,
      nameOfTheApplication: data.name_applicant,
      applicationUrl: data.App_url,
      serverLocation: data.server_location,
      purpOfTheApplication: data.purpose_applicant,
      smsGatewayAccess: data.Ip_form,
      ipServReqd: data.Ip_staging,
      domMonSmsTraffic: data.sms_traffic,
      intMonSmsTraffic: data.proj_international,
      appSecurAudClear: data.app_security,
      auditDate : this.customDateAdapter.parseToDateObj(data.audit_date),
      // creditDate : data.creditDate,
      // creditAddedAgainstPi : data.creditAddedAgainstPI,
      traiSenderId: data.trai_extempted,
      userId: data.userId,
      password: data.password,
      status: String(data.status || 0),
      remark:data.remark,
    })

    
  }
    this.detectAuditTrialObj = this.form.value;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

  
    
    

  }

  formDateFunc(date) {
  //  const value =  this.datePipe.transform(date, 'dd-MM-yyyy');
  //   console.log('DTAE ******',value)
  }

  // SaveOrUpdate(){
  //   if( this.form.id == ''){

  //     this.Onsubmit();

  //     } else if (this.form.id !==''){

  //     }
  // }


  Onsubmit() {
    if (this.form.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return;
    }

    const auditDate = this.customDateAdapter.transform(this.form.value.auditDate, 'dd/MM/yyyy');

    const userInfo: any = {
      currentCustomerId: (this.form.value.id),
      App_name: this.form.value.applicantName,
      department: this.form.value.departmentName,
      FO_designation: this.form.value.designation,
      mobileNumberCode: this.form.value.mobileNumberCode,
      App_email: this.form.value.email,
      App_mobile: this.form.value.mobileNo,
      telephoneNumberCode: this.form.value.teleCode,
      Tele_number_OF: this.form.value.telPhno,
      OA_line1: this.form.value.offAddress1,
      OA_line2: this.form.value.offAddress2,
      OA_line3: this.form.value.offAddress3,
      city: this.form.value.city,
      state: this.form.value.state,
      pincode: this.form.value.pinCode,
      FO_mobilecode: this.form.value.officerMobileCode,
      FO_mobile: this.form.value.OfficerMobile,
      FO_name: this.form.value.OfficerName,
      FO_email: this.form.value.OfficerEmail,
      proj_international: this.form.value.intMonSmsTraffic,
      proj_number: this.form.value.projectNo, 
      sms_service: this.form.value.smsServiceReqd,
      name_applicant: this.form.value.nameOfTheApplication,
      App_url: this.form.value.applicationUrl,
      server_location: this.form.value.serverLocation,
      purpose_applicant: this.form.value.purpOfTheApplication,
      Ip_form: this.form.value.smsGatewayAccess,
      Ip_staging: this.form.value.ipServReqd,
      sms_traffic: this.form.value.domMonSmsTraffic,
      proj_domestic: this.form.value.domMonSmsTraffic,
      app_security: this.form.value.appSecurAudClear,
      audit_date: auditDate,
      // creditDate: this.form.value.creditDate,
      // creditAddedAgainstPI: this.form.value.creditAddedAgainstPi,
      trai_extempted: this.form.value.traiSenderId,
      userId: this.form.value.userId,
      password: this.form.value.password,
      // status: this.form.value.status,
      remark: this.form.value.remark,
      credits: this.form.value.creditsSMSQuota,
      // available_credit: this.form.value.userName,
       upload_document: this.documentUploadId
    };

    const status = String(this.form.value.status);
    const customerId = this.form.value.id;
    if (status !== this.initialStatus && customerId) {
        userInfo.status = Number(status);         
        // if(environment.production){
        //   userInfo.clientActivation = `${origin}/nic/#/external/active-user/${customerId}`
        // }else{
        //   userInfo.clientActivation = `${origin}/#/external/active-user/${customerId}`
          
        // } 
        // userInfo.clientActivation = `${origin}/nic/assets/html/account.html?id=${customerId}`;
        const origin = location.origin;
        const baseOrigin = window.location.pathname.split('/')[1];
        console.log('origin', origin);      
        if(environment.production){
          userInfo.clientActivation = `${origin}/${baseOrigin}/#/external/active-user/${customerId}`
        }else{
          userInfo.clientActivation = `${origin}/#/external/active-user/${customerId}`
        } 
    }


    console.log('User Creation Form:', userInfo);


    this.userInfoService.createCustomerDetails(userInfo).subscribe((response: any) => {

      const error = response.Error;
      const errorMessage = response.ErrorMessage;
      if (error !== '0') {
        return this.toasterService.showError(errorMessage, '');
      }
      const processVariables = response.ProcessVariables;
      const errorDes = processVariables.error;
      if (errorDes.code !== '0') {
        return this.toasterService.showError(errorDes.message, '');
      }
      this.showDataSaveModal = true;
      this.utilService.setUserDetails(processVariables);
      this.beheSer.setUserId(processVariables.generatedCustomerId);
      if (processVariables.generatedCustomerId) {
        this.clientId = processVariables.generatedCustomerId;
      } else if (processVariables.currentCustomerId) {
        this.clientId = processVariables.currentCustomerId;
      }
      this.form.get('status').setValue(this.initialStatus);
      this.form.get('id').setValue(this.clientId);
     //  this.clientDetailService.setClientId(this.clientId);
      this.newAccountService.setFlagForShowingPages(1);
      this.utilService.setCustomerDetails(processVariables);
      this.dataValue = {
        title: 'Customer Information Saved Sucessfully',
        message : 'Are you sure you want to proceed to Technical Admin page?'
      };
      this.isDirty = false;
    });

    this.propertyFlag = false;
    this.buttonName = 'Update';
    console.log(this.form.value);
  }

  update(){

  }

  // fetchAllCustomerDetails() {

  //   this.userInfoService.fetchAllCustomers().subscribe((response)=> {

  //     this.customersList = response['ProcessVariables']['customerList'];

  //     console.log(response)

  //     this.dataSource = new MatTableDataSource<any>(this.customersList);
  //   })
  // }

  getCustomerDetailByCustomerId(id:string){    

    const processVariables = this.utilService.getCustomerDetails();

    console.log('processVariables', processVariables)

    if (!processVariables) {
      return;
    }

    // this.userInfoService.getCustomerDetailByCustomerId(id).subscribe((response: any) => {

    //   console.log("get customer by id",response)
    //   const res = response["ProcessVariables"] || '';
    //   this.userId = res.userId || '';
    //   const processVariables = response.ProcessVariables;
    this.userId = processVariables.userId;
    this.utilService.setUserDetails(processVariables);
    this.setFormValues(processVariables);
    this.setValueForViewPage(processVariables);
    const docsId = processVariables.upload_document || '';
    this.docAvailFlag = !!docsId;
    this.previewDocumentId = docsId;
    this.documentUploadId = docsId;
    this.initialStatus = String(processVariables.status || 1);
    this.clientDetailService.setClientStatus(this.initialStatus === '1');
      // if(response['ProcessVariables']['upload_document']){
      //     this.previewDocumentId = response['ProcessVariables']['upload_document'];
      //     this.docAvailFlag = true;
      // }

    // }, (error) => {

    //   console.log(error)

    // })

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
    this.router.navigate(['home'])
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

  statusChange(event) {

    // this.showStatusModal = true;
    // if(event.value == 'Active') {
    //   this.modalMsg = 'Are you sure you want to activate this user ?'
    // }else {
    //   this.modalMsg = 'Are you sure you want to inactivate this user ?'
    // }
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
    this.toasterService.showSuccess('Status Updated successfully', '')
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

  // viewDoc() {

  //   this.showUploadModal = true;
  // }




  async onFileSelect(event) {

    // alert('Success')
    const files: File = event.target.files[0];
    const size = files.size / 1024;
    console.log('size', size);

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
    // this.showUploadModal = false;
    this.showPdfModal = true;
    this.previewUrl = `${this.host}${this.newAppiyoDrive}${this.previewDocumentId}`;
  }

  download() {

  }

  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'creditAddedAgainstPi') {
  
      this.form.patchValue({
        creditAddedAgainstPi: ''
      })
      this.toasterService.showError('Please click the credit added against PI icon to select date','');
    }else if(type == 'auditDate') {
  
      this.form.patchValue({
        auditDate: ''
      })
      this.toasterService.showError('Please click the audit date icon to select date','');
    }else if(type == 'creditDate') {
  
      this.form.patchValue({
        creditDate: ''
      })
      this.toasterService.showError('Please click the credit date icon to select date','');
    }
    
  }

  onNext() {

    if (!this.clientId) {
       return this.toasterService.showError(`Can't proceed without submitting customer details`, '');
    }
    this.router.navigate(['/users/techAdmin/' + this.clientId]);

  }

  saveCancel() {
    // this.form.disable();
    this.showDataSaveModal = false;
    // this.propertyFlag = true;
    this.existingPreviewUserFlag  = true;
    this.existingUserFlag =  false;
  }

  saveYes() {
    // this.utilService.setCurrentUrl('users/techAdmin')
    // let pno = '';
    // this.utilService.projectNumber$.subscribe((val) =>{ 
    //   pno  = val;
    // })
    this.router.navigate(['/users/techAdmin/' + this.clientId]);
  }



  replaceStrar(getPassWord){
    this.userPassWord = getPassWord;
    return '*'.repeat(this.userPassWord.length)
  }


 async uploadFile(files  :FileList){
      this.file = files.item(0);
      let ext =  this.file.name.split('.').pop();
      const size = files.item(0).size / 1024;
      console.log('size', size);
      if(ext !== 'pdf')
      return this.toasterService.showError('Only Pdf is Allowed','');

      if (this.file) {
        const userId: string = this.clientDetailService.getClientId();
        const modifiedFile = Object.defineProperty(this.file, "name", {
          writable: true,
          value: this.file["name"],
        });
        modifiedFile["name"] =
          userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];
        try {
          this.uploadedData = await this.utilService.uploadToAppiyoDrive(
            this.file
          );

          if (this.uploadedData["uploadStatus"]) {
            this.documentUploadId = this.uploadedData["documentUploadId"];
            this.toasterService.showSuccess("File Upload Success", "");
          } else {
            this.toasterService.showError("File Upload Failed", "");
          }
        } catch (e) {
          console.log("file error", e);
          const error = e.error;
          if (error && error.ok === false) {
            return this.toasterService.showError(error.message, "");
          }
        }
      }
  }

}


 

 

