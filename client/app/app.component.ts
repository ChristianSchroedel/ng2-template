/**
 * Created by developer on 24.08.2016.
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {HelloWorldComponent} from './components/hello-world/hello-world.component';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
}
