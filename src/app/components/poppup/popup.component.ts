import { Component } from "@angular/core";
import { PopupService } from "../../services/popup.service";

@Component({
 templateUrl:'./popup.component.html',
 standalone: true,
 selector:'app-popup'
})
export class PopupComponent{
 constructor(private readonly popupService:PopupService){

 }
 get opened(){
  return this.popupService.opened;
 }
 onClosePopup(){
  this.popupService.opened = false;
 }
}
