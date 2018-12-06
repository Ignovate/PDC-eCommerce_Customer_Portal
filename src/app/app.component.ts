import { Component } from '@angular/core';
import { LocalStorage } from "./core/services/local_storage.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor() {
    if (LocalStorage.isSetJWT()) {
        LocalStorage.loadJWT();
        // if (LocalStorage.getValue('loggedIn') == true || LocalStorage.getValue('loggedIn') == 'true') { }
    } else {
        LocalStorage.createJWT();
    }
}
}
