import { Component } from '@angular/core';
import * as Moment from 'moment';
import { NgttTournament } from 'ng-tournament-tree';


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

  singleEliminationTournament: NgttTournament;

  finals: NgttTournament[];

  constructor() {
    // https://stackblitz.com/edit/angular-st7uav
    this.singleEliminationTournament = {
      tournament: 'Counter Strike Go',
      rounds: [
        {
          round: '1.0',
          type: 'winnerbracket',
          matches: [
            {
              teams: [{ name: 'Team  A', score: 1 }, { name: 'Team  B', score: 2 }]
            },
            {
              teams: [{ name: 'Team  C', score: 1 }, { name: 'Team  D', score: 2 }]
            },
            {
              teams: [{ name: 'Team  E', score: 1 }, { name: 'Team  F', score: 2 }]
            },
            {
              teams: [{ name: 'Team  G', score: 1 }, { name: 'Team  H', score: 2 }]
            }, {
              teams: [{ name: 'Team  A', score: 1 }, { name: 'Team  B', score: 2 }]
            },
            {
              teams: [{ name: 'Team  C', score: 1 }, { name: 'Team  D', score: 2 }]
            },
            {
              teams: [{ name: 'Team  E', score: 1 }, { name: 'Team  F', score: 2 }]
            },
            {
              teams: [{ name: 'Team  G', score: 1 }, { name: 'Team  H', score: 2 }]
            }
          ]
        }, {
          round: '1.0',
          type: 'winnerbracket',
          matches: [
            {
              teams: [{ name: 'Team  A', score: 1 }, { name: 'Team  B', score: 2 }]
            },
            {
              teams: [{ name: 'Team  C', score: 1 }, { name: 'Team  D', score: 2 }]
            },
            {
              teams: [{ name: 'Team  E', score: 1 }, { name: 'Team  F', score: 2 }]
            },
            {
              teams: [{ name: 'Team  G', score: 1 }, { name: 'Team  H', score: 2 }]
            }
          ]
        },
        {
          round: '2.0',
          type: 'winnerbracket',
          matches: [
            {
              teams: [{ name: 'Team  B', score: 1 }, { name: 'Team  D', score: 2 }]
            },
            {
              teams: [{ name: 'Team  F', score: 1 }, { name: 'Team  H', score: 2 }]
            }
          ]
        },
        {
          round: '3.0',
          type: 'winnerbracket',
          matches: [
            {
              teams: [
                {
                  name: 'Team  F',
                  score: 1
                },
                {
                  name: 'Team  B',
                  score: 2
                }
              ]
            }
          ]
        },
        {
          round: '3.0',
          type: 'finale',
          matches: [
            {
              teams: [
                {
                  name: 'Team  D',
                  score: 1
                },
                {
                  name: 'Team  H',
                  score: 2
                }
              ]
            }
          ]
        }
      ]
    };

    this.finals = [];

    const firebase = window['firebase'];

    if (firebase) {

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
        this.rounds.forEach(round => { round.teams.sort((a, b) => (b.points || 0) - (a.points || 0)); });
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

          if (value[8] && (match.date.isValid() || !value[0])) {
            let t: NgttTournament;
            t = this.finals.find(t => t.tournament == value[8]);
            if (!t) {
              t = {
                tournament: value[8],
                rounds: []
              };
              this.finals.push(t);
            }
            let n = value[9].toFixed(1);
            let round = t.rounds.find(r => r.round == n);
            if (!round) {
              round = {
                matches: [],
                round: n,
                type: 'winnerbracket'
              };
              t.rounds.push(round);
            }
            round.matches.push({
              teams: [
                { name: match.team1, score: match.result ? parseInt(match.result.split('-')[0]) : 0 },
                { name: match.team2, score: match.result ? parseInt(match.result.split('-')[1]) : 0 }
              ]
            });
          }

          if (match.date.isValid()) {
            if (match.date.isBefore()) {
              this.pastMatches.push(match);
            } else {
              this.futureMatches.push(match);
            }
          }
          this.items[1].push(value);
        });
        this.futureMatches.sort((a, b) => a.date.isBefore(b.date) ? -1 : 1);
        this.pastMatches.sort((a, b) => b.date.isBefore(a.date) ? -1 : 1);

        this.finals.forEach(f => {
          const final34 = f.rounds[f.rounds.length - 1];
          f.rounds[f.rounds.length - 2].matches.forEach(m => {
            m.teams.push(final34.matches[0].teams[0], final34.matches[0].teams[1]);
          });
          f.rounds.pop();
        });
        this.done(db);
      });
    } else {
      this.pending = 0;
    }
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