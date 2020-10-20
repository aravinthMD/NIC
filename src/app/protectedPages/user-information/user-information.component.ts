import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'; 


@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class UserInformationComponent implements OnInit {
  
  userId : any;
  user : any;
  flag : boolean = false;
  constructor(private activateRoute : ActivatedRoute) {

   }

  ngOnInit() {

    this.activateRoute.paramMap.subscribe((params : ParamMap) => {
      this.userId = params.get("id");
      if(this.userId !== null && this.userId !== undefined){
        this.flag = true;
        console.log('User '+this.user)
      }
    })
  }

}
