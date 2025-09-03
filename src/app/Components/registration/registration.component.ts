import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  employeeForm!: FormGroup;

  profileImages = [
    { value: 'female1', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUqSojztqZnRXSFvvlm_sX78WOWk7w4ZNxQ&s' },
    { value: 'female2', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBfEFTbKthYpMnQFu8yDe6NGW_LZHoH01YYA&s' },
    //{ value: 'male1', url: 'data:image/jpeg;base64,...' },  // keep your base64
    //{ value: 'male2', url: 'data:image/jpeg;base64,...' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      profile: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      startDate: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      alert('Employee Registered Successfully!');
    }
          console.log(this.employeeForm);

  }
}