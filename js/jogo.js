// gerar os navios e seus lugares aleatoriamente
// deixar o jogador fazer sua jogada
// comparar pra ver se acertou
// apagar célula correspondente da tabela

let jogo = (function () {
	let _celulas = [];
	let _navios = [];

	// esta funcao so serve para deixar mais legivel o codigo das outras funcoes 
	let numAleat = function (max) {	return Math.floor(Math.random() * max);}
	let fimDeJogo = function () {location.href = '../fimdejogo.html';}
	let colorirCelula = function (tentativa, cell) {
		if (tentativa == 'acerto') {
			cell.style.background = 'black';
		}
		if (tentativa == 'erro') {
			cell.style.background = '#276B94';
		}
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
		while (cont < 2) {
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

			if(sobrepos) 
				continue;

			cont++;

			idsUsados.push(navio[0]);
			idsUsados.push(navio[1]);
			idsUsados.push(navio[2]);

			_navios.push(navio);
		}//!loop
		console.log(_navios)
	}

	let checarACelula = function () {
		let cell = '';
		let navioDestr = [];
		let palpite = this.id;
		let errou = true;
		let navioAtual = [];
		
		for (let i = 0; i < _navios.length; i++) { // este percorre os navios
			navioAtual = _navios[i];

			for (let j = 0; j < navioAtual.length; j++) {
			
				if (palpite === navioAtual[j]) { //aqui compara se o palpite acertou

					errou = false;
					cell = navioAtual.splice(j, 1);
					colorirCelula('acerto', this);
					
					console.log('acertou '+ cell);
			
					if (navioAtual.length == 0) {
						_navios.splice(_navios[i], 1);
						console.log('destruiu!!!');
					}
				}
			}
		}
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
