import { Liste, listeDEF } from "./Liste";
import { CoupureListe } from "./CoupureListe";

const l: Liste<number> = listeDEF(2, 3, 4, 5, 6, 7);
const l2: Liste<number> = l;
console.log(l.toString());
console.log("*******");
tester1(CoupureListe.auDebut(l));
console.log("*******");
tester2<number>(l2);
console.log("*******");

function tester1<E>(coupure: CoupureListe<E>): void {
    let res: string = '';
    while (coupure.aValeurSuivante()) {
        const valeur: E = coupure.valeurSuivante();

        res += valeur + " ";
    }

    while (coupure.aValeurPrecedente()) {
        const valeur: E = coupure.valeurPrecedente();
        
        res += valeur + " ";
    }

    console.log(res);

}

function tester2<E>(l: Liste<E>) {
    let res: string = "";

    for (let i of l) {
        res += i + " ";
    }

    console.log(res);

}
