import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../Services/employee/employee.service';
import { Router } from '@angular/router';
import { response } from 'express';
export interface Employee {
  employeeid: number;
  name: string;
  profile:string;
  salary: number;
  gender: string;
  department: string;
  day: number;   // from backend
  month: number; // from backend
  year: number;  // from backend
  startDate?: string; // derived (for table display)
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'employeeid',
    'name',
    'gender',
    'salary',
    'department',
    'startDate',
    'actions'
  ];

  employees: Employee[] = [];
dataSource = new MatTableDataSource<Employee>();

// Map profile values to actual image paths
profileMap: { [key: string]: string } = {
  Female1: 'assets/Images/Female1.jpeg',
  Female2: 'assets/Images/Female2.png',
  Male1: 'assets/Images/Male1.png',
  Male2: 'assets/Images/Male2.jpeg'
};
constructor(private employeeService: EmployeeService,private router:Router) {}

ngOnInit(): void {
  this.loadEmployees();
}

loadEmployees(): void {
  this.employeeService.getEmployees().subscribe((response: any) => {
    this.employees = response.data.map((emp: any) => ({
      ...emp,
      startDate: this.formatDate(emp.day, emp.month, emp.year)
    }));
    this.dataSource.data = this.employees;
  });
}

// Map profile value → actual image URL
getProfileImage(profile: string): string {
  return this.profileMap[profile] || 'assets/Images/default.png';
}

private formatDate(day: number, month: number, year: number): string {
  if (!day || !month || !year) return '-';
  const d = String(day).padStart(2, '0');
  const m = String(month).padStart(2, '0');
  return `${d}-${m}-${year}`;
}
  deleteEmployee(emp: Employee): void {
  if (confirm(`Are you sure you want to delete ${emp.name}?`)) {
    this.employeeService.deleteEmp(emp.employeeid).subscribe({
      next: (res: any) => {
        alert('Employee deleted successfully');
        // Remove from table
        this.employees = this.employees.filter(e => e.employeeid !== emp.employeeid);
        this.dataSource.data = this.employees;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete employee');
      }
    });
  }
}
//   editEmployee(emp: Employee): void {
//   this.router.navigate(['/register', emp.employeeid]);  
// }
editEmployee(emp: Employee): void {
  this.router.navigate(['/register'], { 
    queryParams: { id: emp.employeeid }, 
    state: { employee: emp } 
  });
}
  addEmployee(): void {
    this.router.navigate(['/register']);  // change path as per your route config
  }
}