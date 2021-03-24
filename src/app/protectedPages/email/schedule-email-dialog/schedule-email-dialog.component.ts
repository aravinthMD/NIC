import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';

@Component({
  selector: 'app-schedule-email-dialog',
  templateUrl: './schedule-email-dialog.component.html',
  styleUrls: ['./schedule-email-dialog.component.scss']
})
export class ScheduleEmailDialogComponent implements OnInit {


  emailform : FormGroup;

  today = new Date();

  emitForm = new EventEmitter<any>();

  options1: string[] = ['00.00', '00.30', '01.00', '01.30','02.00', '02.30',
  , '03.00', '03.30','04.00', '04.30','05.00', '05.30', '06.00', '06.30', '07.00', '07.30',
  , '08.00', '08.30','09.00', '09.30','10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  , '13.00', '13.30','14.00', '14.30','15.00', '15.30', '16.00', '16.30', '17.00', '17.30',
  , '18.00', '18.30','19.00', '19.30','20.00', '20.30', '21.00', '21.30', '22.00', '22.30',
  , '23.00', '23.30'];

  filteredOptions1 : Observable<string[]>;


  constructor() { }



  ngOnInit() {
    this.initForm();
    this.filteredOptions1 = this.emailform.get('scheduleTime').valueChanges
    .pipe(
      startWith(''),
      map(val => this._filter1(val))
    );
  }

  initForm(){

    this.emailform = new FormGroup({
      fromScheduleDate : new FormControl('',Validators.required),
      toScheduleDate : new FormControl('',Validators.required),
      scheduleTime  : new FormControl('',Validators.required)
    })
  }

  private _filter1(val: string): any {
    if(!val)
      return
  const filterVal = val.toLowerCase();
  return this.options1.filter(opt => opt.toLowerCase().includes(filterVal));
}


onTimeInput(event) {
  console.log('event', event.target.value);
  const value = event.target.value;
  this.emailform.get('scheduleTime').setValue(value.replace(/[^0-9.]*/g, ''));
}

scheduleEmail() {

  const form = this.emailform.value;
  console.log('form vlaue',form);
  
  this.emitForm.emit(form);

}
 

}
