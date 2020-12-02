import { Expression, expressionOP, expressionCONS } from "./Expression";
import { CoupureExpression, profondeur } from './CoupureExpression';
import { cheminVIDE } from "./Chemin";

enum OpArith {
    Plus = "+",
    Mult = "*",
}

const expG: Expression<number, OpArith> = expressionOP(OpArith.Plus, expressionCONS(5),
    expressionCONS(3));
const expD: Expression<number, OpArith> = expressionOP(OpArith.Plus, expressionCONS(12),
    expressionCONS(15));
const exp: Expression<number, OpArith> = expressionOP(OpArith.Mult, expG, expD);
console.log("(* (+ 5 3) (+ 12 15)) : " + exp.toString());
console.log("hauteur 3 : " + hauteur(exp));
console.log("hauteur 4 : " + hauteur(expressionOP(OpArith.Mult, exp, expressionCONS(9))));

function hauteur<C, Op>(exp: Expression<C, Op>): number {
    return exp.filtrage(
        (c) => 1,
        (op, g, d) => 1 + Math.max(hauteur(g), hauteur(d))
    );
}

let coupure: CoupureExpression<number, OpArith> = new CoupureExpression(cheminVIDE(), exp);
let coupure2: CoupureExpression<number, OpArith> = coupure;

console.log("[@0 : (* (+ 5 3) (+ 12 15))] : [" + coupure + "]");
coupure = coupure.droite();
console.log("[@0.(* (+ 5 3) ?) : (+ 12 15)] : [" + coupure + "]");
coupure = coupure.gauche();
console.log("[@0.(* (+ 5 3) ?).(+ ? 15) : 12] : [" + coupure + "]");
coupure = coupure.haut();
console.log("[@0.(* (+ 5 3) ?) : (+ 12 15)] : [" + coupure + "]");

console.log(profondeur(coupure2));
