import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  @Input('userObj') user : any;

  deparmentList : any[] = [{key:'Department of Sainik Welfare',value:0},{key:'Minstry of minority affairs',value:1},{key:'Vishakhapatnam port Trust',value:2},
  {key:'minstry of trible affairs',value:2},{key:'Bureasu of Naviks.Mumbai',value:3}
];

  constructor() { }

  ngOnInit() {
  }

}
