Array.prototype.sum = sum;
interface Array<T> {
    sum: typeof sum;
}

function sum(key: string) {
    let result: number = 0;
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        result += (element[key] || 0);
    }
    return result;
}