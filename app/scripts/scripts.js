const app = document.getElementById('products');

const container = document.createElement('div');
container.setAttribute('class', 'container');


app.appendChild(container);
const cardWrapFlex = document.createElement('div');
cardWrapFlex.setAttribute('class', 'card_wrap_flex');
const cardWrap = document.createElement('div');
cardWrap.setAttribute('class', 'card_wrap');

let request = new XMLHttpRequest();
let baseURL = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'

request.open('GET', baseURL, true);
request.onload = function () {
    // Recebe os dados do JSON
    var data = JSON.parse(this.response);
    // Verifica se o status de request é 200
    if (request.status >= 200 && request.status < 400) {
    // Cria o laço para mostrar o conteúdo
    $.each(data.products, function(product, content) {
        // Monta o HTMl da galeria de produtos
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const figure = document.createElement('figure')

        const image = document.createElement('img')
        image.setAttribute('src', content.image)
        

        const productName = document.createElement('p');
        productName.setAttribute('class', 'product_name');
        productName.textContent = content.name;

        // Nome do Produto
        const productDesc = document.createElement('p');
        productDesc.setAttribute('class', 'product_description');
        productDesc.textContent = content.description;

        // Valor antigo
        const productOldPrice = document.createElement('p');
        productOldPrice.setAttribute('class', 'product_name');
        productOldPrice.textContent = "De: R$ " + content.oldPrice + ",99";
        
        // Valor destaque
        const productNewPrice = document.createElement('p');
        productNewPrice.setAttribute('class', 'product_new_price');
        productNewPrice.textContent = "Por: R$ " + content.price + ",99";

        // Parcelamento
        const installments = document.createElement('p');
        installments.setAttribute('class', 'product_price_choice');
        installments.textContent = "ou " + content.installments.count + "x de R$ " + content.installments.value;

        // Link comprar
        const shopLink = document.createElement('a');
        shopLink.setAttribute('href', '#');
        shopLink.setAttribute('class', 'btn-shop');
        shopLink.textContent = "Comprar"
        container.appendChild(cardWrapFlex)
        cardWrapFlex.appendChild(cardWrap);
        cardWrap.appendChild(card);
        card.appendChild(figure);
        figure.appendChild(image)
        card.appendChild(productName);
        card.appendChild(productDesc);
        card.appendChild(productOldPrice);
        card.appendChild(productNewPrice);
        card.appendChild(installments);
        card.appendChild(shopLink);
    });
    // Link Ver mais
    const moreLink = document.createElement('a');
    moreLink.setAttribute('class', 'btn-more');
    moreLink.setAttribute('id', 'more-products');
    moreLink.textContent = "Ainda mais produtos aqui"
    cardWrapFlex.appendChild(moreLink);
    
    }   else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Ocorreu um erro ao carregar a página!`;
            app.appendChild(errorMessage);
    }
}

request.send();