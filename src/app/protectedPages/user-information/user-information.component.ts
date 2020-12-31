import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router'; 
// import {} from '@services/'
// import {} from '@service/'

import {UtilService} from '../../services/util.service';

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
  

  constructor(private activateRoute : ActivatedRoute,private utilService: UtilService,private router: Router) {

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

  detectDirty(event) {
    console.log(event.target.innerText)
  }

}
