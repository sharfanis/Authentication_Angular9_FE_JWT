import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  welcometext: any;
  constructor(private service: UserService ) {}

  ngOnInit(): void {
    this.service.getWelcomeText().subscribe(
      res => {
        this.welcometext = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
  );
  }

}
