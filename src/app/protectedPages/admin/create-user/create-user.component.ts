import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  @Input('userObj') user : any;

  propertyFlag: boolean;

  deparmentList : any[] = [{key:'Admin User',value:0},{key:'Operation user',value:1},{key:'Finance User',value:2}];

  constructor() { }

  ngOnInit() {
  }

}
