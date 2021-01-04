import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LabelsService } from '@services/labels.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { format } from 'url';
import { ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { ToasterService } from '@services/toaster.service';
import { MatDialog } from '@angular/material';
import { SmsCreditDialogComponent } from './sms-credit-dialog/sms-credit-dialog.component'

@Component({
  selector: 'app-sms-credit-allocation',
  templateUrl: './sms-credit-allocation.component.html',
  styleUrls: ['./sms-credit-allocation.component.scss']
})
export class SmsCreditAllocationComponent implements OnInit {
  statusList=[
    {key:0,value:'Approved'},
    {key:1,value:'Rejected'},
    {key:2,value:'Pending'}
];
labels: any = {};
smsCreditAllocation:FormGroup;
panelOpenState=false;
displayedColumns:any[]=['s.no','credit','expiryDate','status','reminder','remark','Action']

viewInfoData : any

currentDate:any;

history:any[]=[
  {credit:5000,expiryDate:'1/10/2020',status:'Pending',remark:'credited'},
  {credit:4500,expiryDate:'2/09/2020',status:'Pending',remark:'credited'},
  {credit:3000,expiryDate:'3/08/2020',status:'Approved',remark:'credited'},
  {credit:3500,expiryDate:'4/07/2020',status:'Pending',remark:'credited'},
  {credit:3000,expiryDate:'19/05/2020',status:'Rejected',remark:'credited'},
  {credit:2000,expiryDate:'13/04/2020',status:'Rejected',remark:'credited'},
  {credit:3000,expiryDate:'24/03/2020',status:'Pending',remark:'credited'},
  {credit:5000,expiryDate:'22/02/2020',status:'Pending',remark:'credited'}
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

showView :  boolean  = true;

propertyFlag: boolean;

user: string;

accountName: string;
status: string;

searchForm: FormGroup;

detectAuditTrialObj: any;

remarkModal: boolean;

showEmailModal: boolean;

modalData: {
  title: string;
  request: any
}


showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }



  constructor(
    private labelsService :LabelsService,
    private utilService:UtilService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private toasterService:ToasterService,
    private dialog : MatDialog) { }

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

      }else {
        this.showView = false
      }


  }

  editData() {
    this.propertyFlag = false;
    this.showView = false;
  }


  setFormValues() {
   
    // this.smsCreditAllocation.patchValue({
    //   smsQuotaMetrix: '1',
    //   credit: '5000',
    //   date: new Date(),
    //   status: '2',
    //   onApprovalOf: 'dureja.sk@nic.in',
    //   remark: 'Status Changed',
    //   statusChangedBy: 'Akshaya',
    //   timeStamp: this.currentDate,
    // })
    this.detectAuditTrialObj = this.smsCreditAllocation.value;


    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    

    const smsQuotaMetrix = this.smsQuotaMetrix.filter((val)=> {

      return val.key == this.smsCreditAllocation.value.smsQuotaMetrix
    })

    

    const statusList = this.statusList.filter((val)=> {

      return val.key == this.smsCreditAllocation.value.status
    })


    this.viewInfoData = [
      {
        key  : this.labels.smsQuotaMetrix,
        value  : smsQuotaMetrix[0].value
      },
      {
        key  : this.labels.credit,
        value  : this.smsCreditAllocation.value.credit
      },
      {
        key  : this.labels.dateOfRequest,
        value  : `${day}/${month}/${year}`
      },
      {
        key  : this.labels.status,
        value :  statusList[0].value
      },
      {
        key  : this.labels.onApprovalOf,
        value  : this.smsCreditAllocation.value.onApprovalOf
      },
      {
        key  : this.labels.remark,
        value  : "Status Changed"
      },
      {
        key   : this.labels.statusChangedBy,
        value  : this.smsCreditAllocation.value.statusChangedBy
      },
      {
        key  : this.labels.timeStamp,
        value :  this.smsCreditAllocation.value.timeStamp
      }
    ]

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

      this.showDataSaveModal = true;
    this.dataValue= {
      title: 'SMS Credit Saved Successfully',
      message: 'Are you sure you want to proceed proforma invoice page?'
    }

      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }
  remarkOkay() {
    this.remarkModal = false;
  }

  next() {

    this.utilService.setCurrentUrl('users/proformaInvoice')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val || '1';
    })
    this.router.navigate(['/users/proformaInvoice/'+pno])

  }


  back(){
    this.utilService.setCurrentUrl('users/billingAdmin')

    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val || '1';
    })

    if(this.user){
      this.router.navigate(['/users/techAdmin/'+pno])
    }else {
      this.router.navigate(['/users/techAdmin'])

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


  sendReminder(element) {
    this.showEmailModal = true;

    this.modalData =  {
      title: 'Send Reminder Email',
      request: {
        from: 'akshaya@appiyo.com',
        to: 'arul.auth@nic.in',
        subject: `Test Email: ${element.invoiceNo || 4535}`
      }
    }
  }
  onOkay() {
    this.showEmailModal = false;
  }

  onCancel() {
    this.showEmailModal = false;
  }

  newCredit(element) {
   
    const dialogRef = this.dialog.open(SmsCreditDialogComponent, {
      data :element
    })

    dialogRef.afterClosed().subscribe((result) =>{
      console.log('The dialog was closed', result);

    })
    
  }

  saveYes() {
    this.utilService.setCurrentUrl('users/proformaInvoice')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val;
    })

    this.router.navigate(['/users/proformaInvoice/'+pno])
  }

  saveCancel() {
    this.showDataSaveModal = false;
  }

  OnEdit(element) {

    this.newCredit(element)

  }

}
