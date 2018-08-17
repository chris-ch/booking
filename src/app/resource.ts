import { IntervalTree, Interval } from './interval-tree';

/**
 * Essentially a list of non-overlapping, chronologically ordered periods.
 */
export class Resource {
    id: number;
    code: string;
    name: string;
    reservations: IntervalTree = new IntervalTree();

    constructor(id: number, code: string, name: string = '') {
        this.id = id;
        this.name = name;
        this.code = code;
     }

    addReservation(startDate: Date, endDate: Date): boolean {
        if (startDate.getTime() === endDate.getTime()) {
            return false;
        }
        const lowerBound: Date = (startDate < endDate) ? startDate : endDate;
        const upperBound: Date = (startDate < endDate) ? endDate : startDate;
        const hits = this.reservations.search(lowerBound.getTime(), upperBound.getTime());
        if (hits.length > 0) {
            return false;
        } else {
            return this.reservations.insert(lowerBound.getTime(), upperBound.getTime());
        }
    }

    cancelReservation(atDate: Date): boolean {
        const interval = this.reservations.findIntervalFrom(atDate.getTime());
        if (interval) {
            return this.reservations.remove(interval.low, interval.high);
        } else {
            return false;
        }
    }

    listReservations(startDate: Date, endDate: Date): Interval[] {
        return this.reservations.search(startDate.getTime(), endDate.getTime());
    }
}

