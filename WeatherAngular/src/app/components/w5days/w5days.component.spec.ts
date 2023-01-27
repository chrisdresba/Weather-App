import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W5daysComponent } from './w5days.component';

describe('W5daysComponent', () => {
  let component: W5daysComponent;
  let fixture: ComponentFixture<W5daysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W5daysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W5daysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
