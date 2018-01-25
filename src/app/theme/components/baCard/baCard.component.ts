import {Component, Input} from '@angular/core';

@Component({
  selector: 'ba-card',
  styleUrls: ['./baCard.scss'],
  templateUrl: './baCard.html',
})
export class BaCard {
  @Input() header:String;
  @Input() baCardClass:String;
  @Input() cardSource:String;
}
