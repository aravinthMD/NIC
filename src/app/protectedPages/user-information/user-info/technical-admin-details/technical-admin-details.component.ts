import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';

@Component({
  selector: 'app-technical-admin-details',
  templateUrl: './technical-admin-details.component.html',
  styleUrls: ['./technical-admin-details.component.scss']
})
export class TechnicalAdminDetailsComponent implements OnInit {

 
  labels:any ;
  technicaladminform:FormGroup;
  isDirty: boolean;
  propertyFlag : boolean;

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

user: string;

accountName: string;
status: string;

detectAuditTrialObj: any;

remarkModal: boolean;


  constructor(
    private labelsService:LabelsService,
    private toasterService:ToasterService,
    private router:Router,
    private utilService:UtilService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });

    
    this.technicaladminform=new FormGroup({
      name : new FormControl ([null]),
      departmentName : new FormControl ([null]),
      designation :new FormControl ([null]),
      employeeCode : new FormControl ([null]),
      email : new FormControl (''),
      countryCode : new FormControl(null),
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

      this.utilService.userDetails$.subscribe((val)=> {

        this.accountName = val['userId'] || '';
        this.status = val['status'] || '';
      })


      this.setFormValues();
      this.propertyFlag = true;

      }


  }

  editData() {
    this.propertyFlag = false;
  }

  setFormValues() {

    this.technicaladminform.patchValue({
      name : 'Prakash',
      departmentName : '1',
      designation :'Officer',
      employeeCode : '23232',
      email : 'technical@nic.in',
      countryCode : '0',
      mobileNo :'9867655433',
      telPhno : '9776644',
      teleCode:'0',
      offAddress1 : 'address1',
      offAddress2 : 'address2',
      offAddress3 : 'address3',
      city : 'Chennai',
      state : 'Tamilnadu',
      pinCode : '600028',
      remark: 'Address changed'
    })

    this.detectAuditTrialObj = this.technicaladminform.value;

  }
  onSubmit(){
    if(this.technicaladminform.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.technicaladminform.value)

    this.detectFormChanges()
  
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


  back() {

    this.utilService.setCurrentUrl('users/customerDetails')
    if(this.user) {
      this.router.navigate(['/users/customerDetails/1'])
    }else {
      this.router.navigate(['/users/customerDetails'])
    }
  }

  next() {

    
    this.utilService.setCurrentUrl('users/billingAdmin')

    if(this.user) {
      this.router.navigate(['/users/billingAdmin/1'])
    }else {
      this.router.navigate(['/users/billingAdmin'])
    }
   
  }

  remarkOkay() {
    this.remarkModal = false;
  }
}
