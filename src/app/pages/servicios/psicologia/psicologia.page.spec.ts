import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsicologiaPage } from './psicologia.page';

describe('PsicologiaPage', () => {
  let component: PsicologiaPage;
  let fixture: ComponentFixture<PsicologiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicologiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
