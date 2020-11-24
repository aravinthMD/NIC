import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit, OnChanges {


  @Input() data : {
    title : string;
    request: any
  };
  @Input() showModal: boolean;

  @Output('okay') okay = new EventEmitter();

  @Output('cancel') cancel = new EventEmitter();

  emailForm: FormGroup

  constructor() { }

  ngOnInit() {

  }

  initForm() {


    this.emailForm = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      subject: new FormControl(''),
      compose: new FormControl('')
    })

  }

  ngOnChanges() {

    this.initForm()

    if(this.emailForm) {

      this.emailForm.patchValue({
        from: this.data.request.from || '',
        to: this.data.request.to || '',
        subject: this.data.request.subject || '',
      })

    }
    
  }


  send() {
      this.okay.emit()
  }

  close() {
    this.cancel.emit()
  }

}
