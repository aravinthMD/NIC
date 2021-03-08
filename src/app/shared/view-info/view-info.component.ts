import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})


export class ViewInfoComponent implements OnInit, OnChanges {


  @Input() userDetails: any;

  @Input() techAdminUserDetails: any;

  @Input() billAdminUserDetails: any;
  Math: any;
  showPdfModal: boolean;
  previewUrl: string;

  @Input() erpData;
 
  constructor() { }

  ngOnInit() {

    this.Math = Math;
    console.log(this.userDetails);
    console.log(this.techAdminUserDetails);
    console.log(this.billAdminUserDetails);
  }

  showPDF(documentId: string) {
    console.log('documentId', documentId);
    this.showPdfModal = true;
    this.previewUrl = `${environment.host}${environment.previewDocappiyoDrive}${documentId}`;
  }

  ngOnChanges() {
    console.log('Changes', this.userDetails);
  }

}
