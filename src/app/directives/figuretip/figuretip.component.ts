import { Component, Input } from '@angular/core';

@Component({
  selector: 'figuretip',
  template: '<div>{{description}}</div><figure class="highlight"><pre class="with-style-pre-figure"><code class="with-style-code-figure">{{content}}</code></pre></figure><br/>'
})
export class FiguretipComponent {
  @Input() description: String;
  @Input() content: String;

}
