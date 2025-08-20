export function itemSelecionado(item) {
    return item.classList.contains('selecionado');
}

export function selecionaItem(item){
    item.classList.add('selecionado');
}

export function desselecionaItem(item){
    item.classList.remove('selecionado');
}

export function desselecionaTodosItens(itens) {
    itens.forEach(i => desselecionaItem(i));
}