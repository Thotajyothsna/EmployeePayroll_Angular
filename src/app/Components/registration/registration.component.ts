import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee/employee.service';
import { response } from 'express';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class registrationcompoment implements OnInit {
  employeeForm!: FormGroup;
  profileImages = [
    { value: 'male1', url: './assets/male1.png' },
    { value: 'female1', url: './assets/female1.png' }
  ];

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
 months = [
  { value: 1, name: 'January' },
  { value: 2, name: 'February' },
  { value: 3, name: 'March' },
  { value: 4, name: 'April' },
  { value: 5, name: 'May' },
  { value: 6, name: 'June' },
  { value: 7, name: 'July' },
  { value: 8, name: 'August' },
  { value: 9, name: 'September' },
  { value: 10, name: 'October' },
  { value: 11, name: 'November' },
  { value: 12, name: 'December' }
];

  years: number[] = Array.from({ length: 50 }, (_, i) => 2025 - i);

  constructor(private fb: FormBuilder
    ,private emp:EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      profile: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit(): void {
     console.log(this.employeeForm.value);
     debugger;
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
this.emp.addEmp(this.employeeForm.value).subscribe((response:any)=>{
  console.log(response);
})
    }
  }
}