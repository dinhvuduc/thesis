import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  // RXJS
  closing$ = new Subject<void>();

  opened = false;
  componentRef: any;
  data:any;
  width: string = '600px';

  closePopup(){
   this.data = undefined;
   this.opened =false;
   this.componentRef = undefined;
   this.width = '600px';
  }
}
