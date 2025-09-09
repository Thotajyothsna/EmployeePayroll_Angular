import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from '../../Services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class registrationcompoment implements OnInit {
  employeeForm!: FormGroup;
  employeeIdToEdit: number | null = null; // store ID if editing

  profileImages = [
    { value: 'Female1', url: 'assets/Images/Female1.jpeg' },
    { value: 'Female2', url: 'assets/Images/Female2.png' },
    { value: 'Male1',   url: 'assets/Images/Male1.png' },
    { value: 'Male2',   url: 'assets/Images/Male2.jpeg' }
  ];

  departments = ['HR', 'Sales', 'Finance', 'Engineer'];
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' },   { value: 4, name: 'April' },
    { value: 5, name: 'May' },     { value: 6, name: 'June' },
    { value: 7, name: 'July' },    { value: 8, name: 'August' },
    { value: 9, name: 'September'},{ value: 10, name: 'October' },
    { value: 11, name: 'November'},{ value: 12, name: 'December' }
  ];
  years: number[] = Array.from({ length: 50 }, (_, i) => 2025 - i);

  constructor(
    private fb: FormBuilder,
    private emp: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      profile: ['', Validators.required],
      gender: ['', Validators.required],
      department: [<string[]>[], [this.atLeastOneSelected]],
      salary: [null, [Validators.required, Validators.min(0)]],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      note: ['']
    });

this.route.queryParams.subscribe(params => {
  const id = params['id'];
  if (id) {
    this.employeeIdToEdit = +id;
    const empData = history.state.employee; // ✅ available now
    if (empData) {
      this.employeeForm.patchValue({
        ...empData,
        // 👇 convert comma-separated string → array
        department: empData.department 
          ? empData.department.split(',').map((d: string) => d.trim()) 
          : []
      });
    }
  }
});

    // If dashboard passes an ID, we patch the form directly
    // this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   if (id) {
    //     console.log('id:',id);
    //     this.employeeIdToEdit = +id;
    //     const empData = history.state.employee; // get employee object passed via navigation
    //     console.log('empData:',empData);
    //     if (empData) {
    //       this.employeeForm.patchValue({
    //         name: empData.name,
    //         profile: empData.profile,
    //         gender: empData.gender,
    //         department: empData.department,
    //         salary: empData.salary,
    //         day: empData.day,
    //         month: empData.month,
    //         year: empData.year,
    //         note: empData.note
    //       });
    //     }
    //   }
    // });
  }

  private atLeastOneSelected(control: AbstractControl) {
    const arr = control.value as string[] | null;
    return arr && arr.length > 0 ? null : { required: true };
  }

  onToggleDepartment(dept: string, checked: boolean) {
    const selected = new Set(this.employeeForm.value.department as string[]);
    if (checked) { selected.add(dept); } else { selected.delete(dept); }
    this.employeeForm.get('department')?.setValue([...selected]);
    this.employeeForm.get('department')?.markAsTouched();
  }

  isDeptChecked(dept: string): boolean {
    const selected = this.employeeForm.value.department as string[];
    return Array.isArray(selected) && selected.includes(dept);
  }

  onSubmit(): void {
    if (!this.employeeForm.valid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = this.employeeForm.value;

    if (this.employeeIdToEdit) {
      payload.employeeid = this.employeeIdToEdit;
      this.emp.updateEmp(payload).subscribe({
        next: (res: any) => {
          console.log('Updated successfully', res);
          this.router.navigate(['/dashboard']);
        },
        error: err => console.error('Update failed', err)
      });
    } else {
      this.emp.addEmp(payload).subscribe({
        next: (res: any) => {
          console.log('Saved', res);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error('Save failed', err)
      });
    }
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EmployeeService } from '../../Services/employee/employee.service';
// import { response } from 'express';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.css'
// })
// export class registrationcompoment implements OnInit {
//   employeeForm!: FormGroup;
//   profileImages = [
//     { value: 'Female1', url: '.\assets\Images\Female1.jpeg' },
//     { value: 'Female2', url: '.\assets\Images\Female2.png' },
//     {value:'Male1',url:'.\assets\Images\Male1.png'},
//     {value:'Male2',url:'.\assets\Images\Male2.jpeg'}
//   ];

//   days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
//  months = [
//   { value: 1, name: 'January' },
//   { value: 2, name: 'February' },
//   { value: 3, name: 'March' },
//   { value: 4, name: 'April' },
//   { value: 5, name: 'May' },
//   { value: 6, name: 'June' },
//   { value: 7, name: 'July' },
//   { value: 8, name: 'August' },
//   { value: 9, name: 'September' },
//   { value: 10, name: 'October' },
//   { value: 11, name: 'November' },
//   { value: 12, name: 'December' }
// ];

//   years: number[] = Array.from({ length: 50 }, (_, i) => 2025 - i);

//   constructor(private fb: FormBuilder
//     ,private emp:EmployeeService
//   ) {}

//   ngOnInit(): void {
//     this.employeeForm = this.fb.group({
//       name: ['', Validators.required],
//       profile: ['', Validators.required],
//       gender: ['', Validators.required],
//       department: ['', Validators.required],
//       salary: ['', Validators.required],
//       day: ['', Validators.required],
//       month: ['', Validators.required],
//       year: ['', Validators.required],
//       note: ['']
//     });
//   }

//   onSubmit(): void {
//      console.log(this.employeeForm.value);
//      debugger;
//     if (this.employeeForm.valid) {
//       console.log(this.employeeForm.value);
// this.emp.addEmp(this.employeeForm.value).subscribe((response:any)=>{
//   console.log(response);
// })
//     }
//   }
// }