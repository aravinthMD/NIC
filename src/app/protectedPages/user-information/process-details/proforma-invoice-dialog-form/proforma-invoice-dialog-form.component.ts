import { Component, OnInit,Optional, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelsService } from '../../../../services/labels.service';
import { DatePipe } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-proforma-invoice-dialog-form',
  templateUrl: './proforma-invoice-dialog-form.component.html',
  styleUrls: ['./proforma-invoice-dialog-form.component.scss']
})
export class ProformaInvoiceDialogFormComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true;

  

  labels: any;

  form : FormGroup;

  isDirty: boolean;

  showUploadModal: boolean;

  selectedPdf: any;

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
  fileSize: string;
  fileName: string;
  fileType: string;


  
  constructor( public dialogRef: MatDialogRef<ProformaInvoiceDialogFormComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private labelsService: LabelsService,private formBuilder : FormBuilder,private datePipe: DatePipe,private sanitizer: DomSanitizer) { 

    console.log(data)

    this.form =this.formBuilder.group({
    
      accountName: ['Suresh'],
      invoiceNumber : ['3456'],
      refNumber: ['43434'],
      piTraffic: ['5678'],
      piOwner: ['Raja'],
      date: new Date(),
      nicsiManager: ['2'],
      piAmount: ['50000'],
      startDate:new Date(),
      endDate:new Date(),
      piStatus: ['2'],
      paymentStatus:['2']

    })
  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableflag = false;

    if(this.form.invalid) {
      this.isDirty = true;
    }

    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['invoiceDate'] = this.datePipe.transform(this.form.value['invoiceDate'], 'dd/MM/yyyy')
    this.form.value['poDate'] = this.datePipe.transform(this.form.value['poDate'], 'dd/MM/yyyy')

    console.log(this.form.value)

  }

  formDateFunc(event) {
    
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: 'returnvalue' });
  }

  viewDoc() {

    this.showUploadModal = true;
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

}
