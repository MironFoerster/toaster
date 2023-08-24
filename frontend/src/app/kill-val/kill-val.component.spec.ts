import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillValComponent } from './kill-val.component';

describe('KillValComponent', () => {
  let component: KillValComponent;
  let fixture: ComponentFixture<KillValComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KillValComponent]
    });
    fixture = TestBed.createComponent(KillValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
