import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejoresEquiposComponent } from './mejores-equipos.component';

describe('MejoresEquiposComponent', () => {
  let component: MejoresEquiposComponent;
  let fixture: ComponentFixture<MejoresEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MejoresEquiposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejoresEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
