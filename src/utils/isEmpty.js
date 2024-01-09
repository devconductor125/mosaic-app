export function isEmpty(x) {
    return x === null || x === '' || x === undefined || x === 'undefined' || JSON.stringify(x) === '{}' || x == [] || x.toString().length === 0;
}