import { Expression, expressionOP, expressionCONS } from "./Expression";

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

