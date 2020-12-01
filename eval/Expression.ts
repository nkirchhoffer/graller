export interface Expression<C, Op> {
    filtrage<R>(casConstante: (c: C) => R
        , casOperation: (op: Op, g: Expression<C, Op>, d: Expression<C, Op>) => R): R;
    toString(): string;
}

export function expressionCONS<C, Op>(c: C): Expression<C, Op> {
    return (new (class implements Expression<C, Op> {

        filtrage<R>(casConstante: (c: C) => R
            , casOperation: (op: Op, g: Expression<C, Op>, d: Expression<C, Op>) => R): R {
            return casConstante(c);
        }
        toString(): string {
            return (c as any).toString();
        }

    }));
}

export function expressionOP<C, Op>(f: Op, g: Expression<C, Op>, d: Expression<C, Op>)
    : Expression<C, Op> {
    return (new (class implements Expression<C, Op>{

        filtrage<R>(casConstante: (c: C) => R
            , casOperation: (op: Op, g: Expression<C, Op>, d: Expression<C, Op>) => R): R {

            return casOperation(f, g, d);
        }

        /*
         * Notation préfixe. Exemple : 5 + 3 noté (+ 5 3)
         */
        toString(): string {
            return "(" + (f as any).toString() + " " + g.toString() + " " + d.toString() + ")";
        }

    }));
}
