import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HintsPage } from './hints.page';

describe('HintsPage', () => {
  let component: HintsPage;
  let fixture: ComponentFixture<HintsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HintsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
