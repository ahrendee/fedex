import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JsonPlaceHolderService } from "./services/json-place-holder.service";
import { of } from "rxjs";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockService: jasmine.SpyObj<JsonPlaceHolderService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj(
      'JsonPlaceHolderService',
      ['getPhotos', 'getUsers']
    );

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {provide: JsonPlaceHolderService, useValue: mockService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('form fields', () => {
    let button: any;

    beforeEach(() => {
      button = fixture.debugElement.nativeElement.querySelector('#submit');
    });

    describe('firstName validation', () => {
      it(`should show message for required`, () => {
        button.click();
        fixture.detectChanges();

        const firstNameRequired = fixture.debugElement.nativeElement.querySelector('#firstNameRequired');
        expect(firstNameRequired.innerHTML).toBe('First name is required.');
      });

      it(`should show no message`, () => {
        component.signUpForm.controls['firstName'].setValue('Japie')

        button.click();
        fixture.detectChanges();

        const firstNameRequired = fixture.debugElement.nativeElement.querySelector('#firstNameRequired');
        expect(firstNameRequired).toBe(null);
      });
    });

    describe('lastName validation', () => {
      it(`should show message for required`, () => {
        button.click();
        fixture.detectChanges();

        const lastNameRequired = fixture.debugElement.nativeElement.querySelector('#lastNameRequired');
        expect(lastNameRequired.innerHTML).toBe('Last name is required.');
      });

      it(`should show no message`, () => {
        component.signUpForm.controls['lastName'].setValue('Krekel')

        button.click();
        fixture.detectChanges();

        const lastNameRequired = fixture.debugElement.nativeElement.querySelector('#lastNameRequired');
        expect(lastNameRequired).toBe(null);
      });
    });

    describe('email validation', () => {
      it(`should show message for required`, () => {
        button.click();
        fixture.detectChanges();

        const emailRequired = fixture.debugElement.nativeElement.querySelector('#emailRequired');
        expect(emailRequired.innerHTML).toBe('Email is required.');
      });

      it(`should show message for various invalid pattern`, () => {
        const invalidPatterns = [
          'bla', '@bla', 'bla@bla', 'bla@bla.n'
        ]

        invalidPatterns.forEach(pattern => {
          component.signUpForm.controls['email'].setValue(pattern);

          button.click();
          fixture.detectChanges();

          const emailPattern = fixture.debugElement.nativeElement.querySelector('#emailPattern');
          expect(emailPattern.innerHTML).toBe('Email is not valid.');
        })
      });

      it(`should show no message for various valid patterns`, () => {
        const validPatterns = [
          'bla@bla.nl', 'bla@bla.com', 'bla@mail.co.uk'
        ]

        validPatterns.forEach(pattern => {
          component.signUpForm.controls['email'].setValue(pattern)

          button.click();
          fixture.detectChanges();

          const emailValidationMessages = fixture.debugElement.nativeElement.querySelector('#emailValidationMessages');
          expect(emailValidationMessages).toBe(null);
        });

      });
    });

    describe('password validation', () => {

      it(`should show message for required`, () => {
        button.click();
        fixture.detectChanges();

        const passwordRequired = fixture.debugElement.nativeElement.querySelector('#passwordRequired');
        expect(passwordRequired.innerHTML).toBe('Password is required.');
      });

      it(`should show message for various invalid pattern`, () => {
        const patterns = [
          ['short', 1, 'Password must contain at least 8 characters.'],
          ['Short', 1, 'Password must contain at least 8 characters.'],
          ['nottooshort', 2, 'Password must contain at least 1 lowercase and 1 uppercase letter.']
        ]

        patterns.forEach(pattern => {
          component.signUpForm.controls['password'].setValue(pattern[0] as string);

          button.click();
          fixture.detectChanges();

          let passwordMsg;
          if (pattern[1] === 1) {
            passwordMsg = fixture.debugElement.nativeElement.querySelector('#passwordMinLength');
          } else {
            passwordMsg = fixture.debugElement.nativeElement.querySelector('#passwordPattern');
          }
          expect(passwordMsg.innerHTML).toBe(pattern[2]);
        })
      });

      it(`should show message for not unique`, () => {
        component.signUpForm.controls['firstName'].setValue('SameName')
        component.signUpForm.controls['lastName'].setValue('SameName')
        component.signUpForm.controls['password'].setValue('SameName')

        button.click();
        fixture.detectChanges();

        const passwordUnique = fixture.debugElement.nativeElement.querySelector('#passwordUnique');
        expect(passwordUnique.innerHTML).toBe('Password can not be the same as first name or last name.');
      });

      it(`should show no message`, () => {
        component.signUpForm.controls['password'].setValue('ValidPassword')

        button.click();
        fixture.detectChanges();

        const passwordValidationMessages = fixture.debugElement.nativeElement.querySelector('#passwordValidationMessages');
        expect(passwordValidationMessages).toBe(null);
      });
    });
  });

  describe('success modal', () => {
    it(`should show after successfull form submit`, () => {
      component.signUpForm.controls['firstName'].setValue('Japie')
      component.signUpForm.controls['lastName'].setValue('Mekrekel')
      component.signUpForm.controls['email'].setValue('bla@bla.nl')
      component.signUpForm.controls['password'].setValue('SomePassword')

      mockService.getPhotos.and.returnValue(of({
        albumId: 1,
        id: 8,
        title: "aut porro officiis laborum odit ea laudantium corporis",
        url: "https://via.placeholder.com/600/54176f",
        thumbnailUrl: "https://via.placeholder.com/150/54176f"
      }));
      mockService.getUsers.and.returnValue(of({
        firstName: "Japie",
        lastName: "Krekel",
        email: "japie@krekel.nl",
        thumbnailUrl: "https://via.placeholder.com/150/54176f",
        id: 11
      }));

      const button = fixture.debugElement.nativeElement.querySelector('#submit');
      button.click();
      fixture.detectChanges();

      component.showSuccessModal$.subscribe(value => {
        expect(value).toBe(true);
      })

      const successModal = fixture.debugElement.nativeElement.querySelector('#successModal');
      expect(successModal).toBeDefined();
    });
  });
});
