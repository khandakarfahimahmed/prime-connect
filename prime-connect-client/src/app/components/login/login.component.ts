import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators,NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApiService } from '../../services/login-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder,private api:LoginApiService,private router:Router, private message: NzMessageService) {  }

ngOnInit(): void {
  this.loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: [false]
  });

  const savedEmail = localStorage.getItem('email');
  const savedPassword = localStorage.getItem('password');
  if (savedEmail && savedPassword) {
    this.loginForm.patchValue({
      email: savedEmail,
      password: savedPassword,
      rememberMe: true
    });
  }
}

onSubmit() {
  const { email, password, rememberMe } = this.loginForm.value;
  console.log(email);
  if (email && password)
    this.api.login(email!, password!).subscribe({
      next: data => {
        if(data.token){
          this.createPopupMessage('success', "Login successfully");
        }
        else {
          this.createPopupMessage('error', "Please enter valid credentials");
        }
        this.loginForm.reset();
        if(data.token && data.admin == "SA"){
          this.router.navigate(['admin-dashboard']);
        }
        if(data.token && data.admin == "DA"){
          this.router.navigate(['teamroles']);
        }
        if(data.token && (data.admin == "none" || data.admin == "RA" || data.admin == "TA")){
          console.log(data.id,data.role);
          this.router.navigate(['employee-dashboard',data.id,data.role]);
        }
      },
      error: err => {
        console.error(err);
      }
    })

    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }

  createPopupMessage( type: string, message: string): void {
    this.message.create(type, message, { nzDuration: 5000, nzPauseOnHover: true });
  }
}
