import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game.model';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.css']
})
export class GameTabsComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

}