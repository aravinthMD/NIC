import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import {LabelsService} from '../../../../services/labels.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-project-excecution-dialog',
  templateUrl: './project-excecution-dialog.component.html',
  styleUrls: ['./project-excecution-dialog.component.scss']
})
export class ProjectExcecutionDialogComponent implements OnInit {

  ProjectExcecutionForm :  FormGroup ;
  isDirty: boolean;
  labels :  any;
  buttonName : any = 'Edit';
  enableflag :boolean = true;
  showDeleteModal: boolean;

  modeOfPaymentList = [
    {key : 0 ,value : 'DD'},
    {key : 1 ,value : "Cheque"},
    {key : 2 , value : "RTGS"},
    {key : 3 ,value : "IMPS"}
  ]

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Minstry of minority affairs'},
    {key:2,value:'Vishakhapatnam port Trust'},
    {key:3,value:'Ministry of trible affairs'},
    {key:4,value:'Bureasu of Naviks.Mumbai'}
];

  piPaidValues = [
    {
    key: 0, 
    value: 'Full Payment'
  },
  {
    key: 1, 
    value: 'Partial Payment'
  }];

  showUploadModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;

  showPdfModal:boolean;



  constructor(private labelsService : LabelsService,private dialogRef : MatDialogRef<ProjectExcecutionDialogComponent> ,private formBuilder :  FormBuilder) { 

    // this.ProjectExcecutionForm = new FormGroup({
    //   userName : new FormControl(null),
    //   piNumber : new FormControl(null),
    //   piDate : new FormControl(null),
    //   piAmount : new FormControl(null),
    //   modeOfPayment : new FormControl(''),
    //   documentNo :  new FormControl(null),
    //   dateOfTransaction :  new FormControl(null),
    //   bankName : new FormControl(null),
    //   amountReceived : new FormControl(null),
    //   tds : new FormControl(null),
    //   NICSIProjectNo : new FormControl(null),
    //   invoiceDate :  new FormControl(null),
    //   transactionDate : new FormControl(null),
    //   piPaid: new FormControl('')
    // });

    this.ProjectExcecutionForm = this.formBuilder.group({
      userName : ['Suchita'],
      piNumber : ['4355'],
      piDate : new Date(),
      piAmount : ['50000'],
      modeOfPayment : ['2'],
      documentNo : ['3000'],
      dateOfTransaction : new Date(),
      bankName : ['SBI'],
      amountReceived : ['30000'],
      tds : ['2500'],
      NICSIProjectNo: ['6785'],
      invoiceDate : new Date(),
      transactionDate : new Date(),
      piPaid : ['1'],
      remark:['User Updated']

    })

  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;
    })

  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableflag = false;

    if(this.ProjectExcecutionForm.invalid){
      this.isDirty = true;
    }

  }


  closeDialog(){
    this.dialogRef.close({ event : 'close' ,data : 'returnvalue'});
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

  showPDF() {
    this.showUploadModal = false;
    this.showPdfModal = true;
  }


}
