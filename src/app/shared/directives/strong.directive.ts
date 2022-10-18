import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SecurityContext,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[strong]',
})
export class StrongDirective implements OnChanges {
  @Input() strong: string;
  @Input() caseSensitive = true;
  @Input() customClasses = '';

  @HostBinding('innerHtml')
  content: string;
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.el?.nativeElement) {
      if ('strong' in changes || 'caseSensitive' in changes) {
        const text = (this.el.nativeElement as HTMLElement).textContent;
        if (this.strong === '' || text.length < 10) {
          this.content = text;
        } else {
          const regex = new RegExp(
            this.strong,
            this.caseSensitive ? 'g' : 'gi'
          );
          const newText = text.replace(regex, (match: string) => {
            return `<span class="strong ${this.customClasses}">${match}</span>`;
          });
          const sanitzed = this.sanitizer.sanitize(
            SecurityContext.HTML,
            newText
          );
          this.content = sanitzed;
        }
      }
    }
  }
}
