const precos = {
    urbana: 12,
    eletrica: 20,
    cargo: 25
};


function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularValor(horas, tipo) {

    const precoHora = precos[tipo];

    let valor = horas * precoHora;

   
    if (horas > 5) {
        valor = valor * 0.90;
    }

    return valor;
}


function mostrarResultado() {

    const horas = Number(
        document.querySelector("#horas").value
    );

    const tipo = document.querySelector("#tipo").value;

    const resultado = document.querySelector("#resultado");


    if (horas <= 0 || isNaN(horas)) {

        resultado.innerHTML =
            "Digite uma quantidade de horas válida.";

        return;
    }


    const valor = calcularValor(horas, tipo);

    const nomeTipo = {
        urbana: "Urbana",
        eletrica: "Elétrica",
        cargo: "Cargo"
    };


    let mensagem = `
        <strong>${formatarMoeda(valor)}</strong><br>
        ${horas} hora(s) de bicicleta ${nomeTipo[tipo]}.
    `;


    if (horas > 5) {

        mensagem += `
            <br>
            <small>
                Desconto de 10% aplicado.
            </small>
        `;
    }


    resultado.innerHTML = mensagem;
}



let reservas = [];


function adicionarReserva() {

    const inputNome = document.querySelector("#nome");

    const nome = inputNome.value.trim();


    if (nome === "") {

        alert("Digite seu nome para adicionar uma reserva.");

        return;
    }


    reservas.push(nome);

    inputNome.value = "";

    atualizarLista();
    atualizarContador();
}



function atualizarLista() {

    const lista = document.querySelector("#listaReservas");

    lista.innerHTML = "";


    reservas.forEach(function(nome, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${nome}</span>

            <button
                class="btn-remover"
                onclick="removerReserva(${index})"
            >
                Remover
            </button>
        `;

        lista.appendChild(li);
    });
}

function removerReserva(index) {

    reservas.splice(index, 1);

    atualizarLista();
    atualizarContador();
}


function atualizarContador() {

    const contador = document.querySelector("#contador");

    const total = reservas.length;


    if (total === 1) {

        contador.textContent = "1 reserva";

    } else {

        contador.textContent = `${total} reservas`;
    }
}


function alternarTema() {

    document.body.classList.toggle("dark");

    const botao = document.querySelector("#temaBtn");

    if (document.body.classList.contains("dark")) {

        botao.textContent = "Modo claro";

    } else {

        botao.textContent = "Modo escuro";
    }
}


document.querySelector("#nome").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        adicionarReserva();
    }
});