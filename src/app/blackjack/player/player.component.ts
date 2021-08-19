import { Component, OnInit, Input } from '@angular/core';
import { CardType } from '../types/card.type';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() playerCards: CardType[] | null = [];
  @Input() score: number | null = 0;
  @Input() rank?: string | null = '';
  constructor() {}

  ngOnInit(): void {}
}
