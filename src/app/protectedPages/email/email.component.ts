import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Validators, FormGroup,FormControl,ReactiveFormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import {map, startWith } from 'rxjs/operators';

export interface Email {
  name: string;
}

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  showinput:boolean=false;

  editTempinp:boolean=false;

  chooseTemp:boolean=false;
  schedule:boolean=false

  TemplateList:any[]=[
    {key:0,value:"templete 1",content:"hello, i am templete 1",subject:"greeting,i am templete 1"},
    {key:1,value:"templete 2",content:"hello, i am templete 2",subject:"greeting,i am templete 2"},
    {key:2,value:"templete 3",content:"hello, i am templete 3",subject:"greeting,i am templete 3"},
    {key:3,value:"templete 4",content:"hello, I am templete 4",subject:"greeting,i am templete 4"},
    {key:4,value:"templete 5",content:"hello, I am templete 5",subject:"greeting,i am templete 5"}
  ]
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  emailIdList: Email[] = [];

  isInvalidEmail: boolean;
  SelectedVal;
  emailform:FormGroup;

  options: string[] = ['00.00', '00.30', '01.00', '01.30','02.00', '02.30',
  , '03.00', '03.30','04.00', '04.30','05.00', '05.30', '06.00', '06.30', '07.00', '07.30',
  , '08.00', '08.30','09.00', '09.30','10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  , '13.00', '13.30','14.00', '14.30','15.00', '15.30', '16.00', '16.30', '17.00', '17.30',
  , '18.00', '18.30','19.00', '19.30','20.00', '20.30', '21.00', '21.30', '22.00', '22.30',
  , '23.00', '23.30'];
  options1: string[] = ['00.00', '00.30', '01.00', '01.30','02.00', '02.30',
  , '03.00', '03.30','04.00', '04.30','05.00', '05.30', '06.00', '06.30', '07.00', '07.30',
  , '08.00', '08.30','09.00', '09.30','10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  , '13.00', '13.30','14.00', '14.30','15.00', '15.30', '16.00', '16.30', '17.00', '17.30',
  , '18.00', '18.30','19.00', '19.30','20.00', '20.30', '21.00', '21.30', '22.00', '22.30',
  , '23.00', '23.30'];
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
today=new Date()
  constructor() { }

  ngOnInit() {
  this.emailform=new FormGroup({
  selectedTemp:new FormControl(''),
  textarea:new FormControl(''),
  renameTemplate:new FormControl(''),
  subject:new FormControl(''),
  fromtime:new FormControl(),
  totime:new FormControl(),
  fromDate: new FormControl(),
  toDate: new FormControl()
})
this.filteredOptions = this.emailform.get('fromtime').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.filteredOptions1 = this.emailform.get('totime').valueChanges
      .pipe(
        startWith(''),
        map(val => this._filter1(val))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(val: string): string[] {
    const filterVal = val.toLowerCase();
    return this.options1.filter(opt => opt.toLowerCase().includes(filterVal));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (!RegExp('^\\w+([.-]?\\w+)@\\w+([.-]?\\w+)(\\.\\w{2,10})+$').test(value) && value != '') {
        this.isInvalidEmail = true;
        return;
    }else {
      this.isInvalidEmail = false;
    }
    if ((value || '').trim()) {
      this.emailIdList.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }
  
  remove(Email: Email): void {
    const index = this.emailIdList.indexOf(Email);
    if (index >= 0) {
      this.emailIdList.splice(index, 1);
    }
  }
  saveTemplete(){
    this.showinput=true
    this.chooseTemp=false
    this.editTempinp=false
  }

  cancel(){
    this.showinput=false
    this.chooseTemp=false
    this.editTempinp=false
    this.schedule=false
    this.emailform.patchValue({selectedTemp:''});
    this.emailform.patchValue({textarea:''})
    this.emailform.patchValue({subject:''})
  }
  chooseTemplete(){
    this.chooseTemp=true
    this.showinput=false
    this.editTempinp=false
  }
  editTemplete(){
    this.editTempinp=true;
    this.emailform.patchValue({renameTemplate:this.SelectedVal[0]['value']})
  
  }
  onChange(event){
    this.SelectedVal=this.TemplateList.filter(obj=>obj.key==event.target.value)
    this.emailform.patchValue({textarea:this.SelectedVal[0]['content']});
    this.emailform.patchValue({subject:this.SelectedVal[0]['subject']});
    this.emailform.patchValue({renameTemplate:this.SelectedVal[0]['value']});
  }


}
