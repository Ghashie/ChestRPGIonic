import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DentroMesaPage } from './dentro-mesa.page';

describe('DentroMesaPage', () => {
  let component: DentroMesaPage;
  let fixture: ComponentFixture<DentroMesaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DentroMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
