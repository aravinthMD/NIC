import { Component, OnInit,Optional, Inject, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import {LabelsService } from '../../../../services/labels.service'
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AdminService } from '@services/admin.service';
import { InvoiceService } from '@services/invoice.service'

@Component({
  selector: 'app-purchase-order-dialog',
  templateUrl: './purchase-order-dialog.component.html',
  styleUrls: ['./purchase-order-dialog.component.scss']
})
export class PurchaseOrderDialogComponent implements OnInit {

  labels : any;
  buttonName : string = 'Edit';
  PurchaseOrderForm :  FormGroup;
  enableFlag : boolean = true;
  isDirty : boolean;
  poStatus: any;

  departmentListData: any;

  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]


  showUploadModal: boolean;

  showDeleteModal: boolean;
  detectAuditTrialObj:any;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;

  showPdfModal: boolean;
  remarkModal:boolean;

  showUpdate: boolean;

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }

  storeProjectNo: string;

  viewInfoData: any;

  showEdit: boolean;

  smsApprovedList = [
    {
    key: '1',
    value: 'Yes'
  },
  {
    key: '0',
    value: 'No'
  }

  ]

  poId: string;

  constructor(private labelService :  LabelsService,private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<PurchaseOrderDialogComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toasterService: ToasterService,private router: Router,private activatedRoute: ActivatedRoute,private utilService: UtilService,private adminService: AdminService,private invoiceService: InvoiceService) {


      this.poId = this.data.currentPOId;

      this.PurchaseOrderForm = this.formBuilder.group({
        userName : [this.data.userName],
        piNumber : [this.data.piNumber],
        poNumber : [this.data.poNumber],
        smsApproved : [this.data.smsApproved],
        projectName : [this.data.projectName],
        date : new Date(`${this.changeDateFormat(this.data.poDate)}`),
        withoutTax : [this.data.withOutTax],
        poStatus : [this.data.poStatus],
        startDate :  new Date(`${this.changeDateFormat(this.data.validFrom)}`),
        endDate :  new Date(`${this.changeDateFormat(this.data.validTo)}`),
        userEmail : [this.data.userEmail],
        poManagerEmail : [this.data.managerEmail],
        projectNo : [this.data.projectNumber],
        poAmountWithTax : [this.data.amountWithTax],
        departmentName : [this.data.department],
        paymentStatus : [''],
        remark:[this.data.remark],
        uploadDoc : ['']
      })
      this.detectAuditTrialObj=this.PurchaseOrderForm.value

      
   }

   changeDateFormat(date) {

    const splitDate = date.split('/');

    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

   }

   async getDepartmentLov() {
    return new Promise(async (resolve,reject)=> {
          let listData = []
          this.adminService.getLovSubMenuList("0").subscribe((response)=> {
            const submenuList = response['ProcessVariables']['Lovitems'];
            submenuList.forEach(element => {
                
                listData.push({key:element.key,value:element.name})
              });

            resolve(listData)
            })
      })
            
  }

  async getStatusLov() {

    return new Promise(async (resolve,reject)=> {
        let poData = []
        this.adminService.getLovSubMenuList("1").subscribe((response)=> {
        const poList = response['ProcessVariables']['Lovitems'];
        poList.forEach(element => {
          
          poData.push({key:element.key,value:element.name})
        });

        resolve(poData)
      })
    })
  }

 async ngOnInit() {
    this.labelService.getLabelsData().subscribe((value) =>{
    this.labels = value;
    })


    this.departmentListData = await this.getDepartmentLov();

    this.poStatus = await this.getStatusLov()


    this.activatedRoute.params.subscribe((value)=> {

      this.storeProjectNo = value.projectNo || 4535;
    })

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    console.log(this.data)
  


const psData = this.paymentStatus.filter((val)=> {

  return val.key == this.PurchaseOrderForm.value.paymentStatus
})

const poStatus = this.poStatus.filter((val)=> {
  return val.key == this.PurchaseOrderForm.value.poStatus
})

const departmentListData = this.departmentListData.filter((val)=> {
  return val.key == this.PurchaseOrderForm.value.departmentName
})
    this.viewInfoData = [
      {
        key: this.labels.userName,
        value:this.PurchaseOrderForm.value.userName
      },
      {
        key: this.labels.piNumber,
        value:this.PurchaseOrderForm.value.piNumber
      },
      {
        key: this.labels.poNumber,
        value:this.PurchaseOrderForm.value.poNumber
      },
      {
        key: this.labels.smsApproved,
        value:this.PurchaseOrderForm.value.smsApproved
      },
      {
        key: this.labels.projectName,
        value:this.PurchaseOrderForm.value.projectName
      },
      {
        key: this.labels.date,
        value:this.data.poDate
      },
      {
        key: this.labels.withoutTax,
        value:this.PurchaseOrderForm.value.withoutTax
      },
      {
        key: this.labels.poStatus,
        value: (poStatus.length > 0) ? poStatus[0].value : ''
      },
      {
        key: 'Valid From',
        value:this.data.validFrom
      },
      {
        key: 'Valid Upto',
        value:this.data.validTo
      },
      {
        key: this.labels.userEmail,
        value:this.PurchaseOrderForm.value.userEmail
      },
      {
        key: this.labels.poManagerEmail,
        value:this.PurchaseOrderForm.value.poManagerEmail
      },
      {
        key: this.labels.projectNo,
        value:this.PurchaseOrderForm.value.projectNo
      },
      {
        key: this.labels.poAmountWithTax,
        value:this.PurchaseOrderForm.value.poAmountWithTax
      },
      {
        key: this.labels.department,
        value:(departmentListData.length > 0)?departmentListData[0].value:''
      },
      {
        key: this.labels.paymentStatus,
        value: (psData.length > 0)?psData[0].value:''
      },
      {
        key: this.labels.remark,
        value:this.PurchaseOrderForm.value.remark
      },
      {
        key: 'Document',
        value:'invoice.pdf'
      },{
        key :  "",
        value :  ""
      },
      {
        key :  "",
        value :  ""
      }
    ]
  }

  OnEdit() {


    this.enableFlag = false;
    this.showUpdate = true;
    this.showEdit = true;
  }

  OnUpdate(){
  
      this.detectFormChanges();

    if(this.PurchaseOrderForm.invalid) {
      this.isDirty = true;
      return;
    }
      

    const poObject = {

      "uploads":"file",
      "paymentStatus":2,
      "selectedPOId":this.poId,
      "temp":"update",
      "poNumber":this.PurchaseOrderForm.value.poNumber,
      "projectNumber":this.PurchaseOrderForm.value.projectNo,
      "projectName": this.PurchaseOrderForm.value.projectName,
      "poDate": this.PurchaseOrderForm.value.date,
      "poStatus":Number(this.PurchaseOrderForm.value.poStatus),
      "uploadDocument":"file",
      "piNumber":this.PurchaseOrderForm.value.piNumber,
      "smsApproved":this.PurchaseOrderForm.value.smsApproved,
      "validUpto":this.PurchaseOrderForm.value.endDate,
      "department":this.PurchaseOrderForm.value.departmentName,
      "userName":this.PurchaseOrderForm.value.userName,
      "remark":this.PurchaseOrderForm.value.remark,
      "withoutTax":this.PurchaseOrderForm.value.withoutTax,
      "userEmail":this.PurchaseOrderForm.value.userEmail,
      "managerEmail":this.PurchaseOrderForm.value.poManagerEmail,
      "validFrom":this.PurchaseOrderForm.value.startDate,
      "amtWithTax":this.PurchaseOrderForm.value.poAmountWithTax
    }


    this.invoiceService.updatePurchaseOrder(poObject).subscribe((response)=> {

      console.log(response)

      
      this.toasterService.showSuccess('Data Saved Successfully','')

      this.showDataSaveModal = true;
      this.dataValue= {
        title: 'Purchase Order Saved Successfully',
        message: 'Are you sure you want to proceed tax invoice page?'
      }
    })

    

  }

  saveYes()
{

this.showDataSaveModal = false;

this.closeDialog()
this.next()



}

next() {

  this.utilService.setCurrentUrl('users/taxInvoice')

    this.router.navigate([`/users/taxInvoice/${this.storeProjectNo}`])

}

saveCancel() {

this.showDataSaveModal = false;
this.closeDialog()

}


  closeDialog(){
    this.dialogRef.close({event : 'close',data : 'returnvalue'})
  }


  viewDoc() {

    this.showUploadModal = true;
  }

  download(){
  
  }
  detectFormChanges() {

    let iRemark = false;

    const formObject = this.PurchaseOrderForm.value;

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
    this.PurchaseOrderForm.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }

    


      this.detectAuditTrialObj = this.PurchaseOrderForm.value;
     
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  async onFileSelect(event) {

    // alert('Success')
    const files: File = event.target.files[0];


    if(files.type == 'application/pdf') {

      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = ((e)=> {
        
        
        // this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + reader.result.toString())
        // target.files[0]

       // this.selectedPdf = ''
        this.fileSize = `Size - ${this.bytesToSize(files.size)}`
        this.fileName = files.name;  
        console.log('fileSize',this.fileSize)
        
      });

    }else {

      const base64: any = await this.toBase64(event);
      this.imageUrl = base64;
      this.fileSize = this.bytesToSize(files.size);
      this.fileName = files.name;

    }
   
  }


  toBase64(evt) {
    return new Promise((resolve, reject) => {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = (function(theFile) {
      //   return function(e) {
      //     const binaryData = e.target.result;
      //     const base64String = window.btoa(binaryData);
      //     console.log('base64String', base64String);
      //     resolve(base64String)
      //   };
      // })(file);
      var f = evt.target.files[0]; // FileList object
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          var binaryData = e.target.result;
          //Converting Binary Data to base 64
          var base64String = window.btoa(binaryData);
          console.log('base64String', base64String);
          resolve(base64String)
          //showing file converted to base64
          // document.getElementById('base64').value = base64String;
          // alert('File converted to base64 successfuly!\nCheck in Textarea');
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
      // Read in the image file as a data URL.
      // reader.readAsBinaryString(file);
      // reader.onloadend = () => {
      //   let result = '';

      //   if (this.fileType === 'jpeg' || this.fileType === 'png') {
      //     result = reader.result
      //       .toString()
      //       .replace(/^data:image\/[a-z]+;base64,/, '');
      //   } else if (this.fileType === 'pdf') {
      //     result = reader.result
      //       .toString()
      //       .replace(/^data:application\/[a-z]+;base64,/, '');
      //   } else if (this.fileType.includes('xls')) {
      //     result = reader.result.toString().split(',')[1];
      //   } else if (this.fileType === 'docx') {
      //     result = reader.result.toString().split(',')[1];
      //   } else {
      //     result = reader.result.toString();
      //   }
      //   resolve(result);
      // };

      // reader.onerror = (error) => reject(error);
    });
  }

  private bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

  showPDF() {
    this.showUploadModal = false;
    this.showPdfModal = true;
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
    }
    
  }


}
