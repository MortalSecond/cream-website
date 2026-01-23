import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // SSR Signals
  readonly platformID = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformID);
  readonly destroyRef = inject(DestroyRef);

  // UI Signals
  scrollY = signal(0);
  isScrolled = computed(() => this.scrollY() > 50);

  constructor(){
    if(this.isBrowser){
      afterNextRender(() => {
        const handleScroll = () => {
          this.scrollY.set(window.scrollY);
        };
      
        window.addEventListener('scroll', handleScroll);

        this.destroyRef.onDestroy(() => {
          window.removeEventListener('scroll', handleScroll);
        });
      });
    }
  }
}
