import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public list: any[];
  public loadList: any[];
  liste: any[];

  constructor(
    private authService: AuthenticateService,
    public firestore: AngularFirestore
    ) {this.listUsers() }

  ngOnInit() {
    this.firestore.collection('tasks').valueChanges().subscribe(list=>{
      this.list = list;
      this.loadList = list;
    })
  }

  listUsers() {
    this.firestore.collection('tasks').valueChanges()
    .subscribe(response => {
      this.liste = response;
    })
  }

  initializeItems(): void{
    this.list = this.loadList;
  }

  filterlist(evt){
    this.initializeItems();
    const searchTerm = evt.srcElement.value;
    if(!searchTerm){
      return;
    }

    this.list = this.list.filter(currentList=>{
      if(currentList.name && searchTerm){
        if(currentList.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }
}
