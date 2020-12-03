import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LabelsService } from '@services/labels.service';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss']
})
export class LovsComponent implements OnInit {
 LovsControl: FormGroup;
  selectedValue:any[];
  labels: any;
  showModal:boolean=false;
  propertyFlag: boolean = false;
  isDisabledInp: boolean=true;
  isDisabled:boolean=true
  isDisabledVal:boolean=true
  isDisabledValBtn:boolean=true
  hideButton:boolean = true;
  showButton: boolean = false;
  enablebtn:boolean=true
  selectedLovs;
  labelNameKey:string='Key';
  labelNameVal:string='Value';
  labelNameDrp
  lovsList1:any[]=[];
  btnName:string=''
  lovsList:any[] = [
    { key: 0, value: 'Deparment List' },
    { key: 1, value: 'PO Status' },
    { key: 2, value: 'PI Status' },
    { key: 3, value: 'Payment Status' },
    { key: 4, value: 'PI Received In' }]

  deparmentList: any[] = [
    { value: 'Department of Sainik Welfare', key: 0 },
    { value: 'Minstry of minority affairs', key: 1 },
    { value: 'Vishakhapatnam port Trust', key: 2 },
    { value: 'minstry of trible affairs', key: 3 },
    { value: 'Bureasu of Naviks.Mumbai', key: 4 }];
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
  
     
  constructor(private labelsService: LabelsService) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
    this.LovsControl=new FormGroup({
      lovControlKey:new FormControl(null),
      lovControlVal:new FormControl(null),
      labelNameDrp:new FormControl({value:'',disabled:true}),
      LOVsList:new FormControl('')
       })
  }
  onChangeLov(event){
    this.selectedLovs = event.target.value; 
    this.isDisabledInp=true;
    this.enablebtn=false
    this.LovsControl.get('labelNameDrp').enable();
if(this.selectedLovs=='0'){
  this.labelNameKey=this.labels['departmentKey']
  this.labelNameVal=this.labels['departmentVal']
  this.labelNameDrp=this.labels['department']
  this.lovsList1=this.deparmentList
}else if(this.selectedLovs=='1'){
  this.labelNameKey=this.labels['poStatusKey']
  this.labelNameVal=this.labels['poStatusVal']
  this.labelNameDrp=this.labels['poStatus']
  this.lovsList1=this.poStatus
  }else if(this.selectedLovs=='2'){
    this.labelNameKey=this.labels['piStatusKey']
    this.labelNameVal=this.labels['piStatusVal']
    this.labelNameDrp=this.labels['piStatus']
    this.lovsList1=this.piStatus
    }else if(this.selectedLovs=='3'){
      this.labelNameKey=this.labels['paymentStatusKey']
      this.labelNameVal=this.labels['paymentStatusVal']
      this.labelNameDrp=this.labels['paymentStatus']
      this.lovsList1=this.paymentStatus
      }else if(this.selectedLovs=='4'){
        this.labelNameKey=this.labels['piReceivedKey']
        this.labelNameVal=this.labels['piReceivedVal']
        this.labelNameDrp=this.labels['piReceivedIn']
        this.lovsList1=this.piReceivedIn
        }
}

  onChangeDept(event,data){
    const value = event.target.value;
    const selectedVal=data.filter(obj=>obj.key==value);
    this.LovsControl.get('lovControlKey').patchValue(selectedVal[0].key)
    this.LovsControl.get('lovControlVal').patchValue(selectedVal[0].value)
    this.isDisabled=false
  }
addField(){
  this.isDisabledValBtn=false;
  this.LovsControl.patchValue({labelNameDrp : '',lovControlVal:'',lovControlKey:''
  })

  this.LovsControl.get('labelNameDrp').disable();
  this.LovsControl.get('labelNameDrp').updateValueAndValidity()
  this.hideButton=false
  this.btnName="Add"
}
editField(){
  this.LovsControl.get('labelNameDrp').enable();
  this.hideButton=false
  this.btnName="Update"
  this.isDisabledValBtn=false
 
}
deleteField(){
  this.showModal = true;
}
close(){
  this.hideButton=true
  this.isDisabledValBtn=true
  this.LovsControl.patchValue({
    labelNameDrp : '',
    lovControlVal:'',
    lovControlKey:''
  })
  this.LovsControl.get('labelNameDrp').enable();
}
onCancel() {
  this.showModal = false;
}
updateField() {

}
click(evn:string){
  if(evn=='Add'){}
  else if(evn=='Update'){}
  
}
} 
