import { terraFertil, terraRegada, espacoOcupado } from "../canteiro/canteiro";

const canteiro = document.querySelector('.canteiro');

//TODO: ajustar variáveis de dinheiro e quantidade de sementes

export function plantaSemente(semente) {
    switch (semente) {
        case 'batata':
            plantaCresce('batata', 'batata1', 'batata2', 'batata3', 10000);
            break;
        case 'cenoura':
            plantaCresce('cenoura', 'cenoura1', 'cenoura2', 'cenoura3', 15000);
            break;
        case 'rabanete':
            plantaCresce('rabanete', 'rabanete1', 'rabanete2', 'rabanete3', 20000);
            break;
        default:
            break;
    }
}

function plantaCresce(semente, nv1, nv2, nv3, tempo) {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        if (
            terraFertil(espacoClicado) &&
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
    });
}

export function colhePlanta() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
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
    });
}

function quantidadeSementes(semente) {
    switch (semente) {
        case 'batata':
            return quantidadeSementesBatata;
        case 'cenoura':
            return quantidadeSementesCenoura;
        case 'rabanete':
            return quantidadeSementesRabanete;
        default:
            return 0;
    }
}

function gastaSemente(semente) {
    switch (semente) {
        case 'batata':
            quantidadeSementesBatata--;
            break;
        case 'cenoura':
            quantidadeSementesCenoura--;
            break;
        case 'rabanete':
            quantidadeSementesRabanete--;
            break;
    }
}

export function sementeSelecionada(semente) {
    //marca a semente selecionada
    //se outra semente ou ferramenta já estiver selecionada, desmarca
    //se clica em uma semente já selecionada, desmarca
}