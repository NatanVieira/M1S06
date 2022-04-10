let alterarTitulo = () => {
    const titulo = document.getElementById("titulo");
    titulo.innerText = "Titulo da página alterado";
}

let calcular = () => {
    const numero1 = Number(document.getElementById("numero1").value);
    const numero2 = Number(document.getElementById("numero2").value);
    const operadores = document.getElementById("operador");
    const operador = operadores.options[operadores.selectedIndex].value;
    const resultadoDiv = document.getElementById("resultado");

    let resultado;
    switch(operador){
        case '+':
            resultado = numero1 + numero2;
            break;
        case '-':
            resultado = numero1 - numero2;
            break;
        case '*':
            resultado = numero1 * numero2;
            break;
        case '/':
            resultado = numero1 / numero2;
            break;
    }
    const paragrafoResultado = document.createElement('p') 
    resultadoDiv.appendChild(paragrafoResultado);
    paragrafoResultado.innerText = `O resultado é: ${resultado}`;
}

const fetchApiCep = async(cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    if(response.ok)
        return await response.json();
}

const buscarCep = async () => {
    const cep = document.getElementById("cep").value;
    const resposta = await fetchApiCep(cep);
    if(resposta){
        console.log(`O endereço é: ${resposta.logradouro} - Bairro: ${resposta.bairro} - Cidade: ${resposta.localidade} - UF: ${resposta.uf}`);
    }
    else
        console.log("Sem resultado");
}