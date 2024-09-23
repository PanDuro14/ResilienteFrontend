import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DedicatoriaPage } from './dedicatoria.page';

describe('DedicatoriaPage', () => {
  let component: DedicatoriaPage;
  let fixture: ComponentFixture<DedicatoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DedicatoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
