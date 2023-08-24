import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanVoteComponent } from './ban-vote.component';

describe('BanVoteComponent', () => {
  let component: BanVoteComponent;
  let fixture: ComponentFixture<BanVoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanVoteComponent]
    });
    fixture = TestBed.createComponent(BanVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
