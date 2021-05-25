import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieImportComponent } from './movie-import.component';

describe('MovieImportComponent', () => {
  let component: MovieImportComponent;
  let fixture: ComponentFixture<MovieImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieImportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
