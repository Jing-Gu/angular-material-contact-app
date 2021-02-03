import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { User } from '../../models/user.interface'
import { UserService } from '../../services/user.service'

const SMALL_WIDTH_BREAKPOINT = 720

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  isScreenSmall: boolean
  isDarkTheme: boolean = false

  users: Observable<User[]>

  @ViewChild(MatSidenav) sidenav: MatSidenav

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches
      })

    this.userService.loadAll()
    this.users = this.userService.users
    this.router.events.subscribe(() => {
      //if small screen, close sidenav
      if(this.isScreenSmall){
        this.sidenav.close()
      }
    })
  }

  toggleTheme(){
    this.isDarkTheme = !this.isDarkTheme
  }


}
