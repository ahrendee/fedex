import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {

  @Input() type!: 'warning' | 'error';
  @Input() message!: string;
}
