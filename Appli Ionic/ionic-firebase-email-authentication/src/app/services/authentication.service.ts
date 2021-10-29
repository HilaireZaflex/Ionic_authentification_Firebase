// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class TODO {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  notifier: any;
  email: any;
  auth: any;

  constructor(
    private afAuth: AngularFireAuth,
    private ngFirestore: AngularFirestore,
    private router: Router,
  ) { }

  create(todo: TODO) {
    return this.ngFirestore.collection('tasks').add(todo).then(
      (result) => {
        this.afAuth.createUserWithEmailAndPassword(todo.email, todo.password);
      }
    );
  }

  getTasks() {
    return this.ngFirestore.collection('tasks').snapshotChanges();
  }


  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

 userDetails() {
    return this.afAuth.user
  }
}
