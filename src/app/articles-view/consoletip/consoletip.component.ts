import { Component, Input } from '@angular/core';

@Component({
  selector: 'consoletip',
  template: '<br/>{{description}}<br/><kbd><i>{{command}}</i></kbd><br/>'
})
export class ConsoletipComponent {
  @Input() description: String;
  @Input() command: String;
}
