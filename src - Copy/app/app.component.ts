import { Component } from '@angular/core';
import { LocalStorage } from './core/services/local_storage.service';
import { masterService } from './core/services/master.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private masterService:masterService) {
    if (LocalStorage.isSetJWT()) {
      LocalStorage.loadJWT();
      // if (LocalStorage.getValue('loggedIn') == true || LocalStorage.getValue('loggedIn') == 'true') { }
  } else {
      LocalStorage.createJWT();
  }
  this.masterService.variableWatches(LocalStorage.getValue('cartItemCount'))
  this.masterService.variableWatchesLogin(LocalStorage.getValue('loggedIn'))
}
}
