import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FotoprofilePage } from './fotoprofile.page';

describe('FotoprofilePage', () => {
  let component: FotoprofilePage;
  let fixture: ComponentFixture<FotoprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FotoprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
