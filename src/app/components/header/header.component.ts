import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-header',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe
    ],
    templateUrl: './header.component.html',
})
export class HeaderComponent {

    @Input() fullName?: string | null;
}
