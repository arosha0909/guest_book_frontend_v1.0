import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenAccessComponent } from './token-access.component';

describe('TokenAccessComponent', () => {
  let component: TokenAccessComponent;
  let fixture: ComponentFixture<TokenAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
