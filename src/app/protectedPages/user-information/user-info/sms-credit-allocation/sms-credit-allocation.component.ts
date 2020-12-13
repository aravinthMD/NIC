import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LabelsService } from '@services/labels.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { format } from 'url';
import { ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-sms-credit-allocation',
  templateUrl: './sms-credit-allocation.component.html',
  styleUrls: ['./sms-credit-allocation.component.scss']
})
export class SmsCreditAllocationComponent implements OnInit {
  statusList=[
    {key:0,value:'Approved'},
    {key:1,value:'Reject'},
    {key:2,value:'Pending'},
    {key:3,value:'On Hold'},
    {key:4,value:'Raised'}
];
labels: any = {};
smsCreditAllocation:FormGroup;
panelOpenState=false;
displayedColumns:any[]=['s.no','credit','expiryDate','remark']

currentDate:any;

history:any[]=[
  {credit:1000,expiryDate:'1/10/2020',remark:'credited'},
  {credit:1500,expiryDate:'2/09/2020',remark:'credited'},
  {credit:2000,expiryDate:'3/08/2020',remark:'credited'},
  {credit:2500,expiryDate:'4/07/2020',remark:'credited'},
  {credit:500,expiryDate:'19/05/2020',remark:'credited'},
  {credit:20,expiryDate:'13/04/2020',remark:'credited'},
  {credit:12500,expiryDate:'24/03/2020',remark:'credited'},
  {credit:7500,expiryDate:'22/02/2020',remark:'credited'}
]
smsQuotaMetrix:any[]=[
  {key:0,value:'arpita.burman@nic.in'},
  {key:1,value:'dureja.sk@nic.in'},
  {key:2,value:'sshanker@nic.in'},
  {key:3,value:'pradeep.garg@nic.in'}
];
dataSource = new MatTableDataSource<any>(this.history)
@ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
isDisabledInp=true;

isDirty: boolean;

propertyFlag: boolean;

user: string;

accountName: string;
status: string;

searchForm: FormGroup;

detectAuditTrialObj: any;

remarkModal: boolean;


  constructor(
    private labelsService :LabelsService,
    private utilService:UtilService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private toasterService:ToasterService,) { }

  ngOnInit() {
    this.currentDate=this.datePipe.transform(new Date(), 'MMM d, y, h:mm:ss a	')
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    this.smsCreditAllocation=new FormGroup({
      smsQuotaMetrix: new FormControl (['']),
      credit: new FormControl ([null]),
      date: new FormControl ([null]),
      status: new FormControl ([null]),
      onApprovalOf: new FormControl ([null]),
      remark: new FormControl ([null]),
      statusChangedBy: new FormControl (['Akshaya']),
      timeStamp: new FormControl ([this.currentDate]),
    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
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
   
    this.smsCreditAllocation.patchValue({
      smsQuotaMetrix: '1',
      credit: '5000',
      date: new Date(),
      status: '2',
      onApprovalOf: 'dureja.sk@nic.in',
      remark: 'Status Changed',
      statusChangedBy: 'Akshaya',
      timeStamp: this.currentDate,
    })
    this.detectAuditTrialObj = this.smsCreditAllocation.value;
  }

   detectFormChanges() {

    let iRemark = false;

    const formObject = this.smsCreditAllocation.value;

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
    this.smsCreditAllocation.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }
      this.detectAuditTrialObj = this.smsCreditAllocation.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }
  remarkOkay() {
    this.remarkModal = false;
  }

  next() {

    this.utilService.setCurrentUrl('users/projectExecution')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val;
    })
    this.router.navigate(['/users/projectExecution/'+pno])

  }


  back(){
    this.utilService.setCurrentUrl('users/billingAdmin')

    if(this.user){
      this.router.navigate(['/users/billingAdmin/1'])
    }else {
      this.router.navigate(['/users/billingAdmin'])

    }
  
  }
  onSubmit() {
    if(this.smsCreditAllocation.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }

    this.detectFormChanges()
  }

  onSearch() {

    console.log(this.searchForm.value)
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    })
  }

  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  getDownloadXls(){
    this.utilService.getDownloadXlsFile(this.history)
  }

  detectDateKeyAction(event,type) {

    console.log(event)
  
    if(type == 'date') {

      this.smsCreditAllocation.patchValue({
        date: ''
      })
      this.toasterService.showError('Please click the date icon to select date','');
    }else if(type == 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: ''
      })
      this.toasterService.showError('Please click the fromdate icon to select date','');
    }else if(type == 'searchTo') {
      this.searchForm.patchValue({
        searchTo: ''
      })
      this.toasterService.showError('Please click the todate icon to select date','');
    }
    
  }
}
