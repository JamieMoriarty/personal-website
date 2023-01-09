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

export function maybeNull<T>(checker: Checker<T>): Checker<T | null> {
    return (value: unknown): value is T | null => value === null || checker(value);
}

/* eslint-disable @typescript-eslint/no-explicit-any*/
export function isShape<T extends object>(
    template: CheckerObj<T>
): (value: unknown) => value is T {
    return (value: unknown): value is T => {
        const valid = Object.entries<Checker<any>>(template).every(([key, checker]) => {
            return checker((value as OfShape<any>)[key]);
        });

        if (!valid) {
            Object.entries<Checker<any>>(template).forEach(([key, checker]) => {
                if (!checker((value as OfShape<any>)[key])) {
                    throw Error(`unexpected shape for ${key}`);
                }
            });
        }

        return valid;
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
