import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/model/game.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  gameRating: number = 0;
  gameId: string;
  game: Game;
  gameSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  getGameDetails(id: string): void {
    this.gameSub = this.dataService
      .getGameDetails(id)
      .subscribe((game: Game) => {
        this.game = game;

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }
}
