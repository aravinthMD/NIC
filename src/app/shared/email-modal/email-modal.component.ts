import { Component, OnInit, Input, Output,EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from '@services/admin.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss']
})
export class EmailModalComponent implements OnInit {


  @Input('data') title : string = ''

  fromMail  : string;
  toMail : string;
  ccMail  : string;

  subject : string;

  composeMsg   :string;


  @Input() showModal: boolean;

  @Output('okay') okay = new EventEmitter();

  @Output('cancel') cancel = new EventEmitter();

  emailForm: FormGroup

  constructor(private adminService : AdminService,private toasterService : ToasterService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    const userName = localStorage.getItem('userName');
    this.emailForm = new FormGroup({
      fromAddress: new FormControl(userName),
      toAddress: new FormControl(''),
      cc: new FormControl(''),
      subject: new FormControl(''),
      message1: new FormControl('')
    })

  }

  // ngOnChanges() {

  //   this.initForm()
  // }


  sendEmail() {

    const formValue = this.emailForm.value;

    const Data =  {
          ... formValue,
    }

    this.adminService.sendEmailRemainder(Data).subscribe(
      (response : any) =>{
        const { 
          ProcessVariables  : { error : {
            code,
            message
          }}
        } = response;

        if(code === '0'){
            this.toasterService.showSuccess('Data Updated Successfully','');
            this.okay.emit()
        }else {
            this.toasterService.showError(message,'');
        }

    },(error) => {
        this.toasterService.showError('Data Update Failed','');
    })

  }

  close() {
    this.cancel.emit()
  }

}
