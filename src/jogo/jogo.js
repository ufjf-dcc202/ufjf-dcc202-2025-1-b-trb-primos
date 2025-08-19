import { inicializaCanteiro, limpaCanteiro } from '../canteiro/canteiro.js';
import { selecaoFerramentas } from '../menu/ferramentas.js';

export function atualizaJogo() {
    inicializaCanteiro();
    limpaCanteiro();
    selecaoFerramentas();
}