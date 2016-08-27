/**
 * Created by developer on 24.08.2016.
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {HelloWorldComponent} from './components/hello-world/hello-world.component';

@Component({
  moduleId: module.id,
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [HelloWorldComponent]
})
export class MainComponent {
}
