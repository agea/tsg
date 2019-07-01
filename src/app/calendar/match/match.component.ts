import { Component, Input, OnInit } from '@angular/core';
import { NgttMatch } from 'ng-tournament-tree';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: NgttMatch;

  static finalecount = 0;
  hide = false;

  constructor() {
  }

  ngOnInit() {
    if (this.match.teams.length == 4) {
      MatchComponent.finalecount++;
      this.hide = MatchComponent.finalecount % 2 === 0;
    }
  }


}
