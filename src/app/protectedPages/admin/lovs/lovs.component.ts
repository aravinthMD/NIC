import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { AdminService } from '@services/admin.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-lovs',
  templateUrl: './lovs.component.html',
  styleUrls: ['./lovs.component.scss']
})
export class LovsComponent implements OnInit {
    labels: any;
    lovsList = [];
    showModal: boolean;
    initialLov = [];
    searchValue: string;
    @ViewChild (MatPaginator , {static: false}) paginator: MatPaginator;
    isLovItemClicked = false;
    selectedLovItem: {
      key?: string;
      value?: string;
    };
    lovValueSearch: string;
    lovItemsForm: FormGroup;
    selectedLovItemIndex = ['NA'];
    selectedIndexForDelete: number;
    tableLength: number;
    totalLovItems = [];
    searchLovItemsValue = [];
    isAddNewKey: boolean;
    patternError: string;
    selectedIndex: number;

  constructor(
      private labelsService: LabelsService,
      private toasterService: ToasterService,
      private adminService: AdminService ) { }

  ngOnInit() {
    this.initLovForm();
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });

    this.getLovList();
  }

  initLovForm() {
      this.lovItemsForm = new FormGroup({
        items: new FormArray([]),
        addNewValue: new FormControl(),
      });
  }

  addNewItems() {
    this.isAddNewKey = true;
    // const formArray = this.lovItemsForm.get('items') as FormArray;
    // formArray.push(this.addLovFormItems());
  }

  addLovFormItems(item?: any) {
    console.log('selectedLovItemIndex', this.selectedLovItemIndex);
    const key = item ? item.key : 'NA';
    const value = item ? item.value : '';
    return new FormGroup({
      key: new FormControl(key),
      value: new FormControl({value, disabled: !!item})
    });
  }

  checkIsIdAdded(index: number) {
    const formArray = this.lovItemsForm.get('items') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    const key = formGroup.get('key').value;
    return this.selectedLovItemIndex.some((value) => value === key);
  }

  onLovValueSearch(event) {
    const searchValue = String(event.target.value || '').toLowerCase();

    if (!searchValue) {
      (this.lovItemsForm.get('items') as FormArray).clear();
      return this.setValueForGrid(this.totalLovItems);
    }

    (this.lovItemsForm.get('items') as FormArray).clear();

    this.searchLovItemsValue = this.totalLovItems.filter((item) => {
        return String(item.value).toLowerCase().includes(searchValue);
    });
    this.setValueForGrid(this.searchLovItemsValue);
    console.log('searchValue', searchValue);
  }

  onLovValueClear() {
    this.lovValueSearch = '';
    (this.lovItemsForm.get('items') as FormArray).clear();
    this.setValueForGrid(this.totalLovItems);
  }

  onLovItemEdit(index: number) {
    this.isAddNewKey = false;
    const formArray = this.lovItemsForm.get('items') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    formGroup.get('value').enable();
    this.selectedLovItemIndex.push(formGroup.get('key').value);
  }

  onLovItemSave(index: number) {
    const listId = this.selectedLovItem.key;

    if (index === -1) {
        const newValue = this.lovItemsForm.get('addNewValue').value;
        if (!newValue) {
          return this.toasterService.showError('Please enter the value', '');
        }
        if (this.patternError) {
          return this.toasterService.showError(this.patternError, '');
        }
        const data = {
            listId,
            value: newValue
        };
        this.addNewItemToLov(data);
        return;
    }
    if (this.selectedIndex === index && this.patternError) {
      return this.toasterService.showError(this.patternError, '');
    }
    const formArray = this.lovItemsForm.get('items') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    const value = formGroup.get('value').value;
    if (!value) {
      return this.toasterService.showError('Please enter the value', '');
    }
    const key = formGroup.get('key').value;
    formGroup.get('value').disable();
    const requestData: any = {
      listId,
      key,
      value,
    };
    
    this.adminService.updateLov(requestData).subscribe((response: any) => {
      const error = response.Error;
      const errorMessage = response.ErrorMessage;
      if (error !== '0') {
        return this.toasterService.showError(errorMessage, '');
      }
      this.toasterService.showSuccess('Information Updated Successfully', '');
      console.log('update data', response);
      this.selectedLovItemIndex = this.selectedLovItemIndex.filter((lovItem) => {
        return lovItem !== key;
      });

    });
  }

  addNewItemToLov(data) {
    console.log('addNewItemToLov', data);
    // const formArray = this.lovItemsForm.get('items') as FormArray;
    // const formGroup = formArray.at(data.index) as FormGroup;
    // const insertObj = {
    //   listId: data.listId,
    //   value: data.value,
    // };

    this.adminService.insertLov(data).subscribe((response: any) => {
      const error = response.Error;
      const errorMessage = response.ErrorMessage;

      if (error !== '0') {
        return this.toasterService.showError(errorMessage, '');
      }

      this.lovItemsForm.get('addNewValue').setValue('');
      this.isAddNewKey = false;

      console.log('add data', response);
      this.toasterService.showSuccess('Added Successfully', '');
      this.getSubMenuList(this.selectedLovItem.key);

    });
  }



  onLovItemClick(item) {
    const key = item.key;
    this.selectedLovItem  = item;
    this.isLovItemClicked = true;
    this.getSubMenuList(item.key);
  }

  onValueChange(event, index?: number) {
    if (index !== undefined ) {
      this.selectedIndex = index;
    }
    const value = event.target.value;
    console.log('value', value);
    const key = this.selectedLovItem.key;
    let regex: RegExp;
    let msg: string;
    if (key === '8') {
       regex =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
       msg = 'Please enter valid mail id';
    } else if (key  === '6' || key === '7') {
      regex = /[+]{0,1}[0-9]{1,10}$/;
      msg = 'Please enter valid code';
    }

    if (!regex) {
       return;
    }

    if (!regex.test(value)) {
      this.patternError = msg;
    } else {
      this.patternError = null;
    }
  }

 

  getSubMenuList(key) {
    (this.lovItemsForm.get('items') as FormArray).clear();
    this.adminService.getLovSubMenuList(key)
    .subscribe((value: any) => {
       console.log('lov response', value);
       const error = value.Error;
       const errorMessage = value.ErrorMessage;
       if (error !== '0') {
         return this.toasterService.showError(errorMessage, '');
       }
       const processVariables = value.ProcessVariables;
       const lovItem = processVariables.Lovitems || [];
       this.totalLovItems = lovItem;
       this.setValueForGrid(this.totalLovItems);
    });
  }

  setValueForGrid(totalItems) {
    if (totalItems.length > 10) {
      this.addLovItems(totalItems.slice(0, 11));
    } else {
     this.addLovItems(totalItems);
    }
    this.tableLength = totalItems.length;
  }

  addLovItems(items: any[]) {
    if (!items) {
      return;
    }
    const formArray = this.lovItemsForm.get('items') as FormArray;
    items.forEach((value) => {
       formArray.push(this.addLovFormItems(value));
    });
    console.log('formArray', formArray);
  }

  onLovBack() {
    this.isAddNewKey = false;
    this.isLovItemClicked = false;
    this.selectedLovItemIndex = ['NA'];
    (this.lovItemsForm.get('items') as FormArray).clear();
  }

  onPageChange(event) {
    console.log('on page change', event);
    const pageIndex = event.pageIndex;
    const start = pageIndex === 0 ? 0 : (pageIndex * 10) + 1;
    const end = (start + 10) + 1;
    let items  = [];
    if (this.lovValueSearch) {
       items = this.searchLovItemsValue.slice(start, end);
    } else {
      items = this.totalLovItems.slice(start, end);
    }
    (this.lovItemsForm.get('items') as FormArray).clear();
    this.addLovItems(items);
  }

  getLovList() {

    this.adminService.fetchLovsList().subscribe((response: any) => {
      console.log('Lov List', response);
      const processVariables = response.ProcessVariables;
      this.initialLov = processVariables.LOVList;
      this.lovsList = [...this.initialLov];
    });


  }

  clearSearch() {
    this.searchValue = '';
    this.lovsList = [...this.initialLov];
  }

  onLovSearch(event) {
    const searchValue = String(event.target.value || '').toLowerCase();
    console.log('event', searchValue);
    if (!searchValue) {
      return this.lovsList = [...this.initialLov];
    }
    if (searchValue) {
      this.lovsList = this.initialLov.filter((value) => {
        return String(value.value || '').toLowerCase().includes(searchValue);
      });
    }
  }

openDeleteModal(index: number) {
  if (index === -1) {
    this.lovItemsForm.get('addNewValue').setValue('');
    this.isAddNewKey = false;
    this.patternError = null;
    return;
  }
  const formArray = this.lovItemsForm.get('items') as FormArray;
  const key = formArray.at(index).get('key').value;
  if (key === 'NA') {
     return formArray.removeAt(index);
  }
  this.selectedIndexForDelete = index;
  this.showModal = true;
}


deleteField() {
  this.showModal = true;
}

delete() {
  const formArray = this.lovItemsForm.get('items') as FormArray;
  const key = formArray.at(this.selectedIndexForDelete).get('key').value;
  this.showModal = false;
  const deleteObj = {
    key,
    listId: this.selectedLovItem.key,
    option: 'delete',
  };
  console.log(deleteObj);

  this.adminService.deleteLov(deleteObj).subscribe((response: any) => {
    const error = response.Error;
    const errorMessage = response.ErrorMessage;
    if (error !== '0') {
      return this.toasterService.showError(errorMessage, '');
    }
    console.log('delete data', response);
    this.toasterService.showSuccess('Deleted Successfully', '');
    formArray.removeAt(this.selectedIndexForDelete);
  });


}

onCancel() {
  this.showModal = false;
}
}
