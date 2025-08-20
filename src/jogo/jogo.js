import { inicializaCanteiro, limpaCanteiro, preparaSolo, regaSolo} from '../canteiro/canteiro.js';
import { selecaoFerramentas } from '../menu/ferramentas.js';
import { inicializaMenu } from '../menu/loja.js';

export function inicializaJogo() {
    inicializaCanteiro();
    inicializaMenu();
    limpaCanteiro();
    selecaoFerramentas();
    preparaSolo();
    regaSolo();
}