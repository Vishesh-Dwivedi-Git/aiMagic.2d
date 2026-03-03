import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-modal',
    standalone: true,
    templateUrl: './login-modal.component.html',
    styleUrl: './login-modal.component.css',
})
export class LoginModalComponent implements OnInit {
    @Output() close = new EventEmitter<void>();

    private authService = inject(AuthService);
    private router = inject(Router);

    ngOnInit() {
        // Check if already authenticated
        if (this.authService.isAuthenticated()) {
            this.authenticateAndRedirect();
        }
    }

    async onLogin() {
        const success = await this.authService.login();
        if (success) {
            await this.authenticateAndRedirect();
        }
    }

    private async authenticateAndRedirect() {
        await this.authService.authenticateWithBackend();
        this.router.navigate(['/chat']);
        this.close.emit();
    }

    onClose() {
        this.close.emit();
    }

    onOverlayClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('overlay')) {
            this.onClose();
        }
    }
}
