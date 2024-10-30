import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingMovingComponent } from './existing-moving.component';

describe('ExistingMovingComponent', () => {
  let component: ExistingMovingComponent;
  let fixture: ComponentFixture<ExistingMovingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingMovingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
