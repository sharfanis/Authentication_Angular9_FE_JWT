import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService , 
    private toaster : ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }


  onSubmit() {
     this.service.register().subscribe( (val :any) => {

      if(val.succeeded) {
        this.service.formModel.reset();
        this.toaster.success('New User Created' , 'Registration Successful');
      } else {
        val.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName' :
              //UserName is already taken
              this.toaster.error('UserName is already taken' , 'Registration failed');
              break;
             
              default:
                //Registration failed
                this.toaster.error(element.description , 'Registration failed');
                break;

          }
          
        });
      }
       
     } , (err) => {
      console.log(err);      
     });
  }

}
