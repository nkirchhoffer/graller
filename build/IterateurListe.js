"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterateurListe = void 0;
const CoupureListe_1 = require("./CoupureListe");
const Liste_1 = require("./Liste");
class IterateurListe {
    constructor(coupure) {
        this.coupure = coupure;
    }
    static creerIterateur(liste) {
        const coupure = new CoupureListe_1.CoupureListe(Liste_1.listeVIDE(), liste);
        return new IterateurListe(coupure);
    }
    next() {
        if (!this.coupure.aValeurSuivante()) {
            return {
                value: null,
                done: true
            };
        }
        const valeur = this.coupure.valeurSuivante();
        return {
            value: valeur,
            done: false
        };
    }
}
exports.IterateurListe = IterateurListe;
//# sourceMappingURL=IterateurListe.js.map