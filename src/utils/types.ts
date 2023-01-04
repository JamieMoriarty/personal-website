export function isString(value: unknown): value is string {
    return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

export function isNull(value: unknown): value is null {
    return value === null;
}

export function isUndefined(value: unknown): value is undefined {
    return typeof value === "undefined";
}

export function optional<T>(checker: Checker<T>): Checker<T | undefined> {
    return (value: unknown): value is T | undefined =>
        value === undefined || checker(value);
}

/* eslint-disable @typescript-eslint/no-explicit-any*/
export function isShape<T extends object>(
    template: CheckerObj<T>
): (value: unknown) => value is T {
    return (value: unknown): value is T => {
        return Object.entries<Checker<any>>(template).every(([key, checker]) => {
            return checker((value as OfShape<any>)[key]);
        });
    };
}
/* eslint-enable*/

export function isArray<T>(itemsChecker: Checker<T>): Checker<Array<T>> {
    return (value: unknown): value is Array<T> =>
        Array.isArray(value) && value.every(itemsChecker);
}

type OfShape<T extends object> = { [key in keyof T]?: unknown };
type Checker<T> = (value: unknown) => value is T;
type CheckerObj<T extends object> = {
    [key in keyof T]: Checker<T[key]>;
};

export function toDefined<T>(value: T | undefined): T {
    if (value === undefined) {
        throw Error(`value: ${value} is unexpectedly undefined :(`);
    } else {
        return value;
    }
}
