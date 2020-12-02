import { Expression, expressionCONS, expressionOP } from "./Expression";

export interface Chemin<C, Op> {

    filtrage<R>(casVide: () => R, casGauche: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R, casDroite: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R): R;

    toString(): string;
}

export function cheminVIDE<C, Op>(): Chemin<C, Op> {
    return new class implements Chemin<C, Op> {
        filtrage<R>(casVide: () => R, casGauche: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R, casDroite: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R): R {
            return casVide();
        }

        toString(): string {
            return "0";
        }
        
    }
}

export function cheminGAUCHE<C, Op>(op: Op, p: Chemin<C, Op>, e: Expression<C, Op>): Chemin<C, Op> {
    return new class implements Chemin<C, Op> {
        filtrage<R>(casVide: () => R, casGauche: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R, casDroite: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R): R {
            return casGauche(op, p, e);
        }

        toString(): string {
            return `${p}.(${op} ? ${e})`;
        }
        
    }
}

export function cheminDROITE<C, Op>(op: Op, p: Chemin<C, Op>, e: Expression<C, Op>): Chemin<C, Op> {
    return new class implements Chemin<C, Op> {
        filtrage<R>(casVide: () => R, casGauche: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R, casDroite: (op: Op, p: Chemin<C, Op>, e: Expression<C, Op>) => R): R {
            return casDroite(op, p, e);
        }

        toString(): string {
            return `${p}.(${op} ${e} ?)`;
        }
        
    }
}