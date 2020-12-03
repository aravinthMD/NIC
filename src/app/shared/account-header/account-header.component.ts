import { Component, OnInit,Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
