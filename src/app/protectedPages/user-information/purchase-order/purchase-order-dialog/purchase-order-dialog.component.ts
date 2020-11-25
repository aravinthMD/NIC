import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {LabelsService } from '../../../../services/labels.service'

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
  poStatus: any[] = [
    { key :0, value: 'Received' },
    { key :1,value : 'Not Received'},
    { key :2,value : 'Raised'},
    { key: 3, value: 'Pending' },
    { key: 4, value: 'Rejected' },
    { key: 5, value: 'On Hold' }]

    departmentListData = [
      {key:0,value:'Department of Sainik Welfare'},
      {key:1,value:'Minstry of minority affairs'},
      {key:2,value:'Vishakhapatnam port Trust'},
      {key:3,value:'Ministry of trible affairs'},
      {key:4,value:'Bureasu of Naviks.Mumbai'}
  ];

  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]


  showUploadModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;


  constructor(private labelService :  LabelsService,private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<PurchaseOrderDialogComponent>) {

    this.PurchaseOrderForm = this.formBuilder.group({
      userName : ['Kumaran'],
      piNumber : ['35000'],
      poNumber : ['45000'],
      smsApproved : ['2000'],
      projectName : ['STNIC'],
      date : new Date(),
      withoutTax : ['2400'],
      poStatus : ['3'],
      startDate : new Date(),
      endDate : new Date(),
      userEmail : ['mathur@nic.com'],
      poManagerEmail : ['kumar@nicadmin.com'],
      projectNo : ['3400'],
      poAmountWithTax : [5000],
      departmentName : ['2'],
      paymentStatus : ['1'],
      uploadDoc : ['']
    })

   }

  ngOnInit() {
    this.labelService.getLabelsData().subscribe((value) =>{
    this.labels = value;
    })
  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableFlag = false;

    if(this.PurchaseOrderForm.invalid)
      this.isDirty = true;

  }


  closeDialog(){
    this.dialogRef.close({event : 'close',data : 'returnvalue'})
  }


  viewDoc() {

    this.showUploadModal = true;
  }

  download(){
  
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

  

}
