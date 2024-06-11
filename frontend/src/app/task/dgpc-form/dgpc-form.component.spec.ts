import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgpcFormComponent } from './dgpc-form.component';

describe('DgpcFormComponent', () => {
  let component: DgpcFormComponent;
  let fixture: ComponentFixture<DgpcFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DgpcFormComponent]
    });
    fixture = TestBed.createComponent(DgpcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
