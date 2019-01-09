
import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({ 
    selector: '[letterAvatar]' 
})
export class LetterAvatarDirective implements OnInit {

   // @Input() letterAvatar: string;

    constructor(private elem: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        this.renderer.setElementStyle(this.elem.nativeElement, 'display', 'inline-block');
        this.renderer.setElementStyle(this.elem.nativeElement, 'font-size', '1.2em');
        this.renderer.setElementStyle(this.elem.nativeElement, 'width', '2.5em');
        this.renderer.setElementStyle(this.elem.nativeElement, 'height', '2.5em');
        this.renderer.setElementStyle(this.elem.nativeElement, 'line-height', '2.5em');
        this.renderer.setElementStyle(this.elem.nativeElement, 'text-align', 'center');
        this.renderer.setElementStyle(this.elem.nativeElement, 'border-radius', '50%');
        this.renderer.setElementStyle(this.elem.nativeElement, 'background', 'white');
        this.renderer.setElementStyle(this.elem.nativeElement, 'vertical-align', 'middle');
        this.renderer.setElementStyle(this.elem.nativeElement, 'margin-right', '0');
        this.renderer.setElementStyle(this.elem.nativeElement, 'color', '#383838');
        this.renderer.setElementStyle(this.elem.nativeElement, 'border', '1px solid #b9b9b9');      
    }
}