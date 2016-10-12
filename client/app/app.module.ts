/**
 * Created by developer on 24.08.2016.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HelloWorldComponent} from './components/hello-world/hello-world.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, HelloWorldComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
