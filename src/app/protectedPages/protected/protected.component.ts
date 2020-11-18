import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {UtilService} from '@services/util.service'

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {

  constructor(private router :Router,private utilService:UtilService) { }

  ngOnInit() {
  }

  newUserMethod(){
    this.utilService.setCurrentUrl('users/customerDetails');
    this.router.navigate(['/users/customerDetails']);
  }

}
