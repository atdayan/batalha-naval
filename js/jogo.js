// gerar os navios e seus lugares aleatoriamente
// deixar o jogador fazer sua jogada
// comparar pra ver se acertou
// apagar célula correspondente da tabela

let jogo = (function () {
	let _celulas = [];
	let _navios = [];

	// esta funcao so serve para deixar mais legivel o codigo das outras funcoes 
	let numAleat = function (max) {	return Math.floor(Math.random() * max);}

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
			navio = {};
			direcao = numAleat(2); //0 == vert, 1 == horiz
			sobrepos = false;

			if (direcao == 0) { // nao pode 7 e 8
				aLetra = letras[numAleat(8)];
				oNumero = numAleat(6) + 1;
	
				navio['id1'] = aLetra + oNumero;
				navio['id2'] = aLetra + (oNumero + 1);
				navio['id3'] = aLetra + (oNumero + 2);

			} else { // nao pode G ou H
				index = numAleat(6);
				oNumero = numAleat(8) + 1;
	
				navio['id1'] = letras[index] + oNumero;
				navio['id2'] = letras[index+1] + oNumero;
				navio['id3'] = letras[index+2] + oNumero;
			}

			if (idsUsados != undefined) {
				let valores = Object.values(navio);
				for (let i = 0; i < valores.length; i++) {
					for (let j = 0; j < idsUsados.length; j++) {
						if (valores[i] === idsUsados[j]) {
							sobrepos = true;
							break;
						}
					}
				}
			}

			if(sobrepos) continue;

			cont++;

			idsUsados.push(navio['id1']);
			idsUsados.push(navio['id2']);
			idsUsados.push(navio['id3']);

			_navios.push(navio);
		}//!loop
		return _navios;
	}

	let checarACelula = function () {

	}

	let construirTabuleiro = function () {
		let tabela = document.getElementById('tabela');
		let tds = Array.from(tabela.getElementsByTagName('td')); //converte pq eh retornado um HTMLCollection
 		
 		// faz com que _celulas so receba os tds com id (exclui as linhas de letra e numeros (A-H, 1-8))
		tds.forEach((td) => {
			if (td.id != '')
				_celulas.push(td);
		});

		_celulas.forEach((elem) => {
			elem.addEventListener('click', checarACelula)
		});
		return _celulas;
	}

	let iniciar = function () {
		console.log(gerarNavios());
		console.log(construirTabuleiro());
	};

	return {
		iniciar: iniciar
	}
})();
jogo.iniciar();
