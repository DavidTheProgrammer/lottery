import { Component, OnInit } from '@angular/core';
import { BoardOptions } from './Board-options.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  numberOfBoards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  boardOptions: BoardOptions;

  ngOnInit() {
    this.boardOptions = new BoardOptions();
    console.log(this.boardOptions);
  }

  giveMeTheJackpot() {
    if (this.boardOptions.uniqueOnly) {
    }
  }

  validateUniqueNumbersOptions(): boolean {
    const uniqueNumbersToGenerate =
      this.boardOptions.numberOfBoards * this.boardOptions.selectionsPerBoard;

    return this.boardOptions.sizeOfPool <= uniqueNumbersToGenerate;
  }
}
