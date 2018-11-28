// gerar os navios com id's correspondentes aos do tabuleiro
// esperar pelo clique do usuario na celula do tabuleiro
// comparar o id do navio com o id do <td> clicado pelo usuario

let jogo = (function () {
	let _celulas = [];
	let _navios = [];

	// esta funcao so serve para deixar mais legivel o codigo das outras funcoes 
	let numAleat = function (max) {	return Math.floor(Math.random() * max);}
	let fimDeJogo = function () {location.href = 'fimdejogo.html';}
	let colorirCelula = function (tentativa, cell) {
		if (tentativa == 'acerto') cell.style.background = 'black';
		if (tentativa == 'erro') cell.style.background = '#276B94';
	}

	let gerarNavios = function () {
		let letras = 'abcdefgh';
		let aLetra;
		let oNumero;
		let navio;
		let direcao;
		let idsUsados = [];
		let sobrepos;

		let cont = 0;
		while (cont < 5) {
			navio = [];
			direcao = numAleat(2); //0 == vert, 1 == horiz
			sobrepos = false;

			if (direcao == 0) { // nao pode 7 e 8
				aLetra = letras[numAleat(8)];
				oNumero = numAleat(6) + 1;
	
				navio[0] = aLetra + oNumero;
				navio[1] = aLetra + (oNumero + 1);
				navio[2] = aLetra + (oNumero + 2);

			} else { // nao pode G ou H
				index = numAleat(6);
				oNumero = numAleat(8) + 1;
	
				navio[0] = letras[index] + oNumero;
				navio[1] = letras[index+1] + oNumero;
				navio[2] = letras[index+2] + oNumero;
			}

			// compara, id a id, se este navio gerado esta sobrepondo outro ja existente
			if (idsUsados != undefined) {
				for (let i = 0; i < navio.length; i++) {
					for (let j = 0; j < idsUsados.length; j++) {
						if (navio[i] === idsUsados[j]) {
							sobrepos = true;
							break;
						}
					}
				}
			}

			// se sobrepos, reinicie o processo de geracao deste navio, ate nao ter nenhum sobreposto
			if(sobrepos) 
				continue;

			cont++;

			idsUsados.push(navio[0]);
			idsUsados.push(navio[1]);
			idsUsados.push(navio[2]);

			_navios.push(navio);
		}//!loop


		_navios.forEach(e => console.log(e));
	}

	let checarACelula = function () {
		let cell = '';
		let navioDestr = [];
		let palpite = this.id;
		let navioAtual = [];
		let acertou = false;
		

		// este percorre os navios
		for (let i = 0; i < _navios.length; i++) {
			navioAtual = _navios[i];

			// este loop percorre cada pedaco do navio
			for (let j = 0; j < navioAtual.length; j++) {

				//aqui compara se o palpite acertou
				if (palpite === navioAtual[j]) { 

					cell = navioAtual.splice(j, 1); // retire aquele pedaco do vetor de navios
					colorirCelula('acerto', this); // pinte a celula com a cor designada (preto).
					acertou = true;
					
					console.log('acertou '+ cell);
					
					// se aquele navio nao tiver mais nenhum pedaco...
					if (navioAtual.length == 0) { 
						_navios.splice(_navios[i], 1);
						console.log('destruiu!!!');
					}
				}
			}//!loop
		}//!loop

		// se o usuario errou o tiro...
		if (!acertou) { 
			console.log('errou');
			colorirCelula('erro', this);
		}

		//remove o ouvinte de evento da celula clicada, para nao contar mais de uma vez a mesma celula
		this.removeEventListener('click', checarACelula);
		
		// se todos os navios tiverem sido destruidos
		if (_navios.length == 0) { 
			console.log('fim');
			fimDeJogo();
		}
	}

	let construirTabuleiro = function () {
		let tabela = document.getElementById('tabela');
		let tds = Array.from(tabela.getElementsByTagName('td')); //converte pq eh retornado um HTMLCollection
 		
 		// faz com que _celulas so receba os tds com id (exclui as linhas de letra e numeros (A-H, 1-8))
		tds.forEach((td) => {
			if (td.id != '')
				_celulas.push(td);
		});
		
		// adiciona o evento de clique para cada célula do tabuleiro
		_celulas.forEach((celula) => {
			celula.addEventListener('click', checarACelula);
		});


	}

	let iniciar = function () {
		gerarNavios();
		construirTabuleiro();
	};

	return {
		iniciar: iniciar, cell : _navios
	}
})();
jogo.iniciar();
