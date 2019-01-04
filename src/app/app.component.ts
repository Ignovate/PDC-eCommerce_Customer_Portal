import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    // if (LocalStorage.isSetJWT()) {
    //     LocalStorage.loadJWT();
    //     // if (LocalStorage.getValue('loggedIn') == true || LocalStorage.getValue('loggedIn') == 'true') { }
    // } else {
    //     LocalStorage.createJWT();
    // }
}
}
