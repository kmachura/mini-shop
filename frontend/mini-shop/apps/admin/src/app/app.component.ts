import { Component, OnInit } from '@angular/core';
import { UsersService } from '@mini-shop/users';

@Component({
  selector: 'mini-shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'admin';

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
