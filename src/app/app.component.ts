import { EmployeeModel } from './model/Employee';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_18_crud';

  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList:EmployeeModel[]=[]


  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.createForm();
    debugger
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData
    }

  }
  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name, [Validators.required]),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId),
      contactNo: new FormControl(this.employeeObj.contactNo),
      address: new FormControl(this.employeeObj.address),
      pinCode: new FormControl(this.employeeObj.pinCode, [Validators.required, Validators.minLength(6)]),

    })
  }

  onReset(){
    this.employeeObj = new EmployeeModel()
    this.createForm()
  }

  onSave(){
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value)
    }else {
      this.employeeList.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.onReset()
  }

  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createForm()
  }

  onUpdate(){
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value
      record.name = this.employeeForm.controls['name'].value
      record.contactNo = this.employeeForm.controls['contactNo'].value
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.onReset()
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete this employee");

    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1)
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));

  }
}
