import {FedexValidators} from "./password-unambiguous.validator";
import {AbstractControl} from "@angular/forms";

describe('password', () => {

    it('should return error for password === firstName', () => {
        const control = createControl('Japie', 'Krekel', 'Japie');
        let result = FedexValidators.uniquePassword()(control);
        expect(result).not.toBeUndefined();
        expect(result).toEqual({uniquePassword: true});
    });

    it('should return error for password === lastName', () => {
        const control = createControl('Japie', 'Krekel', 'Krekel');
        let result = FedexValidators.uniquePassword()(control);
        expect(result).not.toBeUndefined();
        expect(result).toEqual({uniquePassword: true});
    });

    it('should return no error', () => {
        const control = createControl('Japie', 'Krekel', 'T^5s8ry748gr');
        let result = FedexValidators.uniquePassword()(control);
        expect(result).not.toBeUndefined();
        expect(result).toBeNull();
    });
});

function createControl(firstName: string, lastName: string, password: string) {
    const innerControl: AbstractControl = {
        setErrors: (error: object) => {
            return;
        }
    } as any;
    const control: AbstractControl = {
        get: (key: string) => {
            switch (key) {
                case 'firstName':
                    return {
                        value: firstName,
                        setErrors: innerControl.setErrors
                    };
                case 'lastName':
                    return {
                        value: lastName,
                        setErrors: innerControl.setErrors
                    };
                case 'password':
                    return {
                        value: password,
                        setErrors: innerControl.setErrors
                    };
                default:
                    return '';
            }
        }
    } as any;
    return control;
}
