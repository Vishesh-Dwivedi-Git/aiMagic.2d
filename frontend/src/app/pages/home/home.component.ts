import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { ChatPreviewComponent } from '../../components/chat-preview/chat-preview.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        NavbarComponent,
        HeroSectionComponent,
        HowItWorksComponent,
        FeaturesComponent,
        ChatPreviewComponent,
        PricingComponent,
        TestimonialsComponent,
        FaqComponent,
        FooterComponent,
        LoginModalComponent,
    ],
    template: `
    <div class="home-container">
      <app-navbar (loginClick)="openLogin()"></app-navbar>
      <app-hero-section (loginClick)="openLogin()"></app-hero-section>
      <app-how-it-works></app-how-it-works>
      <app-features></app-features>
      <app-chat-preview (loginClick)="openLogin()"></app-chat-preview>
      <app-pricing (loginClick)="openLogin()"></app-pricing>
      <app-testimonials></app-testimonials>
      <app-faq></app-faq>
      <app-footer></app-footer>

      @if (isLoginOpen()) {
        <app-login-modal (close)="closeLogin()"></app-login-modal>
      }
    </div>
  `,
    styles: [
        `
      .home-container {
        min-height: 100vh;
        background: #000;
        color: #f3f4f6;
        font-family: var(--font-mono);
      }
    `,
    ],
})
export class HomeComponent {
    isLoginOpen = signal(false);

    openLogin() {
        this.isLoginOpen.set(true);
    }

    closeLogin() {
        this.isLoginOpen.set(false);
    }
}
