import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users = [];
  joke = null;
  
  appIsOnline = true;
  browserOffline: Subscription;
  browserOnline: Subscription;

  constructor(private http: HttpClient) {
    this.browserOffline = fromEvent(window, 'offline').subscribe(() => {
      this.appIsOnline = false;
    });

    this.browserOnline = fromEvent(window, 'online').subscribe(() => {
      this.appIsOnline = true;
    });
  }

  getData() {
    this.http.get('https://randomuser.me/api/?results=5').subscribe(result => {
      console.log('results: ', result);
      this.users = result['results'];
    });
  }

  getOnlineData() {
    this.http.get('https://api.chucknorris.io/jokes/random').subscribe(result => {
      console.log('joke result: ', result);
      this.joke = result;
    });
  }

}
