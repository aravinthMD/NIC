import { Component, OnInit,ViewChild ,Input,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ProformaInvoiceDialogFormComponent} from './proforma-invoice-dialog-form/proforma-invoice-dialog-form.component'
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router'
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  
})
export class ProcessDetailsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  @Input('userObj') user : any;

  storeProjectNo: string;

  displayedColumns : string[] = ['InvoiceNo','accountName','projectNumber','piAmt','Action',"reminder","Escalation"]


  userList : any[] =   [
    {invoiceNo : 4355,accountName : 'RajeshK',projectNumber: 4535,piAmt:25000,remarks:'credited'},
    {invoiceNo : 2313,accountName : 'Suresh Agarwal',projectNumber: 4535,piAmt:56000,remarks:'credited'},
    {invoiceNo : 6574,accountName : "Sharma",projectNumber: 4535,piAmt:25000,remarks:'credited'},
    {invoiceNo : 7454,accountName : "Sharma",projectNumber: 4535,piAmt:70000,remarks:'credited'},
    {invoiceNo : 5667,accountName : "Sharma",propropertyFlagjectNumber: 4535,piAmt:56000,remarks:'credited'},
    {invoiceNo : 5889,accountName : "Sharma",projectNumber: 4535,piAmt:23000,remarks:'credited'},
    {invoiceNo : 4500,accountName : "Sharma",projectNumber: 4535,piAmt:45000,remarks:'credited'},
    {invoiceNo : 7800,accountName : "Sharma",projectNumber: 4535,piAmt:34000,remarks:'credited'},
    {invoiceNo : 7688,accountName : "Sharma",projectNumber: 4535,piAmt:24000,remarks:'credited'},
    {invoiceNo : 5322,accountName : "Sharma",projectNumber: 4535,piAmt:67000,remarks:'credited'},
    {invoiceNo : 1332,accountName : "Sharma",projectNumber: 4535,piAmt:54000,remarks:'credited'},
    {invoiceNo : 5454,accountName : "Sharma",projectNumber: 4535,piAmt:20000,remarks:'credited'},
    {invoiceNo : 6543,accountName : "Sharma",projectNumber: 4535,piAmt:10000,remarks:'credited'},
    {invoiceNo : 3445,accountName : "Sharma",projectNumber: 4535,piAmt:20000,remarks:'credited'}
  ];

  piStatusData = [{key:0,value:'Received'},{key:1,value:'Approved'},{key:2,value:'Pending'},{key:3,value:'Rejected'},{key:4,value:'On Hold'}]

  paymentStatusData = [{key:0,value:'Received'},{key:1,value:'Pending'},{key:2,value:'On Hold'}]

  nicsiData = [
    {
      key: '1',
      value: 'ukjena@nic.in'
    },
    {
      key: '2',
      value: 'vinod.agrawal@nic.in'
    },
    {
      key: '3',
      value: 'rk.raina@nic.in'
    },
    {
      key: '4',
      value: 'sshanker@nic.in'
    },
    {
      key: '5',
      value: 'Deepak.saxena@nic.in'
    }
  ]

  dataSource = new MatTableDataSource<any>(this.userList);


  labels: any;

  form : FormGroup;

  isDirty: boolean;

  searchForm: FormGroup;
  accountName: string;
  status: string;

  showEmailModal: boolean;

  propertyFlag: boolean;

  modalData: {
    title: string;
    request: any
  }


  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }
  

  constructor(private dialog: MatDialog,private labelsService: LabelsService,private formBuilder : FormBuilder,private datePipe: DatePipe,private activatedRoute: ActivatedRoute,private utilService: UtilService,private toasterService: ToasterService,private router: Router) { 


    this.form =this.formBuilder.group({
      accountName: [null],
      invoiceNumber : [null],
      refNumber: [null],
      piTraffic: [null],
      piOwner: [null],
      date: [null],
      nicsiManager: [''],
      piAmount: [null],
      startDate:[null],
      endDate:[null],
      piStatus: [''],
      paymentStatus:[''],
      remark:['']

    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })


  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['userId'] || '';
      this.status = val['status'] || '';
    })

    this.activatedRoute.params.subscribe((value)=> {

      this.storeProjectNo = value.projectNo || 4535;
      this.userList =   [
        {invoiceNo : 4355,accountName : 'RajeshK',projectNumber: value.projectNo || 4535,piAmt:25000,remarks:'credited'},
        {invoiceNo : 2313,accountName : 'Suresh Agarwal',projectNumber: value.projectNo || 4535,piAmt:56000,remarks:'credited'},
        {invoiceNo : 6574,accountName : "Sharma",projectNumber: value.projectNo || 4535,piAmt:25000,remarks:'credited'},
        {invoiceNo : 7454,accountName : "Prakash",projectNumber:  value.projectNo ||4535,piAmt:70000,remarks:'credited'},
        {invoiceNo : 5667,accountName : "Mani",projectNumber:  value.projectNo ||4535,piAmt:5000,remarks:'credited'},
        {invoiceNo : 5663,accountName : "Raja",projectNumber:  value.projectNo ||4535,piAmt:56000,remarks:'credited'},
        {invoiceNo : 5889,accountName : "Karthi",projectNumber:  value.projectNo ||4535,piAmt:23000,remarks:'credited'},
        {invoiceNo : 4500,accountName : "Saran",projectNumber:  value.projectNo ||4535,piAmt:45000,remarks:'credited'},
        {invoiceNo : 7800,accountName : "Rebaca",projectNumber:  value.projectNo ||4535,piAmt:34000,remarks:'credited'},
        {invoiceNo : 7688,accountName : "John",projectNumber:  value.projectNo ||4535,piAmt:24000,remarks:'credited'},
        {invoiceNo : 5322,accountName : "Selva",projectNumber:  value.projectNo ||4535,piAmt:67000,remarks:'credited'},
        {invoiceNo : 1332,accountName : "Subash",projectNumber:  value.projectNo ||4535,piAmt:54000,remarks:'credited'},
        {invoiceNo : 5454,accountName : "Vinoth",projectNumber:  value.projectNo ||4535,piAmt:20000,remarks:'credited'},
        {invoiceNo : 6543,accountName : "Prem",projectNumber:  value.projectNo ||4535,piAmt:10000,remarks:'credited'},
        {invoiceNo : 3445,accountName : "Juli",projectNumber:  value.projectNo ||4535,piAmt:20000,remarks:'credited'}
      ];

      this.dataSource = new MatTableDataSource<any>(this.userList);
  });

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  OnEdit(formObj : any){
    const dialogRef = this.dialog.open(ProformaInvoiceDialogFormComponent,{
      data: {
        value:'testing'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  onSubmit() {

    // this.userList.push({invoiceNo : 8787,projectNumber : 4552,piAmt:50000,remarks:'credited'})

    // this.dataSource = new MatTableDataSource<any>(this.userList);

    // this.dataSource.paginator = this.paginator;

    if(this.form.invalid) {
      this.isDirty = true;
      return;
    }


    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['invoiceDate'] = this.datePipe.transform(this.form.value['invoiceDate'], 'dd/MM/yyyy')
    this.form.value['poDate'] = this.datePipe.transform(this.form.value['poDate'], 'dd/MM/yyyy')

    console.log(this.form.value)

    this.toasterService.showSuccess('Data Saved Successfully','')

      this.showDataSaveModal = true;
      this.dataValue= {
        title: 'SMS Credit Saved Successfully',
        message: 'Are you sure you want to proceed project execution page?'
      }


  }

  saveYes()
  {
 
   this.showDataSaveModal = false;
 
   this.next()
 
 
  }
 
  saveCancel() {
 
   this.showDataSaveModal = false;
  
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



  sendReminder(element) {
    this.showEmailModal = true;

    this.modalData =  {
      title: 'Send Reminder Email',
      request: {
        from: 'akshaya@appiyo.com',
        to: 'arul.auth@nic.in',
        subject: `Test Email: ${element.invoiceNo}`
      }
    }
  }

  sendEscalation(element) {
    this.showEmailModal = true;

    this.modalData =  {
      title: 'Send Escalation Email',
      request: {
        from: 'akshaya@appiyo.com',
        to: 'escalation@nic.in',
        subject: `Test Email: [##201##]_PI REF: ${element.invoiceNo}`
      }
    }

  }

  onOkay() {
    this.showEmailModal = false;
  }

  onCancel() {
    this.showEmailModal = false;
  }

  getDownloadXls(){
    this.utilService.getDownloadXlsFile(this.userList,'ProformaInvoice');
  }

  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'date') {

      this.form.patchValue({
        date: ''
      })
      this.toasterService.showError('Please click the date icon to select date','');
    }else if(type == 'startDate') {

      this.form.patchValue({
        startDate: ''
      })
      this.toasterService.showError('Please click the startDate icon to select date','');
    }else if(type == 'endDate') {

      this.form.patchValue({
        endDate: ''
      })
      this.toasterService.showError('Please click the endDate icon to select date','');
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

  next() {

    this.utilService.setCurrentUrl('users/projectExecution')

    this.router.navigate([`/users/projectExecution/${this.storeProjectNo}`])

  }

  back() {

    this.utilService.setCurrentUrl('users/smsCredit')

    this.router.navigate([`/users/smsCredit/${this.storeProjectNo}`])

  }
}
