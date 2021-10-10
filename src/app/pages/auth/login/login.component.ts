import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  })

  constructor(
    private authSvc: AuthService, 
    private fb:FormBuilder, 
    private router:Router
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin():void {
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe( res => {
        if (res) {
          this.router.navigate([''])
        }
      })
    );
  }
}
