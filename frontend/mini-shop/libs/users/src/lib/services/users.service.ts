import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'http://localhost:8084/api/users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  updateUser(user: User, id: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/editUser/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
