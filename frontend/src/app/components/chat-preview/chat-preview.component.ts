import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-chat-preview',
    standalone: true,
    templateUrl: './chat-preview.component.html',
    styleUrl: './chat-preview.component.css',
})
export class ChatPreviewComponent {
    @Output() loginClick = new EventEmitter<void>();
}
