import { Component, OnInit } from '@angular/core';
import { Option } from './../../model/option.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  options: Option[];
  sort: string;

  constructor() {}

  ngOnInit(): void {
    this.options = [
      { text: 'Name', value: 'name' },
      { text: 'Released', value: 'released' },
      { text: 'Added', value: 'added' },
      { text: 'Created', value: 'created' },
      { text: 'Updated', value: 'updated' },
      { text: 'Rating', value: 'rating' },
      { text: 'Metacritic', value: 'metacritic' },
    ];
  }
}
