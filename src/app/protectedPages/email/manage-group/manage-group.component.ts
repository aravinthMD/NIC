import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
export interface AddUser {
  email: string;
}
@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.scss']
})
export class ManageGroupComponent implements OnInit {
  groupList: any[] = [
    { key: 0, value: 'Group 1',count:'20'},
    { key: 1, value: 'Group 2' ,count:'34'},
    { key: 2, value: 'Group 3' ,count:'51'},
    { key: 3, value: 'Group 4' ,count:'40'},
    { key: 4, value: 'Group 5' ,count:'17'}]
  group1: any[] = [
    { key: 0, value: 'Group 1-User 1' },
    { key: 1, value: 'Group 1-User 2' },
    { key: 2, value: 'Group 1-User 3' },
    { key: 3, value: 'Group 1-User 4' },
    { key: 4, value: 'Group 1-User 5' }]
  group2: any[] = [
    { key: 0, value: 'Group 2-User 1' },
    { key: 1, value: 'Group 2-User 2' },
    { key: 2, value: 'Group 2-User 3' },
    { key: 3, value: 'Group 2-User 4' },
    { key: 4, value: 'Group 2-User 5' }]

  isDisabledInp: boolean = false;
  filteredOptions: Observable<any[]>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  groupControl: FormGroup;
  userList: AddUser[] = [];
  show:boolean=false;
  hideBtn:boolean=true;
  disbaledBtn=false;
  dataSource = new MatTableDataSource<any>(this.groupList);
  constructor() { }
  displayedColumns : string[] = ['s.no','groupName','userCount','action','delete']
  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  ngOnInit() {
    this.groupControl = new FormGroup({
      groupName: new FormControl(''),
      myControl: new FormControl(),
      searchData:new FormControl()
    })
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.userList.push({ email: value.trim() });
    }
    if (input) {
      input.value = '';
      if (value.includes(',')) {
        const index = this.userList.findIndex(obj => obj.email == value)
        const data = value.split(',')
        for (let i in data) {
          this.userList.push({ email: data[i] })
        }
        this.userList.splice(index, 1);
      }
    }
  }
  remove(user: AddUser): void {
    const index = this.userList.indexOf(user);
    if (index >= 0) {
      this.userList.splice(index, 1);
    }
  }
  onSubmit() {
    this.groupControl.value.myControl = this.userList
    console.log('myval',this.groupControl.value)
    this.disbaledBtn=false
    this.groupControl.reset()
  }
  Creategroup(){
    this.show=true
    this.disbaledBtn=true
  }
  close(){
    this.show=false
    this.disbaledBtn=false
    this.hideBtn=true
    this.userList=[];
    this.groupControl.reset();
  }
  OnDelete(val){

  }
  OnView(val){
    const data=val
    this.show=true
    this.hideBtn=false
    this.groupControl.patchValue({groupName:data.value})
    for(let i in this.group1){
       this.userList.push({email:this.group1[i].value})
  }
  }

}

