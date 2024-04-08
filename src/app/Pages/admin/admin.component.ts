import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
 templateUrl: './admin.component.html',
 standalone:true,
 imports:[RouterOutlet,RouterLink]
})
export class AdminPageComponent{}