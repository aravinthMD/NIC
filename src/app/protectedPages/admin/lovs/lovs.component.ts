import { Component, OnInit } from '@angular/core';
import { LabelsService } from '@services/labels.service';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss']
})
export class LovsComponent implements OnInit {


  deparmentList: any[] = [
    { value: 'Department of Sainik Welfare', key: 0 },
    { value: 'Minstry of minority affairs', key: 1 },
    { value: 'Vishakhapatnam port Trust', key: 2 },
    { value: 'minstry of trible affairs', key: 3 },
    { value: 'Bureasu of Naviks.Mumbai', key: 4 }
  ];
  poStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]
  piStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]
    piReceivedIn: any[] = [
      { key: 0, value: 'Full' },
      { key: 1, value: 'Partial' }]
  
    paymentStatus: any[] = [
      { key: 0, value: 'Pending' },
      { key: 1, value: 'Received' },
      { key: 2, value: 'On Hold' }]
  labels: any[]
  buttonName: string = 'Save/Edit';

  propertyFlag: boolean = false;
  constructor(private labelsService: LabelsService) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
  }

  saveOrEdit() {
    return
    if (this.buttonName == 'Edit') {
      this.propertyFlag = false;
      this.buttonName = 'Save'
    } else {
      this.propertyFlag = true;
      this.buttonName = 'Edit'
    }

  }

}
