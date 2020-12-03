import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {UtilService} from '@services/util.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {

  constructor(private router :Router,private utilService:UtilService,private ngxUiLoaderService: NgxUiLoaderService) { }

  ngOnInit() {
  }

  newUserMethod(){
    this.ngxUiLoaderService.start();

    this.utilService.setProjectNumber(null)
    this.utilService.setCurrentUrl('users/customerDetails');
    this.router.navigate(['/users/customerDetails']);
    this.ngxUiLoaderService.stop()
  }

}
