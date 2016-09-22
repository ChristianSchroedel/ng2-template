/**
 * Created by developer on 24.08.2016.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from './app.component';
import {HelloWorldComponent} from './components/hello-world/hello-world.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [MainComponent, HelloWorldComponent],
  bootstrap: [MainComponent],
})
export class MainModule {
}
