import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatIconModule,
  MatSliderModule,
  MatCheckboxModule,
  MatSelectModule,
  MatButtonModule,
  MatSnackBarModule
} from '@angular/material';

import { ScrollToModule } from 'ng2-scroll-to-el';

import { BoardsComponent } from './boards/boards.component';
import { BoardOptionsComponent } from './board-options/board-options.component';
import { BoardComponent } from './boards/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardsComponent,
    BoardOptionsComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    ScrollToModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
