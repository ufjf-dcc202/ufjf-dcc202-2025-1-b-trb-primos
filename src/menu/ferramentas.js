const enxada = document.getElementById('item-enxada');
const regador = document.getElementById('item-regador');

export function enxadaSelecionada() {
    return enxada.classList.contains('selecionado');
}

export function regadorSelecionado() {
    return regador.classList.contains('selecionado');
}

function selecionaEnxada(){
    enxada.classList.add('selecionado');
    if (regadorSelecionado()) {
        deselecionaRegador();
    }
}

function deselecionaEnxada() {
    enxada.classList.remove('selecionado');
}

function selecionaRegador() {
    regador.classList.add('selecionado');
    if (enxadaSelecionada()) {
        deselecionaEnxada();
    }
}

function deselecionaRegador() {
    regador.classList.remove('selecionado');
}

export function selecaoFerramentas() {
    enxada.addEventListener('click', () => {
        if (!enxadaSelecionada()) {
            selecionaEnxada();
        } else {
            deselecionaEnxada();
        }
    });

    regador.addEventListener('click', () => {
        if (!regadorSelecionado()) {
            selecionaRegador();
        } else {
            deselecionaRegador();
        }
    });
}