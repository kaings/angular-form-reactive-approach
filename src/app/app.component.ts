import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailFunc)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    /* console.log formControls Object with VALUES of the form (FORM JS OBJECT) each time input VALUE changes */
    /*
    this.signupForm.valueChanges.subscribe(
      (val) => {
        console.log(val);
      }
    );
    */

    /* console.log the FORM STATUS each time of an input changes */
    this.signupForm.statusChanges.subscribe(
      (formStatus) => {
        console.log(formStatus);
      }
    );

    /* populate all the values in the form */
    /*
    this.signupForm.setValue({
      'userData': {
        'username': 'Will',
        'email': 'will@will.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    */

    /* populate only certain value in the form */
    this.signupForm.patchValue({
      'userData': {
        'username': 'Will'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    // console.log(this.signupForm.get('userData.username'));
    // console.log(this.signupForm.get('gender'));
    console.log(this.signupForm.get('hobbies'));

    /* reset form */
    this.signupForm.reset();
  }

  onAddHobby() {
    const ctrl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(ctrl);   // casting to FormArray is important since get() will give us object
  }

  /* custom validator */
  forbiddenUsernameFunc(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'forbiddenUsernameFound': true};
    }
    return null;    // if validation is valid, it should ALWAYS return null
  }

  /* async validator */
  /* in this example, this async validator will get the result in 2.0secs, returning promise as result.
  FYI, you can also use Observable */
  forbiddenEmailFunc(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (control.value === 'test@test.com') {
              resolve({'forbiddenEmailFound': true});
            }else{
              resolve(null);
            }
          }, 2000);
      }
    );

    return promise;
  }
}
