import { Component } from '@angular/core';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent {
    testimonials = [
        {
            name: 'sarah_chen',
            role: 'content_creator',
            content: 'revolutionized my workflow. animations in minutes instead of hours.',
            avatar: 'SC',
        },
        {
            name: 'marcus_rodriguez',
            role: 'game_developer',
            content: 'quality is incredible. like having a professional studio at my fingertips.',
            avatar: 'MR',
        },
        {
            name: 'emily_watson',
            role: 'marketing_director',
            content: 'social media engagement increased 300% after using animagic ai.',
            avatar: 'EW',
        },
    ];
}
