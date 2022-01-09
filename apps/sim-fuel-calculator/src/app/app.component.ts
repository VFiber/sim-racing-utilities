import { Component } from '@angular/core';

@Component({
  selector: 'sim-utils-root',
  template: `
    <div class="container mx-auto md:p-4">
      <sim-utils-fuel-calculator-page></sim-utils-fuel-calculator-page>
    </div>
    <footer class="container mx-auto my-1 bg-gray-50 p-4 md:border-none border rounded-xl">
      SimRacing fuel calculator <span class="text-xs underline decoration-indigo-500/30">v0.3.0</span> by <a class="underline" href="https://github.com/VFiber/sim-racing-utilities" target="_blank">Fiber</a>
    </footer>
  `
})
export class AppComponent {
}
