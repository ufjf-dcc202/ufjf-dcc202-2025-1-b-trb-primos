import { terraFertil, terraRegada, espacoOcupado } from "../canteiro/canteiro.js";
import { dinheiro, plantas } from "../menu/loja.js";

const canteiro = document.querySelector('.canteiro');

function plantaSemente(espacoClicado, semente) {
    switch (semente) {
        case 'batata':
            plantaCresce(espacoClicado, 'batata', 'batata1', 'batata2', 'batata3', 10000);
            break;
        case 'cenoura':
            plantaCresce(espacoClicado, 'cenoura', 'cenoura1', 'cenoura2', 'cenoura3', 15000);
            break;
        case 'rabanete':
            plantaCresce(espacoClicado,'rabanete', 'rabanete1', 'rabanete2', 'rabanete3', 20000);
            break;
        default:
            break;
    }
}

function plantaCresce(espacoClicado, semente, nv1, nv2, nv3, tempo) {
    if (terraFertil(espacoClicado) &&
        sementeSelecionada(semente) &&
        quantidadeSementes(semente) > 0 &&
        !espacoOcupado(espacoClicado)
    ) {
        espacoClicado.classList.add(nv1);
        gastaSemente(semente);

        if (terraRegada(espacoClicado)) {
            setTimeout(() => {
                if (espacoClicado.classList.contains(nv1) && terraRegada(espacoClicado)) {
                    espacoClicado.classList.remove(nv1);
                    espacoClicado.classList.add(nv2);

                    setTimeout(() => {
                        if (espacoClicado.classList.contains(nv2) && terraRegada(espacoClicado)) {
                            espacoClicado.classList.remove(nv2);
                            espacoClicado.classList.add(nv3);
                        }
                    }, tempo);
                }
            }, tempo);
        }
    }
    if (!terraFertil(espacoClicado)) {
        espacoClicado.classList.remove(nv1, nv2, nv3);
    }
}

function colhePlanta(espacoClicado) {
    if (espacoClicado.classList.contains('batata3')) {
        espacoClicado.classList.remove('batata3');
        dinheiro += 10; //TODO: mudar preço de venda
    } else if (espacoClicado.classList.contains('cenoura3')) {
        espacoClicado.classList.remove('cenoura3');
        dinheiro += 15; //TODO: mudar preço de venda
    } else if (espacoClicado.classList.contains('rabanete3')) {
        espacoClicado.classList.remove('rabanete3');
        dinheiro += 20; //TODO: mudar preço de venda
    }
}

function quantidadeSementes(semente) {
    if (plantas[semente]) {
        return plantas[semente].quantidade;
    }
    return 0;
}

function gastaSemente(semente) {
    if (plantas[semente] && plantas[semente].quantidade > 0) {
        plantas[semente].quantidade--;
    }
}

function sementeSelecionada() {
    if (document.getElementById('semente-batata')?.classList.contains('selecionado')) {
        return 'batata';
    }
    if (document.getElementById('semente-cenoura')?.classList.contains('selecionado')) {
        return 'cenoura';
    }
    if (document.getElementById('semente-rabanete')?.classList.contains('selecionado')) {
        return 'rabanete';
    }
    return null;
}
export function canteiroListener() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        const semente = sementeSelecionada();
        if (semente) {
            plantaSemente(espacoClicado, semente);
        } else if (espacoClicado.classList.contains('batata3') ||
                    espacoClicado.classList.contains('cenoura3') ||
                    espacoClicado.classList.contains('rabanete3')) {
            colhePlanta(espacoClicado);
        }
    });
}