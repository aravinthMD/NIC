import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'; 

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {


  userId : any;
  user : any;
  flag : boolean = false;

  constructor(private activateRoute: ActivatedRoute) { }

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
