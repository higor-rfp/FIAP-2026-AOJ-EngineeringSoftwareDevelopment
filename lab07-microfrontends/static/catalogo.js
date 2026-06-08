//async function renderCatalogo() {
//    const response = await fetch('/api/v1/catalogo');
//    const data = await response.json();
//    const container = document.getElementById('vitrine-list');
//   container.innerHTML = '';
//    data.produtos.forEach(p => {
//        const div = document.createElement('div');
//        div.className = 'product';
//        div.innerHTML = `<span><strong>${p.nome}</strong> - R$ ${p.preco}</span><button onclick="adicionarAoCarrinho('${p.nome}', ${p.preco})">Adicionar</button>`;
//        container.appendChild(div);
//    });
//}
async function renderCatalogo() {
    // TROQUE: /api/v1/catalogo por /api/bff/home
    const response = await fetch('/api/bff/home');
    const data = await response.json();
    
    const container = document.getElementById('vitrine-list');
    container.innerHTML = '';

    // ATENÇÃO: O BFF retorna 'vitrine' em vez de 'produtos'
    data.vitrine.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <span><strong>${p.nome}</strong> - R$ ${p.preco} <br>
            <span class="stock-tag">Status: ${p.estoque}</span></span>
            <button onclick="adicionarAoCarrinho('${p.nome}', ${p.preco})">Adicionar</button>
        `;
        container.appendChild(div);
    });
}

//function adicionarAoCarrinho(nome, preco) {
//    console.log(`[CATALOGO] Evento: Adicionar ${nome}`);
//}
function adicionarAoCarrinho(nome, preco) {
    console.log(`[CATALOGO] Disparando evento para: ${nome}`);
    
    // Criamos um evento customizado que qualquer um pode ouvir
    const evento = new CustomEvent('cart:add', { 
        detail: { nome, preco } 
    });
    
    window.dispatchEvent(evento);
}

renderCatalogo();
