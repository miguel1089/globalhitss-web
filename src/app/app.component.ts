import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonComponent } from './components/person/person.component';

const COMPONENTS = [
  PersonComponent
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-consulta';
}
