import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {initFlowbite} from "flowbite";
import {FedexValidators} from "./shared/password-unambiguous.validator";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'fedex';
    fullName: string = '';

    signUpForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('.*[a-z].*[A-Z].*')]],
        },
        {
            validators: FedexValidators.uniquePassword(),
        }
    );

    constructor(private formBuilder: FormBuilder) {
    }

    get f() {
        return this.signUpForm.controls;
    }

    ngOnInit() {
        initFlowbite();
    }

    submitForm() {
        console.log(this.signUpForm);
        this.signUpForm.markAllAsTouched();
    }

    updateFullName() {
        this.fullName = this.signUpForm.get('firstName')?.value + ' ' + this.signUpForm.get('lastName')?.value;
    }
}

