import { IterateurListe } from './IterateurListe';
/*
* Définition inductive d'une liste avec deux implémentations anonymes,
* correpondant aux listes vides et aux listes construites respectivement.
* Fabriques : trois fonctions (listeVIDE, listeCONS et listeDEF).
*/
export interface Liste<E> extends Iterable<E> {

    taille(): number;

    estVide(): boolean;

    tete(): E;

    reste(): Liste<E>;

    filtrage<R>(casVide: () => R, casCons: (t: E, r: Liste<E>) => R): R;

    vide(): Liste<E>;

    cons(e: E): Liste<E>;

    toString(): string;
}

export function listeDEF<T>(...elts: T[]): Liste<T> {
    let res = listeVIDE<T>();
    for (let i = elts.length - 1; i >= 0; i--) {
        res = listeCONS(elts[i], res);
    }
    return res;
}

export function listeVIDE<E>(): Liste<E> {
    return (new (class implements Liste<E>{
        [Symbol.iterator](): Iterator<E, any, undefined> {
            return IterateurListe.creerIterateur(this);
        }

        // for (let i: E in liste)

        taille(): number {
            return 0;
        }

        estVide(): boolean {
            return true;
        }

        tete(): E {
            throw new Error("* Erreur : tete non défini pour une liste vide.");
        }

        reste(): Liste<E> {
            throw new Error("* Erreur : tete non défini pour une liste vide.");
        }

        filtrage<R>(casVide: () => R, casCons: (t: E, rl: Liste<E>) => R): R {
            return casVide();
        }
        vide(): Liste<E> {
            return listeVIDE<E>();
        }

        cons(e: E): Liste<E> {
            return listeCONS<E>(e, this);
        }

        toString(): string {
            return "[]";
        }
    }));
}

export function listeCONS<E>(tete: E, reste: Liste<E>): Liste<E> {
    return (new (class implements Liste<E>{
        [Symbol.iterator](): Iterator<E, any, undefined> {
            return IterateurListe.creerIterateur(this);
        }


        taille(): number {
            return 1 + reste.taille();
        }
        estVide(): boolean {
            return false;
        }
        tete(): E {
            return tete;
        }

        reste(): Liste<E> {
            return reste;
        }

        filtrage<R>(casVide: () => R, casCons: (t: E, rl: Liste<E>) => R): R {
            return casCons(tete, reste);
        }
        vide(): Liste<E> {
            return listeVIDE<E>();
        }

        cons(e: E): Liste<E> {
            return listeCONS<E>(e, this);
        }
        toString(): string {
            return (tete as any).toString() + "::" + reste.toString();
        }
    }));
}

