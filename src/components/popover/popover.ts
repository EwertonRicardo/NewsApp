import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  buttons: any[];
  constructor(
    public viewController: ViewController
  ) {
    this.buttons = [
      {text: 'Facebook', value: 1},
      {text: 'Whatsapp', value: 2},
      {text: 'SMS', value: 3},
    ];
  }

  public selectItem(item): void {
    this.viewController.dismiss(item);
  }
}
