"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoupureListe = void 0;
const Liste_1 = require("./Liste");
class CoupureListe {
    /*
     * Couple de listes noté ci-dessous (precedents, suivants).
     */
    constructor(precedents, suivants) {
        this.precedents = precedents;
        this.suivants = suivants;
    }
    /*
    * Fabrique publique.
    */
    static auDebut(liste) {
        return new CoupureListe(Liste_1.listeVIDE(), liste);
    }
    /*
     * Fabrique privée à utiliser dans la suite pour constuire des coupures.
     */
    coupure(p, s) {
        return new CoupureListe(p, s);
    }
    /*
     * A partir de la coupure (t :: r, s), renvoie la coupure (r, t :: s).
     */
    coupurePrecedente() {
        return this.coupure(this.precedents.reste(), this.suivants.cons(this.precedents.tete()));
    }
    /*
     * A partir de la coupure (p, t :: r), renvoie la coupure (t :: p, r).
     */
    coupureSuivante() {
        return this.coupure(this.precedents.cons(this.suivants.tete()), this.suivants.reste());
    }
    /*
     * A partir de la coupure (t :: r, s), renvoie l'élément t.
     */
    valeurPrecedente() {
        const item = this.precedents.tete();
        const precedente = this.coupurePrecedente();
        this.suivants = precedente.suivants;
        this.precedents = precedente.precedents;
        return item;
    }
    /*
     * A partir de la coupure (p, t :: r), renvoie l'élément t.
     */
    valeurSuivante() {
        const item = this.suivants.tete();
        const suivante = this.coupureSuivante();
        this.suivants = suivante.suivants;
        this.precedents = suivante.precedents;
        return item;
    }
    /*
     * A partir de la coupure (t :: r, s), renvoie la coupure (r, s).
     */
    retraitPrecedent() {
        return this.coupure(this.precedents.reste(), this.suivants);
    }
    /*
     * A partir de la coupure (p, t :: r), renvoie la coupure (p, r).
     */
    retraitSuivant() {
        return this.coupure(this.precedents, this.suivants.reste());
    }
    /*
     * A partir de la coupure (p, s), renvoie la coupure (e :: p, s).
     */
    ajoutPrecedent(e) {
        return this.coupure(this.precedents.cons(e), this.suivants);
    }
    /*
     * A partir de la coupure (p, s), renvoie la coupure (p, e :: s).
     */
    ajoutSuivant(e) {
        return this.coupure(this.precedents, this.suivants.cons(e));
    }
    /*
     * Teste si valeurPrecedente() est bien défini.
     */
    aValeurPrecedente() {
        return !this.precedents.estVide();
    }
    /*
     * Teste si valeurSuivante() est bien défini.
     */
    aValeurSuivante() {
        return !this.suivants.estVide();
    }
    /*
     * Teste si valeurSuivante() est bien défini.
     */
    taille() {
        return this.precedents.taille() + this.suivants.taille();
    }
    /*
     * Teste si les deux listes sont vides.
     */
    estVide() {
        return (this.suivants.estVide() && this.precedents.estVide());
    }
}
exports.CoupureListe = CoupureListe;
//# sourceMappingURL=CoupureListe.js.map