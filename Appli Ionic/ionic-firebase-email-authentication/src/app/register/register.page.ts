// register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {

    'name': [
      { type: 'required', message: 'le nom est obligatoire.' },
      { type: 'pattern', message: 'Entrez un nom valide.' }
    ],
    'email': [
      { type: 'required', message: 'Email est obligatoire.' },
      { type: 'pattern', message: 'Entrez un email valide.' }
    ],
    'password': [
      { type: 'required', message: 'Password est obligatoire.' },
      { type: 'minlength', message: 'le password doit contenir au moins 5 caractères.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private fab: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
    
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  /*tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.fab.object('users/' + res.user.uid).set({
          name: value.name,
          email: value.email,
          password: value.password,
          date: Date.now(),
        })
        this.errorMessage = "";
        this.successMessage = "Votre Compte a été crée. Veuillez vous connecter.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "Vous venez de créer votre compte";
      })
  }
  
  */

  onSubmit() {
    if (!this.validations_form.valid) {
      return false;
    } else {
      this.authService.create(this.validations_form.value)
      .then(() => {
        this.validations_form.reset();
      }).catch((err) => {
        console.log(err)
      });
    }
  }
  

  goLoginPage() {
    this.navCtrl.navigateForward('/login');
  }


}

