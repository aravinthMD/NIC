import { Component, OnInit,Input,Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AuditTrailDialogComponent} from '../audit-trail-dialog/audit-trail-dialog.component';

import { FileToBase64Service } from '@services/file-to-base64.service';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit {



 @Input() showUpload: string;
 @Input() title: string;
 @Input() accountName: string;
 @Input() status: string;
 @Input() user: any;

 @Output() uploadCsv = new EventEmitter();

 @Output('addCredit') addCredit = new EventEmitter();
 @ViewChild('inputCsvFile', {static: false}) inputCsvFile: ElementRef;

  constructor(
    private dialog: MatDialog,
    private fileToBase64Service: FileToBase64Service) { }

  ngOnInit() {
  }

  async onUpload(event) {
    const files = event.target.files[0];
    const fileToRead = files;
    const fileReader = new FileReader();
    const file: any = await this.fileToBase64Service.convertToBase64(event);
    const data = {
        attachment: {
          name: file.name,
          content: file.base64,
          mime: 'application/vnd.ms-excel'
        }
    };
    this.inputCsvFile.nativeElement.value = '';
    this.uploadCsv.emit(data);
  }

  openAuditTrailDialog(){

      const dialogConfig = new MatDialogConfig();
      // dialogConfig.position = {
      //   'top' :'1',
      //   left : '1',
      // }
      dialogConfig.width = '2000px';
      dialogConfig.height = 'auto';
      dialogConfig.maxWidth = '95vw';
      const MatDialogRef =  this.dialog.open(AuditTrailDialogComponent ,dialogConfig
       );
  }

  addSMSCredit() {
    this.addCredit.emit()
  }

}
