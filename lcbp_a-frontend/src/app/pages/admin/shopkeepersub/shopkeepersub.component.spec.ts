import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeepersubComponent } from './shopkeepersub.component';

describe('ShopkeepersubComponent', () => {
  let component: ShopkeepersubComponent;
  let fixture: ComponentFixture<ShopkeepersubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopkeepersubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeepersubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
