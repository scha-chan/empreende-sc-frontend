import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpreendimentosListComponent } from './empreendimentos-list.component';

describe('EmpreendimentosListComponent', () => {
  let component: EmpreendimentosListComponent;
  let fixture: ComponentFixture<EmpreendimentosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpreendimentosListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpreendimentosListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
