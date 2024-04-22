import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { initFlowbite } from "flowbite";
import { FedexValidators } from "./components/password-unambiguous.validator";
import { HttpClientModule } from "@angular/common/http";
import { JsonPlaceHolderService } from "./services/json-place-holder.service";
import { Subject, take } from "rxjs";
import { SuccessModalComponent } from "./components/success-modal/success-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, SuccessModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fedex';
  fullName: string = '';
  showSuccessModal!: boolean;
  apiResult!: object;

  signUpForm = this.fb.group({
      firstName: ['Ronald', [Validators.required]],
      lastName: ['Pieterse', [Validators.required]],
      email: ['ronald@ahrendee.com', [
        Validators.required,
        Validators.pattern('[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\\.[a-zA-Z]{2,4}')]
      ],
      password: ['Blablablabla', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=[^0-9].*).*')]
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
    console.log(this.signUpForm.value);

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
    console.log('lets call the apis');
    this.jsonService.callApi({
      firstName: this.f.firstName.value as string,
      lastName: this.f.lastName.value as string,
      email: this.f.email.value as string
    })
      .pipe(take(1))
      .subscribe(result => {
        console.log(`in component:`, result);
        this.apiResult = result;
        this.showSuccessModal = true;
      });
  }
}

