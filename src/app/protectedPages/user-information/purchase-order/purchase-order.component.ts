import { Component, OnInit,Input, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import {DatePipe} from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material';
import { PurchaseOrderDialogComponent } from './purchase-order-dialog/purchase-order-dialog.component';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { AdminService } from '@services/admin.service'
import { BehaviourSubjectService } from '@services/behaviour-subject.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  poNumber : any = 'Saikumar';
  smsapproved: any = 'Yes';

  
  @Input('userObj') user : any

  storeProjectNo: string;

  displayedColumns : string[] = ['purchaseNo','projectNo','piAmt','remarks',"Action"]

  userList : any[] =   [
    {purchaseNo : 114,projectNumber : 4535,piAmt:24250,reminder:'Send Reminder'},
    {purchaseNo : 197,projectNumber : 4535,piAmt:25000,reminder:'Send Reminder'},
    {purchaseNo : 767,projectNumber : 4535,piAmt:45000,reminder:'Send Reminder'},
    {purchaseNo : 678,projectNumber : 4535,piAmt:24250,reminder:'Send Reminder'},
    {purchaseNo : 114,projectNumber : 4535,piAmt:28000,reminder:'Send Reminder'},
    {purchaseNo : 114,projectNumber : 4535,piAmt:34000,reminder:'Send Reminder'},
  ];
  poStatus: any[] = [
    { key :0, value: 'Received' },
    { key :1,value : 'Not Received'},
    { key :2,value : 'Raised'},
    { key: 3, value: 'Pending' },
    { key: 4, value: 'Rejected' },
    { key: 5, value: 'On Hold' }]
  piStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]
    piReceivedIn: any[] = [
      { key: 0, value: 'Full' },
      { key: 1, value: 'Partial' }]
  
    paymentStatus: any[] = [
      { key: 0, value: 'Pending' },
      { key: 1, value: 'Received' },
      { key: 2, value: 'On Hold' }]

      departmentListData = [
        {key:0,value:'Department of Sainik Welfare'},
        {key:1,value:'Ministry of Minority Affairs'},
        {key:2,value:'Visakhapatnam Port Trust'},
        {key:3,value:'Ministry of Tribal Affairs'},
        {key:4,value:'Bureau of Naviks.Mumbai'}
    ];
    
    dataArray=[]
      
  dataSource = new MatTableDataSource<any>(this.userList);

  date = new FormControl();

  
  PurchaseOrderForm:FormGroup;
   formQuantity: FormGroup;
  
  labels: any = {};
  isDirty: boolean;

  searchForm: FormGroup;

  propertyFlag: boolean;

  accountName: string;

status: string;

showPOModal: boolean;

isQuantityDirty: boolean;

showDataSaveModal: boolean;

dataValue: {
  title: string;
  message: string
}

smsApprovedList : any[] = [
        {key: '0', value: 'No'},
        {key: '1',value: 'Yes'}
              ]
  // poNumber: string;
  // smsapproved: any;
 




  constructor(
    private labelsService: LabelsService,
    private DatePipe:DatePipe,
    private activatedRoute: ActivatedRoute,
    private dialog : MatDialog,
    private utilService: UtilService,
    private toasterService: ToasterService,
    private router: Router,
    private invoiceService: InvoiceService,
    private adminService: AdminService,
    private beheSer : BehaviourSubjectService
    ) { }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
      console.log('label',this.labels)
    })
    this.PurchaseOrderForm = new FormGroup({
      userName: new FormControl(null),
    
      piNumber: new FormControl(null),
      poNumber: new FormControl(null),
      smsApproved: new FormControl(null),
      projectName:new FormControl(null),
      date:new FormControl(null),
      withoutTax: new FormControl(null),
      poStatus:new FormControl(''),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      userEmail:new FormControl(null),
      poManagerEmail: new FormControl(null),
      projectNo:new FormControl(null,Validators.pattern("^[0-9]{0,15}$")),
      poAmountWithTax: new FormControl(null),
      departmentName: new FormControl(''),
      paymentStatus:new FormControl(''),
      uploadDoc:new FormControl(null),
      remark:new FormControl('')

    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchTo: new FormControl(null)
    })

    this.formQuantity = new FormGroup({
      rate: new FormControl(null),
      quantity: new FormControl(null),
      description: new FormControl(null)
    })

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['userId'] || '';
      this.status = val['status'] || '';
    })

    this.beheSer.$poNumber.subscribe( res => {
      this.poNumber = res;
       this.poNumber =this.poNumber;
    });

    this.beheSer.$smsapproved.subscribe( res => {
      this.smsapproved = res;
      this.smsapproved = this.smsapproved;
    });

   this.fetchPODetails();

   this.getSubLovs();

   this.dataArray.push(this.formQuantity);
  }

  
 

  purchaseForm(){
    this.dataArray.push(this.formQuantity);
  }

  deleteRow(index){
    this.dataArray.splice(index);
  }

  submit(){
    console.log(this.dataArray);
  }

  fetchPODetails() {

    this.invoiceService.fetchAllPO().subscribe((response)=> {

      this.userList = response['ProcessVariables']['purchaseData'];

      console.log(response)

      this.dataSource = new MatTableDataSource<any>(this.userList);
    })
  }

  async getSubLovs() {

    let listData = []

    await this.adminService.getLovSubMenuList("0").subscribe((response)=> {


      const submenuList = response['ProcessVariables']['Lovitems'];
     submenuList.forEach(element => {
        
        listData.push({key:element.key,value:element.name})
      });
    })

    this.departmentListData = listData;


    let poData = []

    await this.adminService.getLovSubMenuList("1").subscribe((response)=> {


      const poList = response['ProcessVariables']['Lovitems'];
      poList.forEach(element => {
        
        poData.push({key:element.key,value:element.name})
      });
    })

    this.poStatus = poData
  }

  initForm() {


    this.PurchaseOrderForm = new FormGroup({
      userName: new FormControl(null),
    
      piNumber: new FormControl(null),
      poNumber: new FormControl(null),
      smsApproved: new FormControl(null),
      projectName:new FormControl(null),
      date:new FormControl(null),
      withoutTax: new FormControl(null),
      poStatus:new FormControl(''),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      userEmail:new FormControl(null),
      poManagerEmail: new FormControl(null),
      projectNo:new FormControl(null,Validators.pattern("^[0-9]{0,15}$")),
      poAmountWithTax: new FormControl(null),
      departmentName: new FormControl(''),
      paymentStatus:new FormControl(''),
      uploadDoc:new FormControl(null),
      remark:new FormControl('')

    })


  }
  
  POForm(){

    if(this.PurchaseOrderForm.invalid) {
     
      this.isDirty = true;

      return
    }

    this.showPOModal = true;
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

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

  OnEdit(element :  any){

    const dialogRef = this.dialog.open(PurchaseOrderDialogComponent,{
      data : element
    })

    dialogRef.afterClosed().subscribe((result) =>{
      console.log('The dialog was closed', result);

      this.fetchPODetails();

    })

  } 
  getDownloadXls(){
    this.utilService.getDownloadXlsFile(this.userList,'PurchaseOrder')
  }

  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'date') {

      this.PurchaseOrderForm.patchValue({
        date: ''
      })
      this.toasterService.showError('Please click the date icon to select date','');
    }else if(type == 'startDate') {

      this.PurchaseOrderForm.patchValue({
        startDate: ''
      })
      this.toasterService.showError('Please click the valid from icon to select date','');
    }else if(type == 'endDate') {

      this.PurchaseOrderForm.patchValue({
        endDate: ''
      })
      this.toasterService.showError('Please click the valid upto icon to select date','');
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

    this.utilService.setCurrentUrl('users/taxInvoice')

    this.router.navigate([`/users/taxInvoice/${this.storeProjectNo}`])

  }

  back() {

    this.utilService.setCurrentUrl('users/projectExecution')

    this.router.navigate([`/users/projectExecution/${this.storeProjectNo}`])

  }

  submitPO() {

    if(this.formQuantity.invalid) {
      this.isQuantityDirty = true;
      return;
    }

   


    this.PurchaseOrderForm.value['date']=this.DatePipe.transform(this.PurchaseOrderForm.value['date'],'dd/MM/yyyy')

    this.PurchaseOrderForm.value['startDate']=this.DatePipe.transform(this.PurchaseOrderForm.value['startDate'],'dd/MM/yyyy')

    this.PurchaseOrderForm.value['endDate']=this.DatePipe.transform(this.PurchaseOrderForm.value['endDate'],'dd/MM/yyyy')


    const data = {
      "poNumber":this.PurchaseOrderForm.value.poNumber,
      "projectNumber":this.PurchaseOrderForm.value.projectNo,
      "projectName": this.PurchaseOrderForm.value.projectName,
      "poDate": this.PurchaseOrderForm.value.date,
      "poStatus":Number(this.PurchaseOrderForm.value.poStatus),
      "uploadDocument":"file",
      "pi_no":this.PurchaseOrderForm.value.piNumber,
      "smsapproved":this.PurchaseOrderForm.value.smsApproved,
      "validUpto":this.PurchaseOrderForm.value.endDate,
      "department":this.PurchaseOrderForm.value.departmentName,
      "username":this.PurchaseOrderForm.value.userName,
      "remark":this.PurchaseOrderForm.value.remark,
      "withouttax":this.PurchaseOrderForm.value.withoutTax,
      "userEmail":this.PurchaseOrderForm.value.userEmail,
      "managerEmail":this.PurchaseOrderForm.value.poManagerEmail,
      "validFrom":this.PurchaseOrderForm.value.startDate,
      "amtWithTax":this.PurchaseOrderForm.value.poAmountWithTax
    }



    this.invoiceService.createPurchaseOrder(data).subscribe((response)=> {

      console.log('Response',response)

        this.showPOModal= false;

        this.isDirty = false;

        this.PurchaseOrderForm.reset()
        this.beheSer.setPoNumber(data.poNumber);
        this.beheSer.setSmsApproved(data.smsapproved);


          this.toasterService.showSuccess('Data Saved Successfully','')

          this.fetchPODetails()

          this.showDataSaveModal = true;
          this.dataValue= {
            title: 'Purchase Order Saved Successfully',
            message: 'Are you sure you want to proceed tax invoice page?'
          }

       

    })
 

  }

  

  

  

  cancelPO() {
    this.showPOModal= false;
  }

  saveYes()
 {

  this.showDataSaveModal = false;
  this.showPOModal= false;

  this.utilService.setCurrentUrl('users/taxInvoice')

  this.router.navigate([`/users/taxInvoice/${this.storeProjectNo}`])


 }

 saveCancel() {

  this.showDataSaveModal = false;
  this.showPOModal= false;
 }
}
