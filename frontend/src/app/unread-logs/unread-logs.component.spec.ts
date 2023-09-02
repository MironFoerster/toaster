import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadLogsComponent } from './unread-logs.component';

describe('UnreadLogsComponent', () => {
  let component: UnreadLogsComponent;
  let fixture: ComponentFixture<UnreadLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnreadLogsComponent]
    });
    fixture = TestBed.createComponent(UnreadLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
