import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  emitValue(buttonText: string): void {
    this.newItemEvent.emit(buttonText);
  }
}
