import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [`
    button, [type='button'] {
      background-color: rgb(26 86 219);
    }
  `]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  formSubmitted: boolean = false;
  authError: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private localStorage: LocalstorageService, private router: Router) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    const loginData = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value
    }

    if (this.loginFormGroup.invalid) return;

    this.authService.login(loginData.email, loginData.password).subscribe((user) => {
      this.authError = false;

      this.localStorage.setToken(user);

      this.router.navigate(['/']);
    }, () => {
      this.authError = true;
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
