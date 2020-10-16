import { Component, OnInit,ViewChild ,Input} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  
})
export class ProcessDetailsComponent implements OnInit {

  @ViewChild(MatAccordion,{ static: true }) accordion: MatAccordion; 
  @Input('userObj') user : any;

  expandflag : boolean  = false

   ELEMENT_DATA: any[] = [
    {
      invoiceNo: 2192,
      projectNumber: '76545',
      piAmt: 1.0079,
      emailAddress: 'aravinth@gmail.xom',
      remarks: 'nothing'
    }, {
      invoiceNo: 21921,
      projectNumber: '76545',
      piAmt: 1.0079,
      emailAddress: 'aravinth@gmail.xom',
      remarks: 'nothing' }, 
      , {
      invoiceNo: 21922,
      projectNumber: '76545',
      piAmt: 1.0079,
      emailAddress: 'aravinth@gmail.xom',
      remarks: 'nothing' }, 
      {
        invoiceNo: 21923,
        projectNumber: '76545',
        piAmt: 1.0079,
        emailAddress: 'aravinth@gmail.xom',
        remarks: 'nothing' },
         {
          invoiceNo: 21924,
          projectNumber: '76545',
          piAmt: 1.0079,
          emailAddress: 'aravinth@gmail.xom',
          remarks: 'nothing' },
           {
            invoiceNo: 21925,
            projectNumber: '76545',
            piAmt: 1.0079,
            emailAddress: 'aravinth@gmail.xom',
            remarks: 'nothing' },
              {
      
                invoiceNo: 21926,
                projectNumber: '76545',
                piAmt: 1.0079,
                emailAddress: 'aravinth@gmail.xom',
                remarks: 'nothing' }, 
                {
                  invoiceNo: 21927,
                  projectNumber: '76545',
                  piAmt: 1.0079,
                  emailAddress: 'aravinth@gmail.xom',
                  remarks: 'nothing' 
                },
  ];

  dataSource = this.ELEMENT_DATA;
  // columnsToDisplay = ['name1', 'weight', 'symbol', 'position'];
  columnsToDisplay = [
    {header : 'INVOICE NUMBER',arrayKey : 'invoiceNo'},
    {header : 'PROJECT NUMBER',arrayKey : 'projectNumber'},
    {header : 'REMARKS',arrayKey : 'remarks'}
  ]
  expandedElement: any | null;

  constructor() { }

  ngOnInit() {
  }



}
