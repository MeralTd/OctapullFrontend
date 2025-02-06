import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppLoginComponent {
  loginForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    // this.router.navigate(['/']);

    if (this.loginForm.valid) {
      this.http.post('http://localhost:5148/api/Auth/Login', this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error ', error);
        }
      );
    }
  }

  // onLogin(): void {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: (response) => {
  //       this.authService.setToken(response.token);
  //       this.router.navigate(['/dashboard']); // Redirect to dashboard on successful login
  //     },
  //     error: (err) => {
  //       console.error('Login failed', err);
  //     }
  //   });
  // }


}



export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value); // Form verilerini backend'e gönderme
    }
  }
}
