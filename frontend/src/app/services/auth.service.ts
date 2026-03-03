import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PrivyUser {
    id: string;
    google?: { name?: string; email?: string };
    github?: { name?: string; username?: string };
    twitter?: { name?: string; username?: string };
    email?: { address: string } | string;
    wallet?: { address: string };
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _user = signal<PrivyUser | null>(null);
    private _authenticated = signal(false);
    private _accessToken = signal<string | null>(null);
    private _privy: any = null;

    readonly user = this._user.asReadonly();
    readonly authenticated = this._authenticated.asReadonly();
    readonly accessToken = this._accessToken.asReadonly();

    readonly displayName = computed(() => {
        const u = this._user();
        if (!u) return 'User';
        return (
            u.google?.name ||
            u.github?.name ||
            u.twitter?.name ||
            (typeof u.email === 'string'
                ? u.email
                : typeof u.email === 'object' && u.email !== null
                    ? u.email.address
                    : null) ||
            'User'
        );
    });

    constructor(private http: HttpClient) { }

    async initPrivy(): Promise<void> {
        // Privy doesn't have an Angular SDK.
        // To integrate Privy fully, install @privy-io/js-sdk-core
        // and initialize it here with the app ID from environment.
        // For now, we use a simplified auth flow.
        console.log('Auth service initialized');
    }

    /**
     * Simulate login - in production, integrate with Privy's JS SDK
     * or use their iframe-based auth flow
     */
    async login(): Promise<boolean> {
        // Open Privy login modal
        // Since Privy doesn't have native Angular support, we'll
        // use a simplified auth approach that can be replaced with
        // the full Privy integration
        try {
            // For now, set a mock user for demonstration
            // In production, this would use Privy's auth flow
            this._authenticated.set(true);
            this._user.set({
                id: 'demo-user',
                email: { address: 'demo@animagic.ai' },
            });
            this._accessToken.set('demo-token');
            return true;
        } catch (err) {
            console.error('Login failed:', err);
            return false;
        }
    }

    async authenticateWithBackend(): Promise<boolean> {
        const token = this._accessToken();
        if (!token) return false;

        try {
            await this.http
                .post(
                    `${environment.backendUrl}/api/auth/privy-login`,
                    {},
                    {
                        headers: new HttpHeaders({
                            Authorization: `Bearer ${token}`,
                        }),
                    }
                )
                .toPromise();
            console.log('✅ Authenticated with backend');
            return true;
        } catch (err) {
            console.error('❌ Backend auth failed', err);
            return false;
        }
    }

    async getAccessToken(): Promise<string | null> {
        return this._accessToken();
    }

    async logout(): Promise<void> {
        this._user.set(null);
        this._authenticated.set(false);
        this._accessToken.set(null);
    }

    isAuthenticated(): boolean {
        return this._authenticated();
    }
}
