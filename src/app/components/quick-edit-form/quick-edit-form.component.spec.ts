import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickEditFormComponent } from './quick-edit-form.component';

describe('QuickEditFormComponent', () => {
  let component: QuickEditFormComponent;
  let fixture: ComponentFixture<QuickEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuickEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
