import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  emailIdList: Email[] = [];

  constructor() { }

  ngOnInit() {
  }
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

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

}
