import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {CalculatorResult} from "../../model/calculator-result.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
	selector: 'cards-display',
	templateUrl: 'cards-display.component.html',
	styleUrls: ['cards-display.component.scss']
})
export class CardsDisplayComponent {

	isMin: boolean = false;
	isMax: boolean = false;

	_amount: number = 20;
	@Input() set amount(amount: number) {
		this._amount = amount;
		this.findCards();
	}

	get amount(): number {
		return this._amount;
	}

	@Output() amountChange: EventEmitter<number> = new EventEmitter<number>();

	result: CalculatorResult = new CalculatorResult();

	constructor(private calculatorService: CalculatorService, private snackBar: MatSnackBar) {
	}

	/**
	 * Fetch the cards available for the input's amount
	 * Emits the cards or an empty array if the amount is not available
	 */
	findCards() {
		this.isMax = false;
		this.isMin = false;

		this.calculatorService.findCards(5, this.amount).subscribe(result => {
			this.result = result
			if (!this.result.equal) {
				// Note : We should not update the user's input but rather display a message to let him know

				if (result.floor && !result.ceil) {
					// If we have floor but not ceil, we autocorrect the amount
					this.setAmount(result.floor.value);
					this.findCards();
				} else if (result.ceil && !result.floor) {
					// If we have ceil but not floor, we also autocorrect the amount
					this.setAmount(result.ceil.value);
					this.findCards();
				}
			}
		});
	}

	/**
	 * Sets the amount and emit the value change
	 * @param amount The amount to set
	 */
	setAmount(amount: number) {
		this.amount = amount;
		this.amountChange.emit(this.amount);
	}

	/**
	 * Sets the amount and finds the available cards
	 * @param amount The amount to set and search
	 */
	setAndFindAmount(amount: number) {
		this.setAmount(amount);
		this.findCards();
	}

	/**
	 * Find the previous amount and set it as current
	 */
	onPreviousClick() {
		this.calculatorService.findCards(5, this.amount - 1).subscribe(result => {
			if (result.equal) {
				this.result = result;
				this.setAmount(result.equal.value);
			} else if (result.floor) {
				this.setAndFindAmount(result.floor.value);
			} else {
				this.snackBar.open("Montant minimum atteint", "OK");
				this.isMin = true;
			}
		});
	}

	/**
	 * Find the next amount and set it as current
	 */
	onNextClick() {
		this.calculatorService.findCards(5, this.amount + 1).subscribe(result => {
			if (result.equal) {
				this.result = result;
				this.setAmount(result.equal.value);
			} else if (result.ceil) {
				this.setAndFindAmount(result.ceil.value);
			} else {
				this.snackBar.open("Montant maximum atteint", "OK");
				this.isMax = true;
			}
		});
	}
}
