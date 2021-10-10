import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private subscription: Subscription = new Subscription;

  registerForm = this.fb.group({
    username: [''],
    mail: [''],
    password: [''],
    role: ['admin']
  })

  constructor(private fb:FormBuilder,
    private regSvc: RegisterService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onRegister():void {
    const formValue = this.registerForm.value;
    this.subscription.add(
      this.regSvc.register(formValue).subscribe( res => {
        if (res) {
          this.router.navigate(['/login'])
        }
      })
    )
  }

}
