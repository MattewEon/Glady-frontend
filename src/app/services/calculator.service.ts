import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CalculatorResult} from "../model/calculator-result.model";

@Injectable()
export class CalculatorService {
	constructor(private http: HttpClient) {
	}

	findCards(shopID: number, amount: number): Observable<CalculatorResult> {
		return this.http.get('http://localhost:3000/shop/' + shopID + '/search-combination?amount=' + amount, {headers: {"Authorization": "tokenTest123"}})
			.pipe(map(CalculatorResult.fromObject));
	}
}
