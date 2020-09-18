import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   formModel: any;

  constructor(private fb: FormBuilder) {
   
  this.formModel = this.fb.group({
 
      UserName : ['' , Validators.required],
      Email : ['' , Validators.email],
      FullName : [''],
      Passwords : this.fb.group({
        Password : ['' , [Validators.required , Validators.minLength(4)]],
        ConfirmPassword : ['', Validators.required]
      } , {validator : this.comparePasswords }),
     

    });
}

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

}








