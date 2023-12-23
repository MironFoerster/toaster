import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.sass'],
  animations: [trigger("fadeInOut", [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms 300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
    ]),
    transition(':leave', [
      animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
      style({ opacity: 0 }),
    ])
  ])]
})
export class LogCardComponent implements OnInit {
  @Input() entry: any
  @Input() sessionUsername: string

  //@HostBinding("@fadeInOut") state = true
  @HostBinding("class.surrender") surrender: boolean = false
  @HostBinding("class.success") success: boolean = false
  @HostBinding("class.myfailure") myfailure: boolean = false
  @HostBinding("class.mytriumph") mytriumph: boolean = false
  @HostBinding("class.info") info: boolean = false

  ngOnInit(): void {
    if (this.entry.surrender && this.entry.killername!==this.sessionUsername && this.entry.victimname!==this.sessionUsername && this.entry.hasOwnProperty('surrender')) {
      this.surrender = true
    } else if (!this.entry.surrender && this.entry.killername!==this.sessionUsername && this.entry.victimname!==this.sessionUsername && this.entry.hasOwnProperty('surrender')) {
      this.success = true
    } else if (this.entry.surrender && this.entry.killername===this.sessionUsername || !this.entry.surrender && this.entry.victimname===this.sessionUsername) {
      this.myfailure = true
    } else if (!this.entry.surrender && this.entry.killername===this.sessionUsername || this.entry.surrender && this.entry.victimname===this.sessionUsername) {
      this.mytriumph = true
    } else if (!this.entry.hasOwnProperty('surrender')) {
      this.info = true
    }
  }  
}
