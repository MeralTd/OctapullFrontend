import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class AppLoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, ) { }

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
      this.authService.login(this.loginForm.value).subscribe(
        {
          next: (response) => {
            this.authService.setToken(response.data.token);
            this.authService.setUserName(response.data.refreshToken.user.firstName + ' '+ response.data.refreshToken.user.lastName);
            this.router.navigate(['/meetings']);
          },
          error: (err) => {
            console.error('Login failed', err);
          }
        }
      );
    }

  }

}
