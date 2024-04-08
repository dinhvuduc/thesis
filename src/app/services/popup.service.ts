import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  opened = false;
  componentRef: any;
  data:any;

  closePopup(){
   this.data = undefined;
   this.opened =false;
   this.componentRef = undefined;
  }
}
