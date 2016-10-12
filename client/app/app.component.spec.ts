import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HelloWorldComponent]
    });
  });

  it('should create AppComponent', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBeTruthy();
  });
});
