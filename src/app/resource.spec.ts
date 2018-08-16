import { Resource } from './resource';

describe('Resource reservation', () => {
    it('should accept new reservations', () => {
        const resource = new Resource();
        resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
    });
    it('should not accept overlapping periods', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 31), new Date(2010, 1, 1, 10, 41));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 35), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeFalsy();
    });
    it('should not accept overlapping periods inserted before', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 35), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 31), new Date(2010, 1, 1, 10, 41));
        expect(result).toBeFalsy();
    });
    it('should accept non-overlapping periods', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 40), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 25), new Date(2010, 1, 1, 10, 29));
        expect(result).toBeTruthy();
    });
    it('should accept non-overlapping periods inserted before', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
        result = resource.addReservation(new Date(2010, 1, 1, 10, 20), new Date(2010, 1, 1, 10, 30));
    });
    it('should not accept twice the same period', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 40), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 40), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeFalsy();
    });
    it('should not accept overlapping periods', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 40), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 42), new Date(2010, 1, 1, 10, 46));
        expect(result).toBeFalsy();
    });
    it('may be cancelled', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 40), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeTruthy();
        result = resource.cancelReservation(new Date(2010, 1, 1, 10, 40));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 42), new Date(2010, 1, 1, 10, 46));
        expect(result).toBeTruthy();
    });
    it('should detect inconsistent cancellations', () => {
        const resource = new Resource();
        let result = resource.addReservation(new Date(2010, 1, 1, 10, 30), new Date(2010, 1, 1, 10, 40));
        expect(result).toBeTruthy();
        result = resource.addReservation(new Date(2010, 1, 1, 10, 40), new Date(2010, 1, 1, 10, 45));
        expect(result).toBeTruthy();
        result = resource.cancelReservation(new Date(2010, 1, 1, 10, 41));
        expect(result).toBeFalsy();
        result = resource.cancelReservation(new Date(2010, 1, 1, 10, 30));
        expect(result).toBeTruthy();
    });
});
