import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselEventsComponent } from './carousel-events.component';

describe('CarouselEventsComponent', () => {
  let component: CarouselEventsComponent;
  let fixture: ComponentFixture<CarouselEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
