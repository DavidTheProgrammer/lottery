import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() boardName: string;
  @Input() numbersToHighlight: Array<number>;
  @Input() pool: Array<number>;

  isNumberSelected(num: number): boolean {
    return this.numbersToHighlight.includes(num);
  }
}
