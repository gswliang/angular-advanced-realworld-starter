import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoginInfo } from '../interfaces/login-info';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user: UserLoginInfo;

 loginForm = new FormGroup({
   email: this.formBuilder.control("demo@miniasp.com",{
     updateOn:'change',
     validators:[
       Validators.required,
       Validators.email
     ]
   }),
   password: this.formBuilder.control('123456', {
     updateOn: 'change',
     validators:[
       Validators.required,
       Validators.minLength(4)
     ]
   })
 })
 redirectUrl: string ='';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
    queryParamMap=>  this.redirectUrl = queryParamMap.get('redirect'))
  }

  onSubmit(){
    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginService.login(this.user).pipe(
      catchError((error: HttpErrorResponse) =>{
        console.log(error.message)
        return of({user:{token:''}});
      }),

      filter(result=> !!result.user.token)
      ).subscribe(result =>
       {
        localStorage.setItem('token', result.user?.token);
        this.router.navigateByUrl(this.redirectUrl ?? '/')
       }
      )
  }

  checkStatus(name:string){
    return this.loginForm.get(name) as FormControl
  }
}
