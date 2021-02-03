import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { BehaviorSubject } from 'rxjs'
import { User } from '../models/user.interface'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = 'https://angular-material-api.azurewebsites.net/users'

  private _users: BehaviorSubject<User[]>

  private dataStore: {
    users: User[]
  }

  constructor(private http: HttpClient) {
    this._users = new BehaviorSubject<User[]>([])
    this.dataStore = {
      users: []
    }
   }

   get users(): Observable<User[]>{
     return this._users.asObservable()
   }

   userById(id: number){
    return this.dataStore.users.find(user => user.id === id)
   }

   addUser(user: User){
      user.id = this.dataStore.users.length + 1
      user.notes = []
      this.dataStore.users.push(user)
      this._users.next(Object.assign({}, this.dataStore).users)
   }

   loadAll(){
     return this.http.get<User[]>(this.usersUrl).subscribe(data => {
        this.dataStore.users = data
        this._users.next(Object.assign({}, this.dataStore).users)
     }, error => {
       console.log('failed to fetch users.')
     })
   }


}
