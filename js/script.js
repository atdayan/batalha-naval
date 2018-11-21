// gerar os navios e seus lugares aleatoriamente
// deixar o jogador fazer sua jogada
// comparar pra ver se acertou
// apagar célula correspondente da tabela

let jogo = (function () {
	let _celulas = [];
	let _navios  = [];

	let comparar = function () {
		console.log('eae gay');
	}
	
	let getCelulas = function () {
		let tbl = document.getElementById('tab-adversario');
		_celulas = Array.from(tbl.getElementsByTagName('td')); //converte pois eh retornado HTMLCollection

		_celulas.forEach((elem) => {
			elem.addEventListener('click', comparar);
		});
	}

	let iniciar = function () {
		getCelulas();
	}

	return {
		iniciar: iniciar,
	}
})();
jogo.iniciar();
