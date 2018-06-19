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
  forbiddenUsernames = ['Andrea', 'Bobby'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenUsernameFunc.bind(this)]),
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

  forbiddenUsernameFunc(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'forbiddenUsernameFound': true};
    }
    return null;    // if validation is valid, it should ALWAYS return null
  }
}
