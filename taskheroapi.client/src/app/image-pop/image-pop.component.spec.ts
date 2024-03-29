import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePopComponent } from './image-pop.component';

describe('ImagePopComponent', () => {
  let component: ImagePopComponent;
  let fixture: ComponentFixture<ImagePopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagePopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
