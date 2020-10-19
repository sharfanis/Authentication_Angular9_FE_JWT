import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private fb: FormBuilder , private http: HttpClient) { }
    
   //readonly baseURL = 'http://localhost:64816/api';

   readonly baseURL = 'http://myfamilyapi.azurewebsites.net/api';

   // Taken care by Http Interceptor. AMAZING !!!
   //tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
   
   
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

 login(formData) {
  return this.http.post(this.baseURL + '/ApplicationUser/Login' , formData);
 }


 getUserProfileInfo() {

    return this.http.get(this.baseURL+'/UserProfile/GetUserInfo');
 }


 roleMatch(allowedRoles): boolean {
     var isMatch = false;
     var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
     var userRole = payload.role;
     allowedRoles.forEach(element => {
        if(userRole == element) {
          isMatch = true;
          return false;
        }    
     });

     return isMatch;
 }

 getWelcomeText() {
  return this.http.get(this.baseURL+'/ApplicationUser/welcome');
 }

}








