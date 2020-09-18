import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private fb: FormBuilder , private http: HttpClient) { }
    
   readonly baseURL = 'http://localhost:64816/api';
   
   formModel = this.fb.group({
 
      UserName : ['' , Validators.required],
      Email : ['' , Validators.email],
      FullName : [''],
      Passwords : this.fb.group({
        Password : ['' , [Validators.required , Validators.minLength(4)]],
        ConfirmPassword : ['', Validators.required]
      } , {validator : this.comparePasswords }),
     

    });

  
 comparePasswords(fb: FormGroup) {
   
   let confirmCtrl = fb.get('ConfirmPassword');

   // password mismatch error.
    console.log(confirmCtrl);
   if(confirmCtrl.errors == null || 'passwordMismatch' in confirmCtrl.errors) {
   if(fb.get('Password').value != confirmCtrl.value) {
        confirmCtrl.setErrors({passwordMismatch: true});
   }
    else {
        confirmCtrl.setErrors(null);
    }
   }

 }



 register() {
   
  var obj = {
    UserName : this.formModel.value.UserName,
    Email : this.formModel.value.Email,
    FullName : this.formModel.value.FullName,
    Password : this.formModel.value.Passwords.Password
  };

  return this.http.post(this.baseURL + '/ApplicationUser/Register' , obj);

 }

}








