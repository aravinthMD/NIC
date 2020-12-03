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
  {key:0,value:'Aravinth'},
  {key:1,value:'Arunkumar'},
  {key:2,value:'Bala'},
  {key:3,value:'Raja'}
];
dataSource = new MatTableDataSource<any>(this.history)
@ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
isDisabledInp=true;

isDirty: boolean;

propertyFlag: boolean;

user: string;

accountName: string;
status: string;


  constructor(
    private labelsService :LabelsService,
    private utilService:UtilService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe) { }

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
      statusChangedBy: new FormControl (['akshaya']),
      timeStamp: new FormControl ([this.currentDate]),
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
      credit: '50000',
      date: new Date(),
      status: '2',
      onApprovalOf: 'approval',
      remark: 'remarks',
      statusChangedBy: 'changed by',
      timeStamp: this.currentDate,
    })
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

  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
}
