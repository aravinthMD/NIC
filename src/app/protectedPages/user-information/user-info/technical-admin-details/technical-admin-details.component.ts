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
    {key:1,value:'Minstry of minority affairs'},
    {key:2,value:'Vishakhapatnam port Trust'},
    {key:3,value:'Ministry of trible affairs'},
    {key:4,value:'Bureasu of Naviks.Mumbai'}
];

countryCodeValues = [
  {key:0,value:'+91'},
  {key:1,value:'+60'},
  {key:2,value:'+65'}
]

user: string;

accountName: string;
status: string;


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
      offAddress1 : new FormControl ([null]),
      offAddress2 : new FormControl ([null]),
      offAddress3 : new FormControl ([null]),
      city : new FormControl ([null]),
      state : new FormControl ([null]),
      pinCode : new FormControl (''),
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
      name : 'prakash',
      departmentName : '1',
      designation :'chennai',
      employeeCode : '23232',
      email : 'tect@nic.in',
      countryCode : '0',
      mobileNo :'9867655433',
      telPhno : '977664433432',
      offAddress1 : 'address1',
      offAddress2 : 'add2',
      offAddress3 : 'add3',
      city : 'chennai',
      state : 'tamilnadu',
      pinCode : '600028',
    })

  }
  onSubmit(){
    if(this.technicaladminform.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }
    console.log('billOwnerForm',this.technicaladminform.value)
  
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
}
