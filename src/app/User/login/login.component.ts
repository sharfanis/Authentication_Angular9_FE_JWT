import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {

   formModel = {
     UserName : '' ,
     Password : ''
   }

  constructor(private service: UserService , private router: Router , private toaster: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }


  onSubmit(form: NgForm) {

    this.service.login(form.value).subscribe( 
      (res: any) => {
        localStorage.setItem('token' , res.token);
        // When the response is successful, navigate to next page.
        this.router.navigateByUrl('/home');
      } ,

      err => {
       if(err.status == 400) {
          this.toaster.error('Incorrect userName or password.', 'Authentication failed.');
       } else  {
         console.log(err);
       }

      })

  };

  

}
