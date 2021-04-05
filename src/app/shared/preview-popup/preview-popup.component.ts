import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html',
  styleUrls: ['./preview-popup.component.scss']
})
export class PreviewPopupComponent implements OnInit {

  NOTFOUND = 404;

  previewDoc : any;

  minimize  = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : any,
    public dialogRef: MatDialogRef<PreviewPopupComponent>) { }

  ngOnInit() {
    this.isFileAvble(this.data);
  }

  isFileAvble(url){
      this.previewDoc = url;
  }

  resize(width : string,height : string,type : string){

    if(type === 'minimize'){
      this.minimize = true;

    }
      else{
      this.minimize = false;
      }

    this.dialogRef.updateSize(width,height)
  }

}
