import { Liste, listeVIDE } from "./Liste";

export class CoupureListe<E> {
    /*
    * Fabrique publique.
    */
    static auDebut<E>(liste: Liste<E>): CoupureListe<E> {
        return new CoupureListe<E>(listeVIDE(), liste);
    }

    /*
     * Couple de listes noté ci-dessous (precedents, suivants).
     */
    constructor(private precedents: Liste<E>,
        private suivants: Liste<E>) {
    }

    /*
     * Fabrique privée à utiliser dans la suite pour constuire des coupures.
     */
    private coupure(p: Liste<E>, s: Liste<E>): CoupureListe<E> {
        return new CoupureListe<E>(p, s);
    }

    /*
     * A partir de la coupure (t :: r, s), renvoie la coupure (r, t :: s).
     */
    coupurePrecedente(): CoupureListe<E> {
        return this.coupure(this.precedents.reste(), this.suivants.cons(this.precedents.tete()));
    }

    /*
     * A partir de la coupure (p, t :: r), renvoie la coupure (t :: p, r).
     */
    coupureSuivante(): CoupureListe<E> {
        return this.coupure(this.precedents.cons(this.suivants.tete()), this.suivants.reste());
    }

    /*
     * A partir de la coupure (t :: r, s), renvoie l'élément t.
     */
    valeurPrecedente(): E {
        const item: E = this.precedents.tete();
        const precedente: CoupureListe<E> = this.coupurePrecedente();

        this.suivants = precedente.suivants;
        this.precedents = precedente.precedents;

        return item;
    }

    /*
     * A partir de la coupure (p, t :: r), renvoie l'élément t.
     */
    valeurSuivante(): E {
        const item: E = this.suivants.tete();
        const suivante: CoupureListe<E> = this.coupureSuivante();

        this.suivants = suivante.suivants;
        this.precedents = suivante.precedents;

        return item;
    }

    /*
     * A partir de la coupure (t :: r, s), renvoie la coupure (r, s).
     */
    retraitPrecedent(): CoupureListe<E> {
        return this.coupure(this.precedents.reste(), this.suivants);
    }

    /*
     * A partir de la coupure (p, t :: r), renvoie la coupure (p, r).
     */
    retraitSuivant(): CoupureListe<E> {
        return this.coupure(this.precedents, this.suivants.reste());
    }

    /*
     * A partir de la coupure (p, s), renvoie la coupure (e :: p, s).
     */
    ajoutPrecedent(e: E): CoupureListe<E> {
        return this.coupure(this.precedents.cons(e), this.suivants);
    }

    /*
     * A partir de la coupure (p, s), renvoie la coupure (p, e :: s).
     */
    ajoutSuivant(e: E): CoupureListe<E> {
        return this.coupure(this.precedents, this.suivants.cons(e));
    }

    /*
     * Teste si valeurPrecedente() est bien défini.
     */
    aValeurPrecedente(): boolean {
        return !this.precedents.estVide();
    }

    /*
     * Teste si valeurSuivante() est bien défini.
     */
    aValeurSuivante(): boolean {
        return !this.suivants.estVide();
    }

    /*
     * Teste si valeurSuivante() est bien défini.
     */
    taille(): number {
        return this.precedents.taille() + this.suivants.taille();
    }

    /*
     * Teste si les deux listes sont vides.
     */
    estVide(): boolean {
        return (this.suivants.estVide() && this.precedents.estVide());
    }

}