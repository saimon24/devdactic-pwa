import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users = [];
  joke = null;
  
  appIsOnline = true;

  constructor(private http: HttpClient) {
    Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
      this.appIsOnline = status.connected;
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
