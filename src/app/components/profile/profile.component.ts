import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/common/role';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  showEdit = false;
  userUpdateForm: FormGroup;
  commentForm: FormGroup;
  formData: any;
  hasError = false;
  showComment = false;
  commentFormData: Comment;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formIntegrations();
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  formIntegrations() {
    this.userUpdateForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.commentForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  editProfile() {
    this.showEdit = true;
    this.showComment = false;
  }

  commentShow() {
    // this.showComment = true;
  }

  updateUser() {
    this.formData = {
      firstName: this.userUpdateForm.get('fname').value,
      lastName: this.userUpdateForm.get('lname').value,
      email: this.userUpdateForm.get('email').value,
      status: true,
      isActive: true,
      role: Role.GUEST
    };

    if (this.userUpdateForm.status !== 'INVALID') {
      this.showEdit = false;
      this.authService.updateUser(this.formData).subscribe(res => {
        this.user = res.data;
      });
    } else {
      this.hasError = true;
    }

  }

  addComment() {
    this.commentFormData = {
      title:  this.commentForm.get('title').value,
      text: this.commentForm.get('comment').value,
      isActive: true
    };
  }


}
