import { Component, Input, OnInit } from '@angular/core';
import { NgttMatch } from 'ng-tournament-tree';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: NgttMatch;


  constructor() { }

  ngOnInit() {
  }

}
