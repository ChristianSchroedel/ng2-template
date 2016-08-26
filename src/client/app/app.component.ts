/**
 * Created by developer on 24.08.2016.
 */
import {Component} from '@angular/core';
import {HelloWorldComponent} from './components/hello-world/hello-world.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [HelloWorldComponent]
})
export class MainComponent {
}
