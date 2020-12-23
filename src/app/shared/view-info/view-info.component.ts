import { Component, OnInit,Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})


export class ViewInfoComponent implements OnInit,OnChanges {


  @Input() userDetails: any;

  
  Math: any;
  constructor() { }

  ngOnInit() {

    this.Math = Math;
    console.log(this.userDetails)
  }

  ngOnChanges() {
    console.log('Changes',this.userDetails)
  }

}
