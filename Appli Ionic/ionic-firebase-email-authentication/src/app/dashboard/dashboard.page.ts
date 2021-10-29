// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  liste: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public firestore: AngularFirestore
  ) {this.listUsers()}

  ngOnInit() {}
    listUsers(){
      this.firestore.collection('tasks').valueChanges()
      .subscribe(response => {
        this.liste = response;
      })
    }

  

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}

