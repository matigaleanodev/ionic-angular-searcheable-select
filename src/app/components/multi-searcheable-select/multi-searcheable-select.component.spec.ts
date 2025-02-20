import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiSearcheableSelectComponent } from './multi-searcheable-select.component';

describe('MultiSearcheableSelectComponent', () => {
  let component: MultiSearcheableSelectComponent;
  let fixture: ComponentFixture<MultiSearcheableSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSearcheableSelectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSearcheableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
