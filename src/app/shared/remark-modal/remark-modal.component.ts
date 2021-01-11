import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-remark-modal',
  templateUrl: './remark-modal.component.html',
  styleUrls: ['./remark-modal.component.scss']
})
export class RemarkModalComponent implements OnInit {

  @Input() showRemarkModal: boolean;
 
  @Output() onOkay = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRemarkOK() {

    this.onOkay.emit();
  }

}
