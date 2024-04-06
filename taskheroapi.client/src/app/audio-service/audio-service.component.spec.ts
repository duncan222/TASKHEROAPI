import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioServiceComponent } from './audio-service.component';

describe('AudioServiceComponent', () => {
  let component: AudioServiceComponent;
  let fixture: ComponentFixture<AudioServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
