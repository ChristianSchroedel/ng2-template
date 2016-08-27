/**
 * Created by Christian Schrödel on 26.08.2016.
 */
import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'hello-world',
  templateUrl: 'hello-world.component.html'
})
export class HelloWorldComponent {
  private welcomePhrase: string;

  constructor() {
    this.welcomePhrase = 'Hello World! Your App is running fine on an express server :-)';
  }
}
