import { CoupureListe} from "./CoupureListe";
import { Liste, listeVIDE } from "./Liste";

export class IterateurListe<E> implements Iterator<E> {

    constructor(private coupure: CoupureListe<E>) {}

    public static creerIterateur<E>(liste: Liste<E>): IterateurListe<E> {
        const coupure: CoupureListe<E> = new CoupureListe(listeVIDE<E>(), liste);

        return new IterateurListe<E>(coupure);
    }

    public next(): IteratorResult<E> {
        if (!this.coupure.aValeurSuivante()) {
            return {
                value: null,
                done: true
            };
        }

        const valeur: E = this.coupure.valeurSuivante();

        return {
            value: valeur,
            done: false
        };
    }

}