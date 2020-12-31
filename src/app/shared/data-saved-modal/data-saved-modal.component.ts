import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-saved-modal',
  templateUrl: './data-saved-modal.component.html',
  styleUrls: ['./data-saved-modal.component.scss']
})
export class DataSavedModalComponent implements OnInit {


  @Input() showSavedModal: boolean;

  @Input() data: {
    title: string;
    message: string
  }

  @Output('yes') yes = new EventEmitter() 
  @Output('cancel') cancel = new EventEmitter() 
  constructor() { }

  ngOnInit() {
  }
  onSaveYes() {
    this.yes.emit()
  }

  onSaveCancel() {

    this.cancel.emit()
  }

}
