import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LabelsService } from '@services/labels.service';
import { UtilService } from '@services/util.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { format } from 'url';

@Component({
  selector: 'app-sms-credit-allocation',
  templateUrl: './sms-credit-allocation.component.html',
  styleUrls: ['./sms-credit-allocation.component.scss']
})
export class SmsCreditAllocationComponent implements OnInit {
  status=[
    {key:0,value:'Approved'},
    {key:1,value:'Reject'},
    {key:2,value:'Pending'},
    {key:3,value:'On Hold'},
    {key:4,value:'Raised'}
];
labels:any[]=[];
smsCreditAllocation:FormGroup;
panelOpenState=false;
displayedColumns:any[]=['s.no','credit','expiryDate','remark']

currentDate:string;

history:any[]=[
  {credit:1000,expiryDate:'1/10/2020',remark:'credited'},
  {credit:1500,expiryDate:'2/09/2020',remark:'credited'},
  {credit:2000,expiryDate:'3/08/2020',remark:'credited'},
  {credit:2500,expiryDate:'4/07/2020',remark:'credited'}
]
smsQuotaMetrix:any[]=[
  {key:0,value:'Aravinth'},
  {key:1,value:'Arunkumar'},
  {key:2,value:'Bala'},
  {key:3,value:'Raja'}
];
dataSource = new MatTableDataSource<any>(this.history)
isDisabledInp=true;
  constructor(
    private labelsService :LabelsService,
    private utilService:UtilService,
    private router:Router,
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
      statusChangedBy: new FormControl ([null]),
      timeStamp: new FormControl ([this.currentDate]),
    })
  }
  back(){
    this.utilService.setCurrentUrl('dashboard')
    this.router.navigate(['/users/Dashboard'])
  
  }
}
