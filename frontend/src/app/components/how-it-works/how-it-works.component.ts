import { Component } from '@angular/core';

@Component({
    selector: 'app-how-it-works',
    standalone: true,
    templateUrl: './how-it-works.component.html',
    styleUrl: './how-it-works.component.css',
})
export class HowItWorksComponent {
    steps = [
        {
            step: '01',
            title: 'input_prompt()',
            description: 'describe your animation scene in natural language',
        },
        {
            step: '02',
            title: 'select_style()',
            description: 'choose from anime, cartoon, realistic, or custom styles',
        },
        {
            step: '03',
            title: 'export_animation()',
            description: 'download as mp4, gif, or webm in seconds',
        },
    ];
}
