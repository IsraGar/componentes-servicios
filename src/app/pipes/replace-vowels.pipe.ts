import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceVowels'
})
export class ReplaceVowelsPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('A','4').replace('E','3').replace('I','1').replace('O','0').replace('U','|_|');;
  }

}
