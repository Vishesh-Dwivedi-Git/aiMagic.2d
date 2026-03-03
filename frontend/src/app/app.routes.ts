import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatPageComponent } from './pages/chat/chat-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'animagic.ai — AI 2D Animation Generator',
    },
    {
        path: 'chat',
        component: ChatPageComponent,
        title: 'Chat — animagic.ai',
    },
    {
        path: '**',
        redirectTo: '',
    },
];
