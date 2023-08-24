import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ban-vote',
  templateUrl: './ban-vote.component.html',
  styleUrls: ['./ban-vote.component.sass']
})
export class BanVoteComponent {
  @Input() banData: any;
}
