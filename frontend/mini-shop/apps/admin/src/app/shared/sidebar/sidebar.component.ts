import { Component } from '@angular/core';
import { AuthService } from '@mini-shop/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
