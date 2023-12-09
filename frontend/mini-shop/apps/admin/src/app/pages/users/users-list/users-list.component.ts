import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, UsersService } from '@mini-shop/users';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DeleteUserComponent } from '../dialogs/delete-user/delete-user.component';

@Component({
  selector: 'mini-shop-users-list',
  templateUrl: './users-list.component.html',
  styles: [`
  :host {
    @apply w-full;
  }
`]
})
export class UsersListComponent {
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'gender', 'isAdmin'];
  users$: Observable<User[]>;
  refreshUsers$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  constructor(private usersService: UsersService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.users$ = this.refreshUsers$.pipe(
      switchMap(() => this.usersService.getUsers())
    );
  }

  editUser(id: number) {
    this.router.navigateByUrl(`users/form/${id}`);
  }

  deleteProduct(user: User) {
    const refDialog = this.dialog.open(DeleteUserComponent, {
      data: user,
    });

    refDialog.afterClosed().subscribe(() => {
      this.refreshUsers$.next(true);
    });
  }

}
