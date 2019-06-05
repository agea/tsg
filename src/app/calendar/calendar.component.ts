import { Component } from '@angular/core';
import * as Moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  items: any[] = [[], []];

  rounds: Round[] = [];
  futureMatches: Match[] = [];
  pastMatches: Match[] = [];

  pending = 2;

  constructor() {

    const firebase = window['firebase'];

    firebase.initializeApp({
      authDomain: "tsg-volley.firebaseapp.com",
      databaseURL: "https://tsg-volley.firebaseio.com",
      projectId: "tsg-volley"
    });

    const db = firebase.database();

    db.ref('masterSheet/0').on('value', snapshot => {
      this.rounds = [];
      snapshot.forEach(v => {
        const value = v.val();
        let round = this.rounds.find(r => r.name === value[0]);
        if (!round) {
          round = new Round();
          round.name = value[0];
          this.rounds.push(round);
        }
        round.teams.push({ name: value[1], points: value[2] });
      });
      this.rounds.splice(0, 1);
      this.done(db);
    });

    db.ref('masterSheet/1').on('value', snapshot => {
      this.futureMatches = [];
      this.pastMatches = [];
      snapshot.forEach(v => {
        const value = v.val();
        const match: Match = {
          date: Moment(value[0]),
          team1: value[1],
          team2: value[2],
          result: value[3]
        };
        if (match.date.isValid()) {
          if (match.date.isBefore()) {
            this.pastMatches.push(match);
          } else {
            this.futureMatches.push(match);
          }
        }
        this.items[1].push(value);
      });
      this.done(db);
    });

  }

  private done(db) {
    this.pending--;
    if (!this.pending) {
      db.goOffline();
    }
  }

}

class Round {
  name: string;
  teams: { name: string, points: number }[] = [];
}

class Match {
  date: Moment.Moment;
  team1: string;
  team2: string;
  result: string;
}