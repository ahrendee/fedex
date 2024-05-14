import {HttpClientModule} from "@angular/common/http";
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterOutlet} from '@angular/router';
import {initFlowbite} from "flowbite";
import {BehaviorSubject, Subject, switchMap, take, tap} from "rxjs";
import {HeaderComponent} from './components/header/header.component';
import {SuccessModalComponent, SuccessModel} from "./components/success-modal/success-modal.component";
import {JsonPlaceHolderService, PhotosApiResponse} from "./services/json-place-holder.service";
import {FedexValidators} from "./validators/password-unique.validator";
import {emailPattern, passwordPattern} from './validators/validation-patters';
import {NotificationComponent} from "./components/notification/notification.component";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, HeaderComponent, SuccessModalComponent, NotificationComponent, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    fullName$: Subject<string> = new Subject();
    errorMsg$: Subject<string> = new Subject();
    showSuccessModal$: Subject<boolean> = new Subject();
    photosResponse!: PhotosApiResponse;
    successModel!: SuccessModel;

    jsonService = inject(JsonPlaceHolderService);
    fb = inject(FormBuilder);

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


    get controls() {
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
        this.fullName$.next(this.signUpForm.get('firstName')?.value + ' ' + this.signUpForm.get('lastName')?.value);
    }

    modalClosed() {
        this.showSuccessModal$.next(false);
    }

    private callApis() {
        const lastNameLength = (this.controls.lastName.value as string).length;

        this.jsonService.getPhotos(lastNameLength)
            .pipe(
                take(1),
                tap((pResp: PhotosApiResponse) => this.photosResponse = pResp),
                switchMap((pResp: PhotosApiResponse) => this.jsonService.getUsers({
                    firstName: this.controls.firstName.value as string,
                    lastName: this.controls.lastName.value as string,
                    email: this.controls.email.value as string,
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
                    this.showSuccessModal$.next(true);
                },
                error: error => {
                    this.errorMsg$.next(error);
                }
            });
    }
}

