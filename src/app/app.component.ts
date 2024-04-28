import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from "flowbite";
import { switchMap, take } from "rxjs";
import { HeaderComponent } from './components/header/header.component';
import { SuccessModalComponent } from "./components/success-modal/success-modal.component";
import { JsonPlaceHolderService, PhotosApiRequest, UsersApiResponse } from "./services/json-place-holder.service";
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
  apiResult!: UsersApiResponse;
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
    const request: PhotosApiRequest = {
      firstName: this.f.firstName.value as string,
      lastName: this.f.lastName.value as string,
      email: this.f.email.value as string
    }

    this.jsonService.getPhotos(request)
      .pipe(
        take(1),
        switchMap(photosResponse => this.jsonService.getUsers({
          ...request,
          thumbnailUrl: photosResponse.thumbnailUrl
        }))
      )
      .subscribe(
        result => {
          this.apiResult = result;
          this.showSuccessModal = true;
        },
        error => {
          this.errorMsg = error;
        });
  }
}

