import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UsersService } from '@mini-shop/users';

@Component({
  selector: 'mini-shop-delete-user',
  templateUrl: './delete-user.component.html',
})
export class DeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private usersService: UsersService, private _snackBar: MatSnackBar
  ) {}

  deleteUser() {
    this.usersService.deleteUser(this.data.id).subscribe(() => {
      this._snackBar.open('This user has been deleted.', '', { duration: 3000 });

      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
