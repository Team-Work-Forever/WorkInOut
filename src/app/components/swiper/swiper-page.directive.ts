import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[swiperPage]',
})
export class SwiperPageDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
