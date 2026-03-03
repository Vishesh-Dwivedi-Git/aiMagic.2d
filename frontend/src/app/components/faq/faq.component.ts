import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-faq',
    standalone: true,
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css',
})
export class FaqComponent {
    faqs = [
        {
            question: 'how_does_it_work()',
            answer:
                'our ai models are trained on millions of animation frames. describe your scene, choose a style, and get high-quality 2d animation in seconds.',
        },
        {
            question: 'what_styles_available()',
            answer:
                'anime, cartoon, realistic, motion comic, pixel art, watercolor, and more. pro users can train custom styles.',
        },
        {
            question: 'export_formats()',
            answer: 'mp4, gif, and webm formats. quality ranges from 720p to 4k depending on your plan.',
        },
        {
            question: 'free_trial()',
            answer:
                'yes. free tier includes 5 animations per month with basic styles and 720p quality. no credit card required.',
        },
        {
            question: 'commercial_usage()',
            answer:
                'all animations are yours to use commercially. paid plans remove watermarks and provide full rights.',
        },
        {
            question: 'generation_time()',
            answer: 'most animations generate within 30-60 seconds. pro users get priority processing.',
        },
    ];

    openIndex = signal<number | null>(null);

    toggle(index: number) {
        this.openIndex.update((current) => (current === index ? null : index));
    }

    isOpen(index: number): boolean {
        return this.openIndex() === index;
    }
}
