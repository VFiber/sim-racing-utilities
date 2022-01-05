import { Component } from '@angular/core';

@Component({
  selector: 'sim-utils-root',
  template: `
    <div class="container mx-auto p-4">
      <h1>Fuel consumption calculator<br/><span class="text-xs">v 0.2.2</span></h1>
      <sim-utils-fuel-calculator></sim-utils-fuel-calculator>

      <article class="mt-10 p-5 prose lg:prose-xl bg-gray-50">
        <h1>Formulas used</h1>
        <p>
      <span class="underline cursor-pointer"
            matTooltip="At the end of the race you have to finish your lap.">Lap Count from Race Time</span> = <span
          class="font-mono">(Race Time / Lap Time)</span> rounded up to the next whole lap
        </p>
        <p>
      <span class="underline cursor-pointer"
            matTooltip="Most of the time you need a warm up lap / rolling start lap before the race, that is counted as + 1 extra lap.">Recommended fuel</span>
          =
          <span class="font-mono">(Lap Count + 1) * (Fuel/Lap)</span>
        </p>
        <p>
      <span class="underline cursor-pointer"
            matTooltip="If calculated from Race Time Lap count rounded up to the closest integer">Exact fuel</span> =
          <span class="font-mono">Lap Count * (Fuel/Lap)</span>
        </p>
      </article>
    </div>
  `
})
export class AppComponent {
}
