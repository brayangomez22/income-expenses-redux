import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get nameNoValid() {
    return this.registerForm.get('name')?.valid;
  }

  get emailNoValid() {
    return this.registerForm.get('email')?.valid;
  }

  get passNoValid() {
    return this.registerForm.get('password')?.valid;
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {}
}
