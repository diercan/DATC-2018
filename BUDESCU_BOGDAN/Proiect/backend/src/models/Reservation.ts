export class Reservation {
    ParkId: any;
    UserId: any;
    StartDate: any;
    EndDate: any
    constructor(parkId, userId, startDate, endDate) {
        this.ParkId = parkId;
        this.UserId = userId;
        this.StartDate = startDate;
        this.EndDate = endDate;
    }
}