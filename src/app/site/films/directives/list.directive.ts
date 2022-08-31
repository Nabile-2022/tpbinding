import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[filmList]'
})
export class ListDirective
{
  constructor(private elementReference: ElementRef) { }

  @Input()
  set filmList(film: any)
  {
    let html = '<a class="list-group-item list-group-item-action">';
    html += 'Title: ' + film.Title;
    html += '\nYear: ' + film.Year;
    html += '\nDirector: ' + film.Director;
    html += '</a>';
    this.elementReference.nativeElement.innerHTML = html;
    console.log(html);
  }
}
