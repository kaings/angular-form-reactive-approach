import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    // console.log(this.signupForm.get('userData.username'));
    // console.log(this.signupForm.get('gender'));
    console.log(this.signupForm.get('hobbies'));
  }

  onAddHobby() {
    const ctrl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(ctrl);   // casting to FormArray is important since get() will give us object
  }
}
