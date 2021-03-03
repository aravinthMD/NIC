import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AuditTrailDialogComponent} from '../audit-trail-dialog/audit-trail-dialog.component'

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

  constructor(private dialog :  MatDialog) { }

  ngOnInit() {
  }

  onUpload() {
    this.uploadCsv.emit();
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
