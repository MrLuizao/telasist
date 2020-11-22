import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

import { UserModel } from 'src/app/models/user.model';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';


const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  user: UserModel = new UserModel();
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingresa un formato de correo válido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private authFire: AuthFirebaseService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.user.email = 'luis@telasist.com';
    this.user.password = 'Test12345';
  }

  ngOnDestroy() {}

  login() {
    this.authFire.logInFireBase(this.user).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['home']);
      },
      (errType) => {
        let messageServ = errType.error.error.message;

        console.log(messageServ);

        if (messageServ == 'EMAIL_NOT_FOUND') {
          alert('Revisa el correo ingresado')
          return;
        }

        if (messageServ == 'INVALID_PASSWORD') {
          alert('Revisa el password ingresado')
          return;
        }
      }
    );
  }

  // login() {
  //   this.isLoading = true;
  //   const login$ = this.authenticationService.login(this.loginForm.value);
  //   login$.pipe(
  //     finalize(() => {
  //       this.loginForm.markAsPristine();
  //       this.isLoading = false;
  //     }),
  //     untilDestroyed(this)
  //   ).subscribe(credentials => {
  //     log.debug(`${credentials.username} successfully logged in`);
  //     this.router.navigate([ this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
  //   }, error => {
  //     log.debug(`Login error: ${error}`);
  //     this.error = error;
  //   });
  // }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
