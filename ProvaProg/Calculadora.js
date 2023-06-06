var produtos = []; // Declaração de uma variável que será usada para armazenar os produtos.

function adicionarProduto() {
  var produto = document.getElementById("produto").value; // Obtém o valor do campo de entrada do produto.
  var valor = parseFloat(document.getElementById("valor").value); // Obtém o valor do campo de entrada do valor e converte para um número.
  var dividir = document.getElementById("dividir").value; // Obtém o valor selecionado no campo de seleção "Dividir".

  if (produto === "" || isNaN(valor)) {
    // Verifica se o produto ou o valor é inválido.
    return; // Sai da função se o produto ou o valor for inválido.
  }

  produtos.push({
    // Adiciona um novo objeto de produto ao array de produtos.
    nome: produto,
    valor: valor,
    dividir: dividir === "sim", // Define a propriedade dividir como true se o valor for "sim", caso contrário, false.
    pessoas: [], // Inicializa a propriedade pessoas como um array vazio.
  });

  var pessoasDiv = document.getElementById("pessoas"); // Obtém a referência à div onde serão adicionadas as informações das pessoas.
  pessoasDiv.innerHTML = ""; // Limpa o conteúdo atual da div.

  produtos.forEach(function (produto) {
    // Itera sobre cada produto no array de produtos.
    var div = document.createElement("div"); // Cria um elemento <div>.
    div.classList.add("input-group"); // Adiciona a classe "input-group" ao elemento <div>.

    var label = document.createElement("label"); // Cria um elemento <label>.
    label.textContent = produto.nome + " (" + produto.valor.toFixed(2) + "): "; // Define o texto do label com o nome e valor do produto formatado.
    div.appendChild(label); // Adiciona o label ao elemento <div>.

    var addButton = document.createElement("button"); // Cria um elemento <button>.
    addButton.textContent = "+"; // Define o texto do botão como "+".
    addButton.onclick = function () {
      // Define a função a ser executada quando o botão for clicado.
      adicionarPessoa(produto); // Chama a função adicionarPessoa passando o objeto produto como argumento.
    };
    div.appendChild(addButton); // Adiciona o botão ao elemento <div>.

    pessoasDiv.appendChild(div); // Adiciona o elemento <div> à div de pessoas.
  });

  document.getElementById("produto").value = ""; // Limpa o campo de entrada do produto.
  document.getElementById("valor").value = ""; // Limpa o campo de entrada do valor.
}

// Função para adicionar uma pessoa ao produto.
function adicionarPessoa(produto) {
  var nome = prompt("Digite o nome da pessoa que comprou o produto:"); // Pede ao usuário para digitar o nome da pessoa.

  if (nome === "" || nome === null) {
    // Verifica se o nome é vazio ou se o usuário cancelou a entrada.
    return; // Sai da função se o nome for vazio ou nulo.
  }

  var quantidade = parseInt(
    prompt("Digite a quantidade comprada por " + nome + ":")
  ); // Pede ao usuário para digitar a quantidade comprada.

  if (isNaN(quantidade) || quantidade <= 0) {
    // Verifica se a quantidade é inválida.
    return; // Sai da função se a quantidade for inválida.
  }

  var clienteExistente = produto.pessoas.find(function (pessoa) {
    // Verifica se a pessoa já existe no objeto do produto.
    return pessoa.nome === nome;
  });

  if (clienteExistente) {
    // Se a pessoa já existe no objeto do produto.
    alert("Cliente já existe. Adicione apenas a quantidade comprada.");
    clienteExistente.quantidade += quantidade; // Aumenta a quantidade do cliente existente.
  } else {
    // Se a pessoa não existe no objeto do produto.
    var pagarTaxa = confirm("A pessoa " + nome + " irá pagar a taxa de 10%?"); // Pergunta ao usuário se a pessoa pagará a taxa.

    produto.pessoas.push({
      // Adiciona um novo objeto de pessoa ao array de pessoas do produto.
      nome: nome,
      quantidade: quantidade,
      pagarTaxa: pagarTaxa,
    });
  }
}

function calcularDivisao() {
  var resultadoDiv = document.getElementById("resultado"); // Obtém a referência à div onde será exibido o resultado.
  resultadoDiv.innerHTML = ""; // Limpa o conteúdo atual da div.

  var somaGastos = {}; // Objeto para armazenar a soma dos gastos por pessoa.

  produtos.forEach(function (produto) {
    // Itera sobre cada produto no array de produtos.
    produto.pessoas.forEach(function (pessoa) {
      // Itera sobre cada pessoa no array de pessoas do produto.
      var valorPorPessoa = 0; // Variável para armazenar o valor por pessoa.

      if (produto.dividir) {
        // Se o produto deve ser dividido igualmente entre as pessoas.
        valorPorPessoa =
          (produto.valor * pessoa.quantidade) / produto.pessoas.length; // Calcula o valor por pessoa dividindo o valor do produto pelo número de pessoas.

        if (pessoa.pagarTaxa) {
          // Se a pessoa deve pagar a taxa de 10%.
          valorPorPessoa *= 1.1; // Adiciona a taxa de 10% ao valor por pessoa.
        }
      } else {
        // Se o produto não deve ser dividido igualmente.
        valorPorPessoa = produto.valor * pessoa.quantidade; // Calcula o valor por pessoa multiplicando o valor do produto pela quantidade comprada pela pessoa.

        if (pessoa.pagarTaxa) {
          // Se a pessoa deve pagar a taxa de 10%.
          valorPorPessoa *= 1.1; // Adiciona a taxa de 10% ao valor por pessoa.
        }
      }

      var resultado = pessoa.nome + ": R$ " + valorPorPessoa.toFixed(2); // Cria uma string com o nome da pessoa e o valor por pessoa formatado.
      resultadoDiv.innerHTML += resultado + "<br>"; // Adiciona o resultado à div de resultado.

      if (!somaGastos[pessoa.nome]) {
        // Se a pessoa ainda não existe no objeto de soma de gastos.
        somaGastos[pessoa.nome] = 0; // Inicializa o valor da pessoa como 0.
      }
      somaGastos[pessoa.nome] += valorPorPessoa; // Adiciona o valor por pessoa ao total de gastos da pessoa.
    });
  });

  resultadoDiv.innerHTML += "<h2>Soma dos Gastos:</h2>"; // Adiciona um cabeçalho para a soma dos gastos na div de resultado.

  for (var pessoa in somaGastos) {
    // Itera sobre cada pessoa no objeto de soma de gastos.
    var valorTotal = somaGastos[pessoa].toFixed(2); // Obtém o valor total gasto pela pessoa formatado com 2 casas decimais.
    resultadoDiv.innerHTML += pessoa + ": R$ " + valorTotal + "<br>"; // Adiciona o nome da pessoa e o valor total gasto à div de resultado.
  }
}
