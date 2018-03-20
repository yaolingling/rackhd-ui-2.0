import { Comparator, StringFilter } from "@clr/angular";
import * as _ from 'lodash';

export class AlphabeticalComparator<T> implements Comparator<T> {
    sortBy: string;
    constructor(sortBy: string) {
        this.sortBy = sortBy;
    }
    compare(a: T, b: T) {
        let sortedArray = _.sortBy([a, b], [o =>
            (JSON.stringify(o[this.sortBy]))]);
        return _.findIndex(sortedArray, a) - _.findIndex(sortedArray, b);
    }
}

export class DateComparator implements Comparator<Node> {
    sortBy: string;

    constructor(sortBy: string) {
      this.sortBy = sortBy;
    }

    parseTime(time){
      if(typeof time === "number") {
        return time;
      }
      return Date.parse(time);
    }

    compare(a: Node, b: Node) {
      return this.parseTime(a[this.sortBy]) - this.parseTime(b[this.sortBy]);
    }
}

export class ObjectFilterByKey<T> implements StringFilter<T> {
  private _field: string;

  constructor(field: string) {
    this._field = field;
  }

  accepts(obj: T, searchKey: string): boolean {
    let stringValue : string;
    let originValue: any = obj && _.get(obj, this._field);
    if (typeof originValue === 'undefined') {
      return false;
    }
    stringValue = (typeof originValue === "object") ? JSON.stringify(originValue) : originValue.toString();
    return stringValue.toLowerCase().indexOf(searchKey) >= 0;
  }
}

export class StringOperator {
  static contain(src: string, term: string): boolean {
    if (!src) {
      return false;
    }
    if (!term) {
      return true;
    }
    return src.toLowerCase().includes(term.toLowerCase());
  }

  static search<T>(term: string, tableData: Array<T>, skipDomain: string[] = []): Array<T> {
    let searchDomain: string[] = _.without(_.keys(tableData[0]), ...skipDomain);
    return _.filter(tableData, data => {
      let flag = false;
      _.forEach(searchDomain, item => {
        let originValue: any = data && _.get(data, item);
        if (typeof originValue === 'undefined') {
          return true;
        }
        let stringValue = (typeof data[item] === "object") ? JSON.stringify(originValue) : originValue.toString();
        if(this.contain(stringValue, term)){
          flag = true;
          return false;
        }
      })
      return flag;
    });
  }
}