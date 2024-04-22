import {AbstractControl, ValidatorFn} from "@angular/forms";

export class FedexValidators {
    static errors = {
        uniquePassword: {
            uniquePassword: true,
        },
    };

    static uniquePassword(): ValidatorFn {
        return (controls: AbstractControl): { [key: string]: boolean } | null => {
            const password = controls.get('password');

            if (this.isPasswordSameAsFirstOrLastName(controls)) {
                password?.setErrors(FedexValidators.errors.uniquePassword);
                return FedexValidators.errors.uniquePassword;
            }
            return null;
        };
    }

    private static isPasswordSameAsFirstOrLastName(controls: AbstractControl): boolean | null {
        const password = controls.get('password');
        const firstName = controls.get('firstName');
        const lastName = controls.get('lastName');

        if (!firstName?.value || !lastName?.value || !password?.value) {
            return null;
        }
        return password?.value === firstName?.value || password?.value === lastName?.value;
    }
}
