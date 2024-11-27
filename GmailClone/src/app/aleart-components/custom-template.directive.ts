import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customTemplate]',
})
export class CustomTemplateDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
