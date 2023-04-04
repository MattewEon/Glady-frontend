import {Result} from "./result.model";

export class CalculatorResult {
	equal: Result | undefined;
	floor: Result | undefined;
	ceil: Result | undefined;

	static fromObject(data: any): CalculatorResult {
		const calculatorResult: CalculatorResult = new CalculatorResult();

		calculatorResult.equal = data.equal && Object.assign(new Result(), data.equal);
		calculatorResult.floor = data.floor && Object.assign(new Result(), data.floor);
		calculatorResult.ceil = data.ceil && Object.assign(new Result(), data.ceil);

		return calculatorResult;
	}
}
