import {
    Component,
    inject,
    signal,
    OnInit,
    ElementRef,
    ViewChild,
    AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { environment } from '../../../environments/environment';

export interface Message {
    id: string;
    type: 'user' | 'ai';
    content: string;
    videoUrl?: string;
    isLoading?: boolean;
    timestamp: Date;
}

@Component({
    selector: 'app-chat-interface',
    standalone: true,
    imports: [FormsModule, LoginModalComponent],
    templateUrl: './chat-interface.component.html',
    styleUrl: './chat-interface.component.css',
})
export class ChatInterfaceComponent implements OnInit, AfterViewChecked {
    @ViewChild('messagesEnd') messagesEnd!: ElementRef;
    @ViewChild('chatContainer') chatContainer!: ElementRef;

    private authService = inject(AuthService);
    private router = inject(Router);
    private http = inject(HttpClient);

    messages = signal<Message[]>([]);
    input = signal('');
    isGenerating = signal(false);
    showLoginModal = signal(false);

    readonly authenticated = this.authService.authenticated;
    readonly displayName = this.authService.displayName;
    readonly user = this.authService.user;

    ngOnInit() {
        if (!this.authService.isAuthenticated()) {
            this.showLoginModal.set(true);
            return;
        }

        this.initWelcomeMessage();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    private initWelcomeMessage() {
        const name = this.displayName();
        this.messages.set([
            {
                id: crypto.randomUUID(),
                type: 'ai',
                content: `👋 Hello ${name}! I'm your AI animation assistant. Describe the animation you want to create and I'll generate it for you.`,
                timestamp: new Date(),
            },
        ]);
    }

    private scrollToBottom() {
        try {
            if (this.chatContainer?.nativeElement) {
                this.chatContainer.nativeElement.scrollTop =
                    this.chatContainer.nativeElement.scrollHeight;
            }
        } catch (err) { }
    }

    async handleSend() {
        const inputVal = this.input().trim();
        if (!inputVal || this.isGenerating()) return;

        this.isGenerating.set(true);

        const userMessage: Message = {
            id: crypto.randomUUID(),
            type: 'user',
            content: inputVal,
            timestamp: new Date(),
        };

        const placeholderId = crypto.randomUUID();
        const aiPlaceholder: Message = {
            id: placeholderId,
            type: 'ai',
            content: 'Generating your animation...',
            isLoading: true,
            timestamp: new Date(),
        };

        this.messages.update((msgs) => [...msgs, userMessage, aiPlaceholder]);
        this.input.set('');

        try {
            const token = await this.authService.getAccessToken();

            const res: any = await this.http
                .post(
                    `${environment.backendUrl}/generate`,
                    { prompt: inputVal },
                    {
                        headers: new HttpHeaders({
                            Authorization: `Bearer ${token}`,
                        }),
                    }
                )
                .toPromise();

            const videoUrl = res?.video_url || '';

            this.messages.update((msgs) =>
                msgs.map((msg) =>
                    msg.id === placeholderId
                        ? {
                            ...msg,
                            content: "Here's your generated animation! 🎬",
                            isLoading: false,
                            videoUrl,
                            timestamp: new Date(),
                        }
                        : msg
                )
            );
        } catch (err) {
            this.messages.update((msgs) =>
                msgs.map((msg) =>
                    msg.id === placeholderId
                        ? {
                            ...msg,
                            content: '❌ Something went wrong. Please try again.',
                            isLoading: false,
                            timestamp: new Date(),
                        }
                        : msg
                )
            );
        } finally {
            this.isGenerating.set(false);
        }
    }

    handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.handleSend();
        }
    }

    formatTime(date: Date): string {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    async logout() {
        await this.authService.logout();
        this.router.navigate(['/']);
    }

    onLoginClose() {
        this.showLoginModal.set(false);
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        } else {
            this.initWelcomeMessage();
        }
    }
}
