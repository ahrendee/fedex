import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalComponent } from './success-modal.component';
import { UsersApiResponse } from "../../services/json-place-holder.service";

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
});

function mockResponse(): UsersApiResponse {
  return {
    id: 123,
    email: "test@test.nl",
    firstName: "Japie",
    lastName: "Krekel",
    thumbnailUrl: "https://image.nl"
  };
}
