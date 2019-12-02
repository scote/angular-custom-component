import { Observable, Subject } from 'rxjs';

export class DynamicComponentRef<T> {
  public componentInstance: T;

  private readonly _afterDestroy = new Subject<any>();

  // tslint:disable-next-line: member-ordering
  public afterDestroy: Observable<any> = this._afterDestroy.asObservable();

  public destroy(result?: any): void {
    this._afterDestroy.next(result);
  }
}
