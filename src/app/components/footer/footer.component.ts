import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixFacebookCircleFill, remixInstagramFill, remixMailFill, remixTwitterFill } from '@ng-icons/remixicon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  viewProviders:[provideIcons({remixFacebookCircleFill,remixInstagramFill,remixMailFill,remixTwitterFill})]
})
export class FooterComponent {

}
