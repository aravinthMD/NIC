import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss']
})
export class LovsComponent implements OnInit {


  deparmentList : any[] = [{key:'Department of Sainik Welfare',value:0},{key:'Minstry of minority affairs',value:1},{key:'Vishakhapatnam port Trust',value:2},
  {key:'minstry of trible affairs',value:2},{key:'Bureasu of Naviks.Mumbai',value:3}
];

buttonName:  string = 'Save/Edit';

propertyFlag: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  saveOrEdit() {
    return
    if(this.buttonName == 'Edit') {
      this.propertyFlag = false;
      this.buttonName = 'Save'
    }else {
      this.propertyFlag = true;
      this.buttonName = 'Edit'
    }
    
  }

}
