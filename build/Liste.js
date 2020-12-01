"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listeCONS = exports.listeVIDE = exports.listeDEF = void 0;
const IterateurListe_1 = require("./IterateurListe");
function listeDEF(...elts) {
    let res = listeVIDE();
    for (let i = elts.length - 1; i >= 0; i--) {
        res = listeCONS(elts[i], res);
    }
    return res;
}
exports.listeDEF = listeDEF;
function listeVIDE() {
    return (new (class {
        [Symbol.iterator]() {
            return IterateurListe_1.IterateurListe.creerIterateur(this);
        }
        // for (let i: E in liste)
        taille() {
            return 0;
        }
        estVide() {
            return true;
        }
        tete() {
            throw new Error("* Erreur : tete non défini pour une liste vide.");
        }
        reste() {
            throw new Error("* Erreur : tete non défini pour une liste vide.");
        }
        filtrage(casVide, casCons) {
            return casVide();
        }
        vide() {
            return listeVIDE();
        }
        cons(e) {
            return listeCONS(e, this);
        }
        toString() {
            return "[]";
        }
    }));
}
exports.listeVIDE = listeVIDE;
function listeCONS(tete, reste) {
    return (new (class {
        [Symbol.iterator]() {
            return IterateurListe_1.IterateurListe.creerIterateur(this);
        }
        taille() {
            return 1 + reste.taille();
        }
        estVide() {
            return false;
        }
        tete() {
            return tete;
        }
        reste() {
            return reste;
        }
        filtrage(casVide, casCons) {
            return casCons(tete, reste);
        }
        vide() {
            return listeVIDE();
        }
        cons(e) {
            return listeCONS(e, this);
        }
        toString() {
            return tete.toString() + "::" + reste.toString();
        }
    }));
}
exports.listeCONS = listeCONS;
//# sourceMappingURL=Liste.js.map