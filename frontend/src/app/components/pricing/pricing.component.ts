import { Component, EventEmitter, Output } from '@angular/core';

interface PricingPlan {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
}

@Component({
    selector: 'app-pricing',
    standalone: true,
    templateUrl: './pricing.component.html',
    styleUrl: './pricing.component.css',
})
export class PricingComponent {
    @Output() loginClick = new EventEmitter<void>();

    plans: PricingPlan[] = [
        {
            name: 'free',
            price: '$0',
            description: 'for testing and learning',
            features: [
                '5 animations/month',
                'basic styles only',
                '720p export quality',
                'community support',
                'watermarked exports',
            ],
            cta: 'start_free',
        },
        {
            name: 'creator',
            price: '$19',
            period: '/month',
            description: 'for content creators',
            features: [
                '100 animations/month',
                'all animation styles',
                '1080p export quality',
                'priority support',
                'no watermarks',
                'custom style training',
            ],
            cta: 'upgrade_now',
            popular: true,
        },
        {
            name: 'studio',
            price: '$49',
            period: '/month',
            description: 'for teams and studios',
            features: [
                'unlimited animations',
                'premium styles',
                '4k export quality',
                '24/7 support',
                'api access',
                'team collaboration',
            ],
            cta: 'contact_sales',
        },
    ];

    onPlanClick(plan: PricingPlan) {
        if (plan.cta === 'start_free') {
            this.loginClick.emit();
        } else {
            // TODO: toast notification "Coming soon"
            alert('Coming soon');
        }
    }
}
