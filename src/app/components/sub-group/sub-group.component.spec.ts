import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupComponent } from './sub-group.component';

describe('SubGroupComponent', () => {
  let component: SubGroupComponent;
  let fixture: ComponentFixture<SubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
