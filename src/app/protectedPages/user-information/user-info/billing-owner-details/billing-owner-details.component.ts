import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';

@Component({
  selector: 'app-billing-owner-details',
  templateUrl: './billing-owner-details.component.html',
  styleUrls: ['./billing-owner-details.component.scss']
})
export class BillingOwnerDetailsComponent implements OnInit {

  labels:any;
  billOwnerForm:FormGroup;
  isDirty: boolean;
  propertyFlag : boolean;
  showDataSaveModal : boolean;
  dataValue  = {}

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
    this.billOwnerForm=new FormGroup({
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

      this.utilService.userDetails$.subscribe((val)=> {

        this.accountName = val['userId'] || '';
        this.status = val['status'] || '';
      })

      this.setFormValues();
      this.propertyFlag = true;

      }



  }

  setFormValues() {

    this.billOwnerForm.patchValue({
      name : 'Sasi',
      departmentName : '1',
      designation : 'Chennai',
      employeeCode : '54534',
      email : 'test@gmail.com',
      countryCode: '0',
      mobileNo : '9754544445',
      telPhno : '2273422',
      teleCode:'0',
      offAddress1 : 'add1',
      offAddress2 : 'add2',
      offAddress3 : 'add3',
      city : 'Chennai',
      state : 'Tamilnadu',
      pinCode : '600025',
      remark: 'Pincode Changed'

    })

    this.detectAuditTrialObj = this.billOwnerForm.value;
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
    this.propertyFlag = false;
  }

  onSubmit(){

    this.showDataSaveModal = true;

    this.dataValue = {
      title : "Billing Admin Details Updated Successfully",
      message : "Are you sure you to proceed to SMS Credit Allocation Screen?"
    }

    if(this.billOwnerForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.billOwnerForm.value)

    this.detectFormChanges();
  }
  back() {

    this.utilService.setCurrentUrl('users/techAdmin')

    if(this.user) {
      this.router.navigate(['/users/techAdmin/1'])
    }else {
      this.router.navigate(['/users/techAdmin'])
    }
    
  }

  next() {
    this.utilService.setCurrentUrl('users/smsCredit')

    if(this.user) {
    this.router.navigate(['/users/smsCredit/1'])

    }else {
    this.router.navigate(['/users/smsCredit'])

    }
  }

  saveYes(){
    this.utilService.setCurrentUrl('users/smsCredit')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) =>{
      pno = val
    })

    this.router.navigate(['/users/smsCredit/'+pno])
  }

  saveCancel() {
    this.showDataSaveModal = false;
  }

}
