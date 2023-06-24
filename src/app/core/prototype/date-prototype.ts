Date.prototype.addMonths = addMonths;
Date.prototype.addDays = addDays;
interface Date {
    addMonths: typeof addMonths;
    addDays: typeof addDays;
}

function addMonths(value: number) {
    var n = this.getMonth();
    this.setMonth(n + value);
    return this;
}

function addDays(value: number) {
    var n = this.getDate();
    this.setDate(n + value);
    return this;
}