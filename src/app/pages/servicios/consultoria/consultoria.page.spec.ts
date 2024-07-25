import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultoriaPage } from './consultoria.page';

describe('ConsultoriaPage', () => {
  let component: ConsultoriaPage;
  let fixture: ComponentFixture<ConsultoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
