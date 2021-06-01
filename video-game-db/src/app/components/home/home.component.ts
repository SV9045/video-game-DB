import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/model/game.model';
import { Option } from 'src/app/model/option.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  gameSub: Subscription;
  options: Option[];
  games: Game[];

  constructor(private data: DataService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.optionsList.subscribe((res) => this.options = res);
    this.route.params.subscribe((param: Params) => {
      if (param['game-search']) {
        this.searchGames('metacrit', param['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  get optionsList() {
    return of([
      { text: 'Name', value: 'name' },
      { text: 'Released', value: 'released' },
      { text: 'Added', value: 'added' },
      { text: 'Created', value: 'created' },
      { text: 'Updated', value: 'updated' },
      { text: 'Rating', value: 'rating' },
      { text: 'Metacritic', value: 'metacritic' },
    ]);
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.data
      .getGames(sort, search)
      .subscribe((res: APIResponse<Game>) => {
        this.games = res?.results;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
