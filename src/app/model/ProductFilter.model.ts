import { FilterType } from "./enum/FilterType.enum";

export class ProductFilter {
    constructor(
        public type: FilterType,
        public value: any
    ) {}
}

export class StringValueFilter extends ProductFilter {
    constructor(
        public override type: FilterType,
        public override value: string
    ) {
        super(type, value);
    }
}

export class NumberValueFilter extends ProductFilter {
    constructor(
        public override type: FilterType,
        public override value: number
    ) {
        super(type, value);
    }
}
