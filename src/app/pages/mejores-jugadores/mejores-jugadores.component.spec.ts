import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejoresJugadoresComponent } from './mejores-jugadores.component';

describe('MejoresJugadoresComponent', () => {
  let component: MejoresJugadoresComponent;
  let fixture: ComponentFixture<MejoresJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MejoresJugadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejoresJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
