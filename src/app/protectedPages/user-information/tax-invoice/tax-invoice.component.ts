import { Component, OnInit,Input,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from 'src/app/services/labels.service';
import {DatePipe} from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material';
import { TaxInvoiceDialogComponent } from './tax-invoice-dialog/tax-invoice-dialog.component';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { SearchService } from '../../../services/search.service';
import {ApiService} from '../../../services/api.service'
import { AdminService } from '@services/admin.service';
import { ClientDetailsService } from '@services/client-details.service';

@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  @Input('userObj') user : any; 

//    monthList = [ "January", "February", "March", "April", "May", "June",
// "July", "August", "September", "October", "November", "December" ];

//  yearList = [ "2020", "2021", "2022", "2023", "2024", "2025",
// "2026", "2027", "2028", "2029", "2030", "2031" ];

  displayedColumns : string[] = ['InvoiceNo','projectNo','piAmt','remarks','Active']

  csvSampleData:any[]=[
    {InvoiceNo:1111,projectNo:1111,piAmt:1000,remarks:'nill',Active:'Active'},
    {InvoiceNo:2222,projectNo:2222,piAmt:2000,remarks:'nill',Active:'deactive'},
    {InvoiceNo:3333,projectNo:3333,piAmt:3000,remarks:'nill',Active:'Active'},
    {InvoiceNo:4444,projectNo:4444,piAmt:4000,remarks:'nill',Active:'deactive'},
    {InvoiceNo:5555,projectNo:5555,piAmt:5000,remarks:'nill',Active:'Active'},
    {InvoiceNo:6666,projectNo:6666,piAmt:6000,remarks:'nill',Active:'deactive'},
    {InvoiceNo:7777,projectNo:7777,piAmt:7000,remarks:'nill',Active:'Active'},
    {InvoiceNo:8888,projectNo:8888,piAmt:8000,remarks:'nill',Active:'deactive'}]

  userList : any[] =   [
   
    {invoiceNo : 1343,projectNumber : 4535,piAmt:24250,remarks:''},
    {invoiceNo : 5464,projectNumber : 4535,piAmt:35000,remarks:''},
    {invoiceNo : 7687,projectNumber : 4535,piAmt:23450,remarks:''}

  ];
  paymentStatus: any[] = []

    invoiceStatusList :  any[] = [
      {key : 0,value : 'Pending'},
      {key : 1,value : 'Paid'},
      {key : 2,value : 'Partially Paid'},
      {key : 3,value : 'Return by NICSI'}
    ]

  dataSource = new MatTableDataSource<any>([]);
  taxInvoiceForm:FormGroup;
  searchForm : FormGroup;
  labels: any ={};
  isDirty: boolean;
  toDate =new Date();
  accountName: string;

  status: string;
  propertyFlag: boolean;

  storeProjectNo: string;

  resultsLength: number;
  pageEvent: PageEvent;

  datePerPage: number = 0;

  monthValidation: {
    rule?: any;
    msg?: string;
  }[];

  yearValidation: {
    rule?: any;
    msg?: string;
  }[];

  constructor(
      private labelsService: LabelsService,
      private Datepipe:DatePipe,
      private activatedRoute: ActivatedRoute,
      private dialog : MatDialog,
      private utilService: UtilService,
      private toasterService: ToasterService,
      private router: Router,
      private invoiceService : InvoiceService,
      private searchService: SearchService,
      private apiService:ApiService,
      private adminService: AdminService,
      private clientDetailsService: ClientDetailsService
      ) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;

    });
    this.taxInvoiceForm=new FormGroup({
      userName: new FormControl(null),
      taxIN:new FormControl(null),
      invoiceDate:new FormControl(null),
      projectNo:new FormControl(null,Validators.pattern("^[0-9]{0,15}$")),
      poNumber:new FormControl(null),
      poDate:new FormControl(null),
      fromDate:new FormControl(null),
      toDate:new FormControl(null),
      invoiceAmount:new FormControl(null),
      remark:new FormControl(null),
      uploadDoc:new FormControl(null),
      paymentStatus:new FormControl(null),
      invoiceStatus : new FormControl(null),
      invoiceAmountPaid : new FormControl(null),
      tds :  new FormControl(null),
      penalty :  new FormControl(null),
      shortPay : new FormControl(null),
      submittedOn : new FormControl(null),
      projectName:new FormControl(null),
      projectCordinator:new FormControl(null),
      PONoAmendOrder:new FormControl(null),
      mail:new FormControl(null),
      poBillable: new FormControl(null),
      totalSMS:new FormControl(null),
      counts:new FormControl(null),
      baseAmount : new FormControl(null),
      tax:new FormControl(null),
      recvDate : new FormControl(null),
      book :  new FormControl(null),
      dateEstimated :  new FormControl(null),
      invoiceAmount2 : new FormControl(null),
      bankReceived : new FormControl(null),
      interestOnTDSotherDeduction : new FormControl(null),
      receiptDate :  new FormControl(null),
      month : new FormControl(null),
      year : new FormControl(null),
      mrn : new FormControl(null),
      estimation: new FormControl(null)
    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })

    this.monthValidation = this.monthValidationCheck();
    this.yearValidation = this.yearValidationCheck();
    this.utilService.userDetails$.subscribe((val)=> {
      this.accountName = val['App_name'] || '';
      this.status = val['status'] || '';
    })

    this.storeProjectNo = this.clientDetailsService.getClientId();

    this.getSubLovs();

    // this.dataSource = new MatTableDataSource<any>(this.userList);
    this.getAllTaxInvoiceDetails();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  monthValidationCheck() {

    const month = [
      {
        rule: (val) => {

          

          return (val > 0 && val < 11) ? false: true;
        },
        msg: 'Please enter the month between range of 0 to 11',
      }
    ];
    return month;
  }

  yearValidationCheck() {

    const year = [
      {
        rule: (val) => {

          let year = val;
          var text = /^[0-9]+$/;
      if (year != 0) {
        if ((year != "") && (!text.test(year))) {
            return true;
        }

        if (year.length != 4) {
            return true;
        }
        var current_year=new Date().getFullYear();
        if((year < 1920) || (year > current_year))
            {
            return true;
            }
        return false;
          }
        },
        msg: 'Please enter the valid year',
      }
    ];
    return year;
  }

  async getSubLovs() {

    let listData = []

    await this.adminService.getLovSubMenuList("3").subscribe((response)=> {


      const submenuList = response['ProcessVariables']['Lovitems'];
     submenuList.forEach(element => {
        
        listData.push({key:element.key,value:element.name})
      });
    })

    this.paymentStatus = listData;

  }

  getAllTaxInvoiceDetails(currentPage?: any){

    this.invoiceService.getTaxInvoiceDetails().subscribe((response) => {

      if(response['ProcessVariables']['error']['code'] == '0') {
        const DataTaxInvoiceList = response["ProcessVariables"]["TIList"];

        this.datePerPage = Number(response['ProcessVariables']['dataPerPage']);

        this.resultsLength = Number(response['ProcessVariables']['totalCount'])

        this.dataSource = new MatTableDataSource<any>([]);
        this.dataSource = new MatTableDataSource<any>(DataTaxInvoiceList);
      }else {
        this.toasterService.showError(response['ProcessVariables']['error']['message'],'')
      }
      
    },(error) =>{
      this.toasterService.showError(error,'')
    })

  }


  createTaxInvoice(){


    if(this.taxInvoiceForm.invalid) {
      this.isDirty = true;
      return;
    }


    const feildControls = this.taxInvoiceForm.controls;
    const userName = feildControls.userName.value;
    const taxIN  = feildControls.taxIN.value;
    const invoiceDate = feildControls.invoiceDate.value;
    const projectNo = feildControls.projectNo.value;
    const poNumber = feildControls.poNumber.value;
    const poDate = feildControls.poDate.value;
    const fromDate = feildControls.fromDate.value;
    const toDate = feildControls.toDate.value;
    const invoiceAmount = feildControls.invoiceAmount.value;
    const remark = feildControls.remark.value;
    const uploadDoc = feildControls.uploadDoc.value;
    const paymentStatus = +feildControls.paymentStatus.value;
    const invoiceStatus = +feildControls.invoiceStatus.value;
    const invoiceAmountPaid = feildControls.invoiceAmountPaid.value;
    const tds = feildControls.tds.value;
    const penalty = feildControls.penalty.value;
    const shortPay = feildControls.shortPay.value;
    const submittedOn = feildControls.submittedOn.value;
    const poBillable = feildControls.poBillable.value;
    const projectName = feildControls.projectName.value;
    const projectCordinator = feildControls.projectCordinator.value;
    const PONoAmendOrder = +feildControls.PONoAmendOrder.value;
    const mail = +feildControls.mail.value;
    const totalSMS = Number(feildControls.totalSMS.value);
    const counts = feildControls.counts.value;
    const baseAmount = Number(feildControls.baseAmount.value);
    const tax = Number(feildControls.tax.value);
    const book = feildControls.book.value;
    const invoiceAmount2 = Number(feildControls.invoiceAmount2.value);
    const bankReceived = feildControls.bankReceived.value;
    const interestOnTDSotherDeduction = feildControls.interestOnTDSotherDeduction.value;
    const mrn = feildControls.mrn.value;
    const recvDate = feildControls.recvDate.value;
    const receiptDate = feildControls.receiptDate.value;
    const dateEstimated = feildControls.dateEstimated.value;
    const estimation = feildControls.estimation.value;

    const month = feildControls.month.value;
    const year = feildControls.year.value;

    
    const formattedRecvDate = this.Datepipe.transform(recvDate,'dd/MM/yyyy')
    const formattedReceiptDate = this.Datepipe.transform(receiptDate,'dd/MM/yyyy')
    const formattedDateEstimated = this.Datepipe.transform(dateEstimated,'dd/MM/yyyy')


    const formattedFromDate = this.Datepipe.transform(fromDate,'dd/MM/yyyy');
    const formattedToDate = this.Datepipe.transform(toDate,'dd/MM/yyyy');
    const formattedPoDate = this.Datepipe.transform(poDate,'dd/MM/yyyy');
    const formattedSubmitedOn = this.Datepipe.transform(submittedOn,'dd/MM/yyyy');

    const formattedInvoiceDate = this.Datepipe.transform(invoiceDate,'dd/MM/yyyy');

    const Data = {
      "userName":userName,
      "projectNumber":projectNo,
      "poNumber":poNumber,
      "poDate":formattedPoDate,
      "fromDate":formattedFromDate,
      "toDate":formattedToDate,
      "billableAmount":poBillable,
      "InvoiceAmount":invoiceAmount,
      "TaxInvoiceNumber":taxIN,
      "submittedDate":formattedSubmitedOn,
      "InvoiceStatus":invoiceStatus,
      "InvoicePaidAmount":invoiceAmountPaid,
      "tds":tds,
      "penalty":penalty,
      "shortPay":shortPay,
      "paymentStatus":paymentStatus,
      "remark":remark,
      "uploadDocument":"File",
      "userEmail":mail,
      "totalSMS":totalSMS,
      "counts1":counts,
      "baseAmount":baseAmount,
      "tax":tax,
      "invoiceDate":formattedInvoiceDate,
      "receiveDate":formattedRecvDate,
      "book":book,
      "dateEstimated":formattedDateEstimated,
      "invoiceAmount2":invoiceAmount2,
      "bankReceived":bankReceived,
      "receiptDate1":formattedReceiptDate,
      "month":month,
      "year":year,
      "mrnNumber":mrn,
      "projectName":projectName,
      "Estimation":estimation,
      "id": ""
    }

    // const Data = {
    //   userName,
    //   projectNumber : projectNo,
    //   poNumber,
    //   poDate: formattedPoDate,
    //   fromDate: formattedFromDate,
    //   toDate : formattedToDate,
    //   billableAmount : poBillable,
    //   InvoiceAmount : invoiceAmount,
    //   TaxInvoiceNumber  : taxIN,
    //   submittedDate :  formattedSubmitedOn,
    //   InvoiceStatus  : invoiceStatus,
    //   InvoicePaidAmount : invoiceAmountPaid,
    //   tds,
    //   penalty,
    //   shortPay,
    //   paymentStatus,
    //   remark,
    //   projectName,
    //   projectCordinator,
    //   PONoAmendOrder,
    //   mail,
    //   totalSMS,
    //   counts,
    //   baseAmount,
    //   tax,
    //   book,
    //   invoiceAmount2,
    //   bankReceived,
    //   interestOnTDSotherDeduction,
    //   mrn,
    //   receiptDate : formattedReceiptDate,
    //   recvDate :formattedRecvDate,
    //   dateEstimated :formattedDateEstimated,
		//   uploadDocument  : "file"

    // }

    this.invoiceService.createTaxInvoice(Data).subscribe((response) =>{

            console.log(response["ProcessVariables"])
            if(response["ProcessVariables"]['error']['code'] == '0'){
              this.isDirty = false;
              this.toasterService.showSuccess('Tax Invoice Form Submitted Sucessfully','');
              this.getAllTaxInvoiceDetails();
              this.taxInvoiceForm.reset();
            }else {
              this.toasterService.showError(response["ProcessVariables"]['error']['message'],'');
            }

    },(error) => {
      console.log(error)

      this.toasterService.showError(error,'')
    })
    
  }

  taxInForm(){
    if(this.taxInvoiceForm.invalid) {
     
      this.isDirty = true;

      return
    }
    this.taxInvoiceForm.value['fromDate']=this.Datepipe.transform(this.taxInvoiceForm.value['fromDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['toDate']=this.Datepipe.transform(this.taxInvoiceForm.value['toDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['poDate']=this.Datepipe.transform(this.taxInvoiceForm.value['poDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['invoiceDate']=this.Datepipe.transform(this.taxInvoiceForm.value['invoiceDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['submittedOn'] = this.Datepipe.transform(this.taxInvoiceForm.value['submittedOn'],'dd/MM/yyyy')
    console.log(this.taxInvoiceForm.value)
    this.taxInvoiceForm.reset()
  }

  onSearch() {

    console.log(this.searchForm.value);
    
    const data = this.apiService.api.getTaxInvoiceDetails

    const params = {
        searchKeyword: this.searchForm.get('searchData').value,
        fromDate: this.searchForm.get('searchFrom').value,//"2020-12-27T18:30:00.000Z",
        toDate: this.searchForm.get('searchTo').value//"2021-01-05T18:30:00.000Z"
    }

      this.searchService
          .searchProjectExecution(data,params).subscribe((resp) => {
            console.log('value', resp);
            const respError=resp["ProcessVariables"]["error" ];

            if(respError['code'] =="0")
            {
              
              console.log('result',resp['ProcessVariables']);

              if(resp["ProcessVariables"]["TIList" ]){
              this.dataSource = new MatTableDataSource<any>(resp["ProcessVariables"]["TIList" ]);

              }else {

              this.dataSource = new MatTableDataSource<any>([]);

              }

              this.datePerPage = Number(resp['ProcessVariables']['dataPerPage']);

              this.resultsLength = Number(resp['ProcessVariables']['totalCount'])
           }
          else 
            { 
              this.toasterService.showError(`${respError.code}: ${respError.message}`, 'Technical error..');
            }
            
          })
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    })

    this.getAllTaxInvoiceDetails()
  }

  OnEdit(fromObj :  any){
    const dialogRef = this.dialog.open(TaxInvoiceDialogComponent, {
      data : fromObj.currentTIId
    })

    dialogRef.afterClosed().subscribe((result) =>{
      console.log('The dialog was closed', result);
      this.getAllTaxInvoiceDetails()

    })
  }
 getDownloadXls(){
   this.utilService.getDownloadXlsFile(this.userList,"");
 }

 detectDateKeyAction(event,type) {

  console.log(event)
  
  if(type == 'poDate') {

    this.taxInvoiceForm.patchValue({
      poDate: ''
    })
    this.toasterService.showError('Please click the PO date icon to select date','');
  }else if(type == 'fromDate') {

    this.taxInvoiceForm.patchValue({
      fromDate: ''
    })
    this.toasterService.showError('Please click the fromDate icon to select date','');
  }else if(type == 'toDate') {

    this.taxInvoiceForm.patchValue({
      toDate: ''
    })
    this.toasterService.showError('Please click the toDate icon to select date','');
  }else if(type == 'submittedOn') {

    this.taxInvoiceForm.patchValue({
      submittedOn: ''
    })
    this.toasterService.showError('Please click the submittedOn icon to select date','');
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
  }else if(type == 'recvDate') {
    this.taxInvoiceForm.patchValue({
      recvDate: ''
    })
    this.toasterService.showError('Please click the recvDate icon to select date','');
  }else if(type == 'dateEstimated') {
    this.taxInvoiceForm.patchValue({
      dateEstimated: ''
    })
    this.toasterService.showError('Please click the dateEstimated icon to select date','');
  }else if(type == 'receiptDate') {
    this.taxInvoiceForm.patchValue({
      receiptDate: ''
    })
    this.toasterService.showError('Please click the receiptDate icon to select date','');
  }else if(type == 'invoiceDate') {
    this.taxInvoiceForm.patchValue({
      invoiceDate: ''
    })
    this.toasterService.showError('Please click the invoiceDate icon to select date','');
  }
  
}

back() {

  this.utilService.setCurrentUrl('users/purchaseOrder')

  this.router.navigate([`/users/purchaseOrder/${this.storeProjectNo}`])

}

pageEventData(event) {


  const currentPageIndex  = Number(event.pageIndex) + 1;

  // this.getAllTaxInvoiceDetails(currentPageIndex)
}


}
