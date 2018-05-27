import { Component } from '@angular/core';
import { IBoardOptions } from './board-options.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  boardOptions: IBoardOptions;
  onGenerateBoards(options: IBoardOptions) {
    this.boardOptions = options;
  }
}
