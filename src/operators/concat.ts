import { Observable, ObservableInput } from '../Observable';
import { IScheduler } from '../Scheduler';
import { OperatorFunction, MonoTypeOperatorFunction } from '../interfaces';
import { concat as concatStatic } from '../observable/concat';

/* tslint:disable:max-line-length */
export function concat<T>(scheduler?: IScheduler): MonoTypeOperatorFunction<T>;
export function concat<T, T2>(v2: ObservableInput<T2>, scheduler?: IScheduler): OperatorFunction<T, T | T2>;
export function concat<T, T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: IScheduler): OperatorFunction<T, T | T2 | T3>;
export function concat<T, T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: IScheduler): OperatorFunction<T, T | T2 | T3 | T4>;
export function concat<T, T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: IScheduler): OperatorFunction<T, T | T2 | T3 | T4 | T5>;
export function concat<T, T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: IScheduler): OperatorFunction<T, T | T2 | T3 | T4 | T5 | T6>;
export function concat<T>(...observables: Array<ObservableInput<T> | IScheduler>): MonoTypeOperatorFunction<T>;
export function concat<T, R>(...observables: Array<ObservableInput<any> | IScheduler>): OperatorFunction<T, R>;
/* tslint:enable:max-line-length */

/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins this Observable with multiple other Observables by subscribing to them
 * one at a time, starting with the source, and merging their results into the
 * output Observable. Will wait for each Observable to complete before moving
 * on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = timer.concat(sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = timer1.concat(timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} other An input Observable to concatenate after the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 */
export function concat<T, R>(...observables: Array<ObservableInput<any> | IScheduler>): OperatorFunction<T, R> {
  return (source: Observable<T>) => source.lift.call(concatStatic<T, R>(source, ...observables));
}