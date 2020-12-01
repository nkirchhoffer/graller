"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressionOP = exports.expressionCONS = void 0;
function expressionCONS(c) {
    return (new (class {
        filtrage(casConstante, casOperation) {
            return casConstante(c);
        }
        toString() {
            return c.toString();
        }
    }));
}
exports.expressionCONS = expressionCONS;
function expressionOP(f, g, d) {
    return (new (class {
        filtrage(casConstante, casOperation) {
            return casOperation(f, g, d);
        }
        /*
         * Notation préfixe. Exemple : 5 + 3 noté (+ 5 3)
         */
        toString() {
            return "(" + f.toString() + " " + g.toString() + " " + d.toString() + ")";
        }
    }));
}
exports.expressionOP = expressionOP;
//# sourceMappingURL=Expression.js.map