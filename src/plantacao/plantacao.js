import { sementes, quantidadeSementes, gastaSemente, sementeSelecionada, selecionaUltimoEstagio, selecionaTempoCrescimento, selecionaPrecoVenda } from "../menu/sementes.js";
import { operacaoDinheiro } from "../menu/loja.js";
import { terraFertil, terraRegada, espacoOcupado } from "../canteiro/canteiro.js";

const canteiro = document.querySelector('.canteiro');

const tempoMorte = 5000;

const morteTemporizadores = new WeakMap();

function plantaSemente(espacoClicado, semente) {
    const infoSemente = sementes[semente];
    if (!infoSemente) return;

    plantaCresce(espacoClicado, semente, infoSemente.estagios, infoSemente.tempoCrescimento);
}

function plantaCresce(espacoClicado, semente, estagios, tempo) {
    if (terraFertil(espacoClicado) &&
        !!sementeSelecionada() &&
        quantidadeSementes(semente) > 0 &&
        !espacoOcupado(espacoClicado)
    ) {
        let indice = 0;

        espacoClicado.classList.add(estagios[indice]);
        gastaSemente(semente);

        monitorarPlanta(espacoClicado, estagios[indice]);

        function proximoEstagio() {
            indice++;
            if (indice < estagios.length) {
                if (espacoClicado.classList.contains(estagios[indice - 1])) {
                    espacoClicado.classList.remove(estagios[indice - 1]);
                    espacoClicado.classList.add(estagios[indice]);
                    monitorarPlanta(espacoClicado, estagios[indice]);
                    setTimeout(proximoEstagio, tempo);
                }
            }
        }

        setTimeout(proximoEstagio, tempo);
    }
}

function monitorarPlanta(espaco, estagioAtual) {
    if (espaco.dataset.morteTemporizador) {
        clearTimeout(espaco.dataset.morteTemporizador);
        delete espaco.dataset.morteTemporizador;
    }

    if (!terraRegada(espaco)) {
        const temporizador = setTimeout(() => {
            if (!terraRegada(espaco) && espaco.classList.contains(estagioAtual)) {
                espaco.classList.remove(estagioAtual);
                espaco.classList.add('planta-morta');
            }
            delete espaco.dataset.morteTemporizador;
        }, tempoMorte);

        espaco.dataset.morteTemporizador = temporizador;
    }
}

function cancelaTemporizadorMorte(espaco) {
    const id = morteTemporizadores.get(espaco);
    if (id) {
        clearTimeout(id);
        morteTemporizadores.delete(espaco);
    }
}

function colhePlanta(espaco) {
    const semente = Object.keys(sementes).find(s => {
        const ultimoEstagio = selecionaUltimoEstagio(s);
        return espaco.classList.contains(ultimoEstagio);
    });

    if (semente) {
        const ultimoEstagio = selecionaUltimoEstagio(semente);
        espaco.classList.remove(ultimoEstagio);
        operacaoDinheiro(selecionaPrecoVenda(semente));
    }
}

export function cultivar() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        const semente = sementeSelecionada();

        if (semente) {
            plantaSemente(espacoClicado, semente);
        } else {
            const sementeParaColher = Object.keys(sementes).find(s => {
                return espacoClicado.classList.contains(sementes[s].estagios.slice(-1)[0]);
            });

            if (sementeParaColher) {
                colhePlanta(espacoClicado);
            }
        }
    });

    canteiro.addEventListener('solo-regado', (e) => {
        const espaco = e.target;
        cancelaTemporizadorMorte(espaco);
    });

    canteiro.addEventListener('solo-secou', (e) => {
        const espaco = e.target;
        const estagioAtual = Object.values(sementes)
            .flatMap(s => s.estagios)
            .find(c => espaco.classList.contains(c));

        if (estagioAtual) {
            monitorarPlanta(espaco, estagioAtual);
        }
    });
}