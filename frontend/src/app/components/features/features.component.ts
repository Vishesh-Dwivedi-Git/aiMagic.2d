import { Component } from '@angular/core';

@Component({
    selector: 'app-features',
    standalone: true,
    templateUrl: './features.component.html',
    styleUrl: './features.component.css',
})
export class FeaturesComponent {
    features = [
        {
            title: 'ai_engine',
            description: 'state-of-the-art models trained on millions of frames',
            icon: '🤖',
        },
        {
            title: 'multi_styles',
            description: 'anime, cartoon, realistic, motion comic variations',
            icon: '🎨',
        },
        {
            title: 'instant_preview',
            description: 'real-time generation with lightning-fast processing',
            icon: '⚡',
        },
        {
            title: 'export_formats',
            description: 'mp4, gif, webm optimized for any platform',
            icon: '📦',
        },
        {
            title: 'prompt_editing',
            description: 'iterate and refine with simple text modifications',
            icon: '✏️',
        },
        {
            title: 'always_available',
            description: '24/7 generation service with unlimited access',
            icon: '🌐',
        },
    ];
}
