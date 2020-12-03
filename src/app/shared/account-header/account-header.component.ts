import { Component, OnInit,Input,} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuditTrailDialogComponent} from '../audit-trail-dialog/audit-trail-dialog.component'

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit {




 @Input() title: string;
 @Input() accountName: string;
 @Input() status: string;
 @Input() user: any;

  constructor(private dialog :  MatDialog) { }

  ngOnInit() {
  }

  openAuditTrailDialog(){
      const MatDialogRef =  this.dialog.open(AuditTrailDialogComponent , {
        height: '600px',
        width: '800px',
      });
  }

}
