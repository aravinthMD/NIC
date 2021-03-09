import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '@services/util.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private utilService: UtilService) { 
    const lovData =   this.activatedRoute.snapshot.data;
    this.utilService.setLovData( lovData['listOfValue']['ProcessVariables'])
  }

  ngOnInit() {
  }

}
