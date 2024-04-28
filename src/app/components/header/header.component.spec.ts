import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the welcome text with full name', () => {
    component.fullName = 'Ronald Pieterse'
    fixture.detectChanges();

    const title = fixture.debugElement.nativeElement.querySelector('#welcome-name');
    expect(title.innerHTML).toBe('Welkom, Ronald Pieterse');
  });
});
