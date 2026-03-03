import { Component } from '@angular/core';
import { ChatInterfaceComponent } from '../../components/chat-interface/chat-interface.component';

@Component({
    selector: 'app-chat-page',
    standalone: true,
    imports: [ChatInterfaceComponent],
    template: `
    <div class="chat-page">
      <app-chat-interface></app-chat-interface>
    </div>
  `,
    styles: [
        `
      .chat-page {
        min-height: 100vh;
        background: #000;
        color: #f3f4f6;
        font-family: var(--font-mono);
      }
    `,
    ],
})
export class ChatPageComponent { }
