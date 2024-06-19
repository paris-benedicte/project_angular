import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTravelComponent } from './manage-travel.component';

describe('ManageTravelComponent', () => {
  let component: ManageTravelComponent;
  let fixture: ComponentFixture<ManageTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTravelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
