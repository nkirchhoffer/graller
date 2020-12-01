"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Liste_1 = require("./Liste");
const CoupureListe_1 = require("./CoupureListe");
const l = Liste_1.listeDEF(2, 3, 4, 5, 6, 7);
console.log(l.toString());
console.log("*******");
tester1(CoupureListe_1.CoupureListe.auDebut(l));
console.log("*******");
tester2(l);
console.log("*******");
function tester1(coupure) {
    let res = '';
    while (coupure.aValeurSuivante()) {
        const valeur = coupure.valeurSuivante();
        res += valeur + " ";
    }
    while (coupure.aValeurPrecedente()) {
        const valeur = coupure.valeurPrecedente();
        res += valeur + " ";
    }
    console.log(res);
}
function tester2(l) {
    let res = "";
    for (let i in l) {
        res += i + " ";
        console.log('xd');
    }
    console.log(res);
}
//# sourceMappingURL=TestListes.js.map