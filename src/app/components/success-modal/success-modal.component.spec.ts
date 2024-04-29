import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalComponent, SuccessModel } from './success-modal.component';

describe('SuccessModalComponent', () => {
  let component: SuccessModalComponent;
  let fixture: ComponentFixture<SuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuccessModalComponent);
    component = fixture.componentInstance;
    component.result = mockResponse();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal with correct texts', () => {
    const thumbnailUrl = fixture.debugElement.nativeElement.querySelector('#thumbnail-url');
    expect(thumbnailUrl).not.toBeNull();
    expect(thumbnailUrl.src).toBe('https://image.nl/');

    const fullName = fixture.debugElement.nativeElement.querySelector('#full-name');
    expect(fullName).not.toBeNull();
    expect(fullName.innerHTML).toBe('Japie Krekel');

    const email = fixture.debugElement.nativeElement.querySelector('#email');
    expect(email).not.toBeNull();
    expect(email.innerHTML).toBe('test@test.nl');

    const albumId = fixture.debugElement.nativeElement.querySelector('#album-id');
    expect(albumId).not.toBeNull();
    expect(albumId.textContent).toBe('photo album id: 1');

    const title = fixture.debugElement.nativeElement.querySelector('#title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('title:Nice title');
  });

});

function mockResponse(): SuccessModel {
  return {
    albumId: 1,
    title: "Nice title",
    id: 123,
    email: "test@test.nl",
    firstName: "Japie",
    lastName: "Krekel",
    thumbnailUrl: "https://image.nl"
  };
}
