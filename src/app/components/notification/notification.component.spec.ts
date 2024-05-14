import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotificationComponent} from './notification.component';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should show the notification as warning', () => {
        component.type = 'warning'
        component.message = 'Some warning message'
        fixture.detectChanges();

        const warning = fixture.debugElement.nativeElement.querySelector('#toast-warning');
        expect(warning).not.toBeNull();
        const error = fixture.debugElement.nativeElement.querySelector('#toast-error');
        expect(error).toBeNull();

        const message = fixture.debugElement.nativeElement.querySelector('#message');
        expect(message.innerHTML).toBe('Some warning message');
    });

    it('should show the notification as error', () => {
        component.type = 'error'
        component.message = 'Some error message'
        fixture.detectChanges();

        const warning = fixture.debugElement.nativeElement.querySelector('#toast-warning');
        expect(warning).toBeNull();
        const error = fixture.debugElement.nativeElement.querySelector('#toast-error');
        expect(error).not.toBeNull();

        const message = fixture.debugElement.nativeElement.querySelector('#message');
        expect(message.innerHTML).toBe('Some error message');
    });
});
