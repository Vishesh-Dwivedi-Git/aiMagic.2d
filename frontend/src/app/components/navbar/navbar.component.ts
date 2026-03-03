import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    @Output() loginClick = new EventEmitter<void>();

    isOpen = signal(false);

    navLinks = [
        { name: 'chat', href: '/chat' },
        { name: 'features', href: '#features' },
        { name: 'pricing', href: '#pricing' },
        { name: 'faq', href: '#faq' },
    ];

    toggleMenu() {
        this.isOpen.update((v) => !v);
    }

    closeMenu() {
        this.isOpen.set(false);
    }

    onLoginClick() {
        this.closeMenu();
        this.loginClick.emit();
    }

    isFragment(href: string): boolean {
        return href.startsWith('#');
    }
}
