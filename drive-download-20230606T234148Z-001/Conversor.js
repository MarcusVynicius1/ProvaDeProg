function converter() {
  var numero = document.getElementById("numero").value.toUpperCase();
  var resultado = document.getElementById("resultado");

  // Verifica se o número está vazio
  if (numero === "") {
    resultado.innerHTML = "Insira um número.";
    return;
  }

  // Chama a função correspondente com base na opção selecionada e verifica qual opção está marcada
  if (document.getElementById("opcao-arabico").checked) {
    // Verifica se o número é válido
    if (
      !/^\d+$/.test(numero) || // Verifica se o número contém apenas dígitos
      parseInt(numero) < 1 || // Verifica se o número é menor que 1
      parseInt(numero) > 3999 // Verifica se o número é maior que 3999
    ) {
      resultado.innerHTML = "Número inválido. Insira um valor entre 1 e 3999.";
      return;
    }

    var numeroRomano = converterArabicoParaRomano(parseInt(numero)); // Chama a função para converter de arábico para romano
    resultado.innerHTML = "Número Romano: " + numeroRomano; // Exibe o resultado convertido
  } else if (document.getElementById("opcao-romano").checked) {
    // Verifica se o número é válido
    if (!validarNumeroRomano(numero)) { // Chama a função para validar se o número romano é válido
      resultado.innerHTML = "Número inválido. Insira um número romano válido.";
      return;
    }

    var numeroArabico = converterRomanoParaArabico(numero); // Chama a função para converter de romano para arábico
    resultado.innerHTML = "Número Arábico: " + numeroArabico; // Exibe o resultado convertido
  }
}


function validarNumeroRomano(numero) {
  // Verifica se o número romano é válido
  return /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(
    numero
  );
}

function converterArabicoParaRomano(numero) {
  // Mapa de valores arábicos para seus equivalentes romanos
  var mapa = [
    { arabico: 1000, romano: "M" },
    { arabico: 900, romano: "CM" },
    { arabico: 500, romano: "D" },
    { arabico: 400, romano: "CD" },
    { arabico: 100, romano: "C" },
    { arabico: 90, romano: "XC" },
    { arabico: 50, romano: "L" },
    { arabico: 40, romano: "XL" },
    { arabico: 10, romano: "X" },
    { arabico: 9, romano: "IX" },
    { arabico: 5, romano: "V" },
    { arabico: 4, romano: "IV" },
    { arabico: 1, romano: "I" },
  ];

  // Variável para armazenar o número romano convertido
  var numeroRomano = "";

  // Itera sobre cada objeto no mapa
  for (var i = 0; i < mapa.length; i++) {
    // Enquanto o número fornecido for maior ou igual ao valor arábico atual
    while (numero >= mapa[i].arabico) {
      // Adiciona o caractere romano correspondente ao número romano
      numeroRomano += mapa[i].romano;
      // Subtrai o valor arábico atual do número fornecido
      numero -= mapa[i].arabico;
    }
  }

  // Retorna o número romano convertido
  return numeroRomano;
}


function converterRomanoParaArabico(numero) {
  // Mapa de valores romanos para seus equivalentes arábicos
  var mapa = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  // Variável para armazenar o número arábico convertido
  var numeroArabico = 0;

  // Itera sobre cada caractere do número romano
  for (var i = 0; i < numero.length; i++) {
    // Obtém o valor arábico correspondente ao caractere atual
    var valorAtual = mapa[numero.charAt(i)];
    // Obtém o valor arábico correspondente ao próximo caractere (se existir)
    var valorProximo = mapa[numero.charAt(i + 1)];

    // Verifica se o próximo valor existe e se o valor atual é menor que o próximo valor
    if (valorProximo && valorAtual < valorProximo) {
      // Subtrai o valor atual do número arábico
      numeroArabico -= valorAtual;
    } else {
      // Soma o valor atual ao número arábico
      numeroArabico += valorAtual;
    }
  }

  // Retorna o número arábico convertido
  return numeroArabico;
}
