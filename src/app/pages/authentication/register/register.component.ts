import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'appregister',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class AppRegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),  // Telefon numarası için doğrulama
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      //profilUrl: new FormControl('')
    });
  }

    onSubmit() {
      if (this.registerForm.valid) {
        this.authService.register(this.registerForm.value).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/authentication/login']);
          },
          (error) => {
            console.error('Error ', error);
          }
        );
      }
    }

    onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.registerForm.patchValue({ profilResmi: file });
      }
    }
}
