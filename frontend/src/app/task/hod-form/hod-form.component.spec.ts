import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodFormComponent } from './hod-form.component';

describe('HodFormComponent', () => {
  let component: HodFormComponent;
  let fixture: ComponentFixture<HodFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HodFormComponent]
    });
    fixture = TestBed.createComponent(HodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
