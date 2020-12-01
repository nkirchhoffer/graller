"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
var OpArith;
(function (OpArith) {
    OpArith["Plus"] = "+";
    OpArith["Mult"] = "*";
})(OpArith || (OpArith = {}));
const expG = Expression_1.expressionOP(OpArith.Plus, Expression_1.expressionCONS(5), Expression_1.expressionCONS(3));
const expD = Expression_1.expressionOP(OpArith.Plus, Expression_1.expressionCONS(12), Expression_1.expressionCONS(15));
const exp = Expression_1.expressionOP(OpArith.Mult, expG, expD);
console.log("(* (+ 5 3) (+ 12 15)) : " + exp.toString());
console.log("hauteur 3 : " + hauteur(exp));
console.log("hauteur 4 : " + hauteur(Expression_1.expressionOP(OpArith.Mult, exp, Expression_1.expressionCONS(9))));
function hauteur(exp) {
    return exp.filtrage((c) => 1, (op, g, d) => 1 + Math.max(hauteur(g), hauteur(d)));
}
//# sourceMappingURL=TestExpressions.js.map