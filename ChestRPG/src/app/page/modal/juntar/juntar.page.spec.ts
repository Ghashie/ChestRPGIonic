import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuntarPage } from './juntar.page';

describe('JuntarPage', () => {
  let component: JuntarPage;
  let fixture: ComponentFixture<JuntarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JuntarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
