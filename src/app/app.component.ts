import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from "flowbite";
import { switchMap, take, tap } from "rxjs";
import { HeaderComponent } from './components/header/header.component';
import { SuccessModalComponent, SuccessModel } from "./components/success-modal/success-modal.component";
import { JsonPlaceHolderService, PhotosApiResponse } from "./services/json-place-holder.service";
import { FedexValidators } from "./validators/password-unique.validator";
import { emailPattern, passwordPattern } from './validators/validation-patters';
import { NotificationComponent } from "./components/notification/notification.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, HeaderComponent, SuccessModalComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  fullName!: string;
  showSuccessModal: boolean = false;
  photosResponse!: PhotosApiResponse;
  successModel!: SuccessModel;
  errorMsg!: string;

  signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(emailPattern)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(passwordPattern)]
      ],
    },
    {
      validators: FedexValidators.uniquePassword(),
    }
  );

  constructor(private fb: FormBuilder, private jsonService: JsonPlaceHolderService) {
  }

  get f() {
    return this.signUpForm.controls;
  }

  ngOnInit() {
    initFlowbite(); // initialize tailwindcss
  }

  submitForm() {
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.valid) {
      this.callApis();
    }
  }

  updateFullName() {
    this.fullName = this.signUpForm.get('firstName')?.value + ' ' + this.signUpForm.get('lastName')?.value;
  }

  modalClosed() {
    this.showSuccessModal = false;
  }

  private callApis() {
    const lastNameLength = (this.f.lastName.value as string).length;

    this.jsonService.getPhotos(lastNameLength)
      .pipe(
        take(1),
        tap((pResp: PhotosApiResponse) => this.photosResponse = pResp),
        switchMap((pResp: PhotosApiResponse) => this.jsonService.getUsers({
          firstName: this.f.firstName.value as string,
          lastName: this.f.lastName.value as string,
          email: this.f.email.value as string,
          thumbnailUrl: pResp.thumbnailUrl
        }))
      )
      .subscribe({
        next: result => {
          this.successModel = {
            ...result,
            albumId: this.photosResponse.albumId,
            title: this.photosResponse.title
          };
          this.showSuccessModal = true;
        },
        error: error => {
          this.errorMsg = error;
        }
      });
  }
}

