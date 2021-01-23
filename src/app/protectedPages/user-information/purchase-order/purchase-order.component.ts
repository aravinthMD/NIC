import { Component, OnInit,Input, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl, FormArray } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import {DatePipe} from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material';
import { PurchaseOrderDialogComponent } from './purchase-order-dialog/purchase-order-dialog.component';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { AdminService } from '@services/admin.service';
import { SearchService } from '../../../services/search.service';
import {ApiService } from '../../../services/api.service';
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

  userList : any[] =   []
  poStatus: any[] = [
    { key :0, value: 'Received' },
    { key :1,value : 'Not Received'},
    { key :2,value : 'Raised'},
    { key: 3, value: 'Pending' },
    { key: 4, value: 'Rejected' },
    { key: 5, value: 'On Hold' }]
  piStatus: any[] = []
    piReceivedIn: any[] = []
  
    paymentStatus: any[] = []

      departmentListData = [];
    
    dataArray=[]
      
  // dataSource = new MatTableDataSource<any>(this.userList);

  dataSource = new MatTableDataSource<any>([]);
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
 

  withoutTaxValidation: {
    rule?: any;
    msg?: string;
  }[];

  resultsLength: number;

  pageEvent: PageEvent;

  datePerPage: number = 0;


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
    private searchService: SearchService,
    private apiService : ApiService,
    private beheSer : BehaviourSubjectService,
    private fb:FormBuilder
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
      searchTo: new FormControl(null),
      searchFrom: new FormControl(null)
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

   this.withoutTaxValidation = this.withoutTaxValidationCheck();
  }

  withoutTaxValidationCheck() {

    const withouttax = [
      {
        rule: (val) => {

          return val;
        },
        msg: 'Amount should greater than without tax',
      }
    ];
    return withouttax;
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

  fetchPODetails(currentPage?: any) {

   
    this.invoiceService.fetchAllPO(currentPage?currentPage:null).subscribe((response)=> {

      if(response['ProcessVariables']['error']['code'] == '0') {

        this.userList = response['ProcessVariables']['purchaseData'];

          console.log(response)

          this.datePerPage = Number(response['ProcessVariables']['dataPerPage']);

          this.resultsLength = Number(response['ProcessVariables']['totalCount'])

          this.dataSource = new MatTableDataSource<any>([]);

          this.dataSource = new MatTableDataSource<any>(this.userList);

      }else {

        this.toasterService.showError(response['ProcessVariables']['error']['message'],'')
      }
      
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

    let piData = []

    await this.adminService.getLovSubMenuList("2").subscribe((response)=> {


      const piList = response['ProcessVariables']['Lovitems'];
      piList.forEach(element => {
        
        piData.push({key:element.key,value:element.name})
      });
    })

    this.piStatus = piData

    let paymentStatus = []

    await this.adminService.getLovSubMenuList("3").subscribe((response)=> {


      const paymentList = response['ProcessVariables']['Lovitems'];
      paymentList.forEach(element => {
        
        paymentStatus.push({key:element.key,value:element.name})
      });
    })

    this.paymentStatus = paymentStatus


    let piReceivedData = []

    await this.adminService.getLovSubMenuList("4").subscribe((response)=> {

      const piRecList = response['ProcessVariables']['Lovitems'];
      piRecList.forEach(element => {
        
        piReceivedData.push({key:element.key,value:element.name})
      });
    })

    this.piReceivedIn = piReceivedData
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
    
    const data = this.apiService.api.fetchPurchaseOrder;

      const params = {
        searchKeyword: this.searchForm.get('searchData').value,
        // fromDate: this.DatePipe.transform(this.searchForm.get('searchFrom').value,'dd/MM/yyyy'),
        // toDate: this.DatePipe.transform(this.searchForm.get('searchTo').value,'dd/MM/yyyy')
        fromDate: this.searchForm.get('searchFrom').value,
        toDate: this.searchForm.get('searchTo').value
      }

      this.searchService
          .searchProjectExecution(data,params).subscribe((resp) => {

            const respError=resp["ProcessVariables"]["error" ];

            if(respError.code=="0")
            {
              
              console.log('result',resp['ProcessVariables']);
              this.dataSource = new MatTableDataSource<any>(resp["ProcessVariables"]["purchaseData" ]);

              this.datePerPage = Number(resp['ProcessVariables']['dataPerPage']);

              this.resultsLength = Number(resp['ProcessVariables']['totalCount'])
            }
            else 
            { 
              if(!resp["ProcessVariables"]["purchaseData" ]) {
                this.dataSource = new MatTableDataSource<any>([])
                this.datePerPage = 0;
                this.resultsLength = 0;
              }

               this.toasterService.showError('No Records Found','Purchase Order');
            }
            
         
         
          })
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    })

    this.fetchPODetails()
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

    // {"poNumber":"5972112","projectNumber":"11","projectName":"TestABC","poDate":"24/12/2020","uploadDocument":"file","pi_no":"2","smsapproved":"2","validUpto":"30/12/2020","username":"TestUser01","remark":"Remark Column","withouttax":"3","userEmail":"testdemo@appiyo,com","managerEmail":"managerdemo123@gmail,com","validFrom":"24/12/2020","amtWithTax":"52","rate":"220","quantity":4,"description":"Description","selectedDepartment":"37","selectedPOStatus":"6","selectedPaymentStatus":"6"},"projectId":"2efbdc721cc311ebb6c0727d5ac274b2"}
	
   
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
      "username":this.PurchaseOrderForm.value.userName,
      "remark":this.PurchaseOrderForm.value.remark,
      "withouttax":this.PurchaseOrderForm.value.withoutTax,
      "userEmail":this.PurchaseOrderForm.value.userEmail,
      "managerEmail":this.PurchaseOrderForm.value.poManagerEmail,
      "validFrom":this.PurchaseOrderForm.value.startDate,
      "amtWithTax":this.PurchaseOrderForm.value.poAmountWithTax,
      "rate":this.formQuantity.value.rate,
      "quantity":Number(this.formQuantity.value.quantity),
      "description":this.formQuantity.value.description,
      "selectedDepartment":this.PurchaseOrderForm.value.departmentName,
      "selectedPOStatus":this.PurchaseOrderForm.value.poStatus,
      "selectedPaymentStatus":this.PurchaseOrderForm.value.paymentStatus
    }



    this.invoiceService.createPurchaseOrder(data).subscribe((response)=> {

      console.log('Response',response)

      if(response['ProcessVariables']['error']['code'] == '0') {

        this.showPOModal= false;

        this.isDirty = false;

        this.PurchaseOrderForm.reset();
        this.formQuantity.reset();
        this.beheSer.setPoNumber(data.poNumber);
        this.beheSer.setSmsApproved(data.smsapproved);


          this.toasterService.showSuccess('Data Saved Successfully','')

          this.fetchPODetails()

          this.showDataSaveModal = true;
          this.dataValue= {
            title: 'Purchase Order Saved Successfully',
            message: 'Are you sure you want to proceed tax invoice page?'
          }
      }else {
        this.toasterService.showError(response['ProcessVariables']['error']['message'],'')
      }

    })
 

  }

  pageEventData(event) {


    const currentPageIndex  = Number(event.pageIndex) + 1;

    this.fetchPODetails(currentPageIndex)
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
