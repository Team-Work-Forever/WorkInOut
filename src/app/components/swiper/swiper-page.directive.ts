import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
} from '@angular/core';

@Directive({
    selector: '[swiperPage]',
})
export class SwiperPageDirective implements AfterViewInit {
    constructor(public templateRef: TemplateRef<any>) {}
    @Input() headerTitle: string = 'couves';

    ngAfterViewInit(): void {}
}
