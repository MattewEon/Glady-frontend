import {Component} from '@angular/core';

@Component({
	selector: 'calculator',
	templateUrl: 'calculator.component.html',
	styleUrls: ['calculator.component.scss']
})
export class CalculatorComponent {

	amount: number = 0;

	constructor() {}
}
