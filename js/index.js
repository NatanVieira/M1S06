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
const URL_CEP = 'https://viacep.com.br/ws';
const fetchApiCep = async(cep, uf, cidade, rua) => {
    let url_request = cep != '' && cep != null ? `${URL_CEP}/${cep}/json` : `${URL_CEP}/${uf}/${cidade}/${rua}/json`;
    const response = await fetch(url_request, {
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
    if(cep != null  && cep != '' && cep.length == 8){
        const resposta = await fetchApiCep(cep);
        if(resposta){
            if(!resposta.erro){
                // console.log(`O endereço é: ${resposta.logradouro} - Bairro: ${resposta.bairro} - Cidade: ${resposta.localidade} - UF: ${resposta.uf}`);
                const enderecoDiv = document.getElementById("endereco");
                enderecoDiv.innerHTML = '';
                const endereco = document.createElement('p');
                enderecoDiv.appendChild(endereco);
                endereco.innerText = `O endereço é: ${resposta.logradouro} - Bairro: ${resposta.bairro} - Cidade: ${resposta.localidade} - UF: ${resposta.uf}`;
            }
            else
                alert("Erro ao buscar dados...");
        }
        else
            alert("Sem resultados para a busca!")
    }
    else{
        if(cep == null || cep == '')
            alert("O campo cep não deve ser vazio");
        else
            alert("O tamanho do cep deve ser de 8 caracteres");
    }
}

const buscaCepPorEndereco = async () => {
    const uf = document.getElementById('uf').value.replace(' ','+');
    const cidade = document.getElementById('cidade').value.replace(' ','+');
    const rua = document.getElementById('rua').value.replace(' ','+');
    if(uf.length > 0 && cidade.length > 0 && rua.length > 0){
        if(uf.length == 2) {
            resposta = await fetchApiCep('',uf, cidade, rua);
            if(resposta){
                console.log(resposta);
            }
            else
                console.log("Deu ruim");
        }
        else
            alert("O campo UF deve ter exatamente 2 dígitos!");
    }
    else
        alert("Todos os campos devem ser preenchidos!");
}