import { Expression, expressionOP } from './Expression';
import { Chemin, cheminGAUCHE, cheminDROITE }  from './Chemin';

export class CoupureExpression<C, Op> {

    constructor(private chemin: Chemin<C, Op>, private expression: Expression<C, Op>) {}

    haut(): CoupureExpression<C, Op> {
        // tkt grallax
        return this.chemin.filtrage(() => {
            throw new Error("VIDE TA RACE");
        }, (op, p, expG) => {
            return new CoupureExpression<C, Op>(p, expressionOP(op, this.expression, expG));
        }, (op, p, expD) => {
            return new CoupureExpression<C, Op>(p, expressionOP(op, expD, this.expression));
        });
    }

    aCoupureHaut(): boolean {
        try {
            this.haut();
            return true;
        } catch(e) {
            return false;
        }
    }

    gauche(): CoupureExpression<C, Op> {
        return this.expression.filtrage(c => {
            throw new Error('constante');
        }, (op, g, d) => {
            return new CoupureExpression(cheminGAUCHE(op, this.chemin, d), g);
        });
    }

    droite(): CoupureExpression<C, Op> {
        return this.expression.filtrage(c => {
            throw new Error('constante ta race');
        }, (op, g, d) => {
            return new CoupureExpression(cheminDROITE(op, this.chemin, g), d);
        })
    }

    aCoupureBas(): boolean {
        let i: number = 0;

        try {
            this.gauche();
            i++;
        } catch(e) { }

        try {
            this.droite();
            i++
        } catch(e) {}

        return (i === 0) ? false : true;
    }

    toString(): string {
        return `@${this.chemin} : ${this.expression}`;
    }
}

export function profondeur<C, Op>(coupure: CoupureExpression<C, Op>): string {

    if (coupure.aCoupureBas()) {
        return profondeur(coupure.gauche()) + " " + profondeur(coupure.droite());
    }

    return coupure.toString();
}