import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
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

  createUser() {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this._authService
      .createUser(name, email, password)
      .then((credentials) => this.router.navigate(['/']))
      .catch((err) => console.error(err));
  }
}
