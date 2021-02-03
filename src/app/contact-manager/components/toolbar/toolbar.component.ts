import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  toggleState = false
  themeIsDark = true

  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter()
  @Output() toggleTheme: EventEmitter<boolean> = new EventEmitter()

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidenavClicked(){
    this.toggleState = !this.toggleState
    this.toggleSidenav.emit(this.toggleState)
  }

  toggleThemeClicked(){
    this.toggleTheme.emit()
    this.themeIsDark = !this.themeIsDark
  }

  openAddContactDialog(){
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result)

      if(result){
        this.openSnackBar('New contact added', 'Navigate').onAction().subscribe(() => {
          this.router.navigate(['/contactmanager', result.id])
        })
      }
    })
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    })
  }

}
