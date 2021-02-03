import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { User } from '../../models/user.interface'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.sass']
})
export class NewContactDialogComponent implements OnInit {

  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4']
  user: User
  newContactForm: FormGroup

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>,
              private userService: UserService) { }

  ngOnInit(): void {
    this.newContactForm = new FormGroup({
      avatar: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      birthDate: new FormControl(''),
      bio: new FormControl('')
    })
  }

  get name(){
    return this.newContactForm.get('name')
  }

  get avatar(){
    return this.newContactForm.get('avatar')
  }

  get bio(){
    return this.newContactForm.get('bio')
  }

  getErrorMessage(){
    return this.name.hasError('required') ? 'You must enter a name' : ''
  }


  dismiss(){
    this.dialogRef.close(null)
  }

  onSubmit(){
    this.user = this.newContactForm.value
    this.userService.addUser(this.user)
    this.dialogRef.close(this.user)
  }
}
