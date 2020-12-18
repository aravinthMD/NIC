import { Component, OnInit,Optional, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelsService } from '../../../../services/labels.service';
import { DatePipe } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-proforma-invoice-dialog-form',
  templateUrl: './proforma-invoice-dialog-form.component.html',
  styleUrls: ['./proforma-invoice-dialog-form.component.scss']
})
export class ProformaInvoiceDialogFormComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true;

  
  removable = false;;

  labels: any;

  form : FormGroup;

  isDirty: boolean;

  showUploadModal: boolean;

  selectedPdf: any;

  showPdfModal: boolean;

  showDeleteModal: boolean;

  piStatusData = [{key:0,value:'Received'},{key:1,value:'Approved'},{key:2,value:'Pending'},{key:3,value:'Rejected'},{key:4,value:'On hold'}]

  paymentStatusData = [{key:0,value:'Received'},{key:1,value:'Pending'},{key:2,value:'On hold'}]


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


  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';
  fileType: string;

  remarkModal:boolean;
  detectAuditTrialObj:any;

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }

  storeProjectNo: string;

  showUpdate: boolean;

  showEdit: boolean;

  viewInfoData: any;

  
  constructor( public dialogRef: MatDialogRef<ProformaInvoiceDialogFormComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private toasterService: ToasterService,private labelsService: LabelsService,private formBuilder : FormBuilder,private datePipe: DatePipe,private sanitizer: DomSanitizer, private utilService: UtilService,private router: Router,private activatedRoute: ActivatedRoute) { 

    console.log(data)

    this.form =this.formBuilder.group({
    
      accountName: ['Suresh'],
      invoiceNumber : ['4355'],
      refNumber: ['43434'],
      piTraffic: ['5678'],
      piOwner: ['Raja'],
      date: new Date(),
      nicsiManager: ['2'],
      piAmount: ['50000'],
      startDate:new Date(),
      endDate:new Date(),
      piStatus: ['2'],
      paymentStatus:['2'],
      remark:['testing']
    })
    this.detectAuditTrialObj=this.form.value
  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

    this.activatedRoute.params.subscribe((value)=> {

      this.storeProjectNo = value.projectNo || 4535;

    })

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    this.viewInfoData = [
      {
        key: this.labels.accountName,
        value:this.form.value.accountName
      },
      {
        key: this.labels.proformaIN,
        value:this.form.value.invoiceNumber
      },
      {
        key: this.labels.refNo,
        value:this.form.value.refNumber
      },
      {
        key: this.labels.piOwner,
        value:this.form.value.piOwner
      },
      {
        key: this.labels.piAmount,
        value:this.form.value.piAmount
      },
      {
        key: this.labels.piTraffic,
        value:this.form.value.piTraffic
      },
      {
        key: this.labels.date,
        value:`${day}/${month}/${year}`
      },
      {
        key: 'NICSI Manager',
        value:'vinod.agrawal@nic.in'
      },
      {
        key: 'Start Date',
        value:`${day}/${month}/${year}`
      },
      {
        key: 'End Date',
        value:`${day}/${month}/${year}`
      },
      {
        key: 'PI Status',
        value:'Pending'
      },
      {
        key: 'Payment Status',
        value:'On hold'
      },
      {
        key: this.labels.remark,
        value:this.form.value.remark
      },
      {
        key: 'Document',
        value:'invoice.pdf'
      },

    ]

  }

  OnEdit() {

    this.showUpdate = true;
    this.enableflag = false;
    this.showEdit = true;
  }

  OnUpdate(){
  
    this.detectFormChanges();
   
   

    if(this.form.invalid) {
      this.isDirty = true;
      return;
    }

    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['invoiceDate'] = this.datePipe.transform(this.form.value['invoiceDate'], 'dd/MM/yyyy')
    this.form.value['poDate'] = this.datePipe.transform(this.form.value['poDate'], 'dd/MM/yyyy')

    console.log(this.form.value)

    this.showDataSaveModal = true;
        this.dataValue= {
          title: 'Proforma Invoice Saved Successfully',
          message: 'Are you sure you want to proceed project execution page?'
        }
  }

  saveYes()
  {
 
   this.showDataSaveModal = false;
 
   this.closeDialog()
   this.next()
 

 
  }
 
  saveCancel() {
 
   this.showDataSaveModal = false;
   this.closeDialog()
  
  }

  next() {

    this.utilService.setCurrentUrl('users/projectExecution')

    this.router.navigate([`/users/projectExecution/${this.storeProjectNo}`])

  }

  formDateFunc(event) {
    
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: 'returnvalue' });
  }

  viewDoc() {

    this.showUploadModal = true;
  }
  detectFormChanges() {

    let iRemark = false;

    const formObject = this.form.value;

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
    this.form.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }

      this.detectAuditTrialObj = this.form.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  files:File;

 async onFileSelect(event) {

    // alert('Success')
    this.files = event.target.files[0];
       this.removable=true;
    if(this.files['type'] == 'application/pdf') {

      const reader = new FileReader();
       reader.readAsDataURL(this.files);
      reader.onload = ((e)=> {
        
        
        // this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + reader.result.toString())
        // target.files[0]

       // this.selectedPdf = ''
        this.fileSize = `Size - ${this.bytesToSize(this.files['size'])}`
        this.fileName = this.files['name'];  
        console.log('fileSize',this.fileSize)
        
      });

    }else {

      const base64: any = await this.toBase64(event);
      this.imageUrl = base64;
      this.fileSize = this.bytesToSize(this.files['size']);
      this.fileName = this.files['name'];

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


  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.imageToUpload = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.imageToUpload);
  //     reader.onload = e => this.selectedImage = reader.result.toString();
  //     this.caption = event.target.files[0].name;
  //   }
  // }

// onSelectPdfFile(event) {
//     if (event.target.files && event.target.files[0]) {
//       this.imageToUpload = event.target.files[0];
//       const reader = new FileReader();
//       reader.readAsDataURL(this.imageToUpload);
//       reader.onload = e => this.selectedPdf = reader.result.toString();
//       this.caption = event.target.files[0].name;
//     }
//   }
download(){
  
}

showPDF() {
  this.showUploadModal = false;
  this.showPdfModal = true;
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
  }
  
}

}
