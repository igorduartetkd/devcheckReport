const resultadoSelect = document.getElementById("resultado");
const analiseSelect = document.getElementById("analise");

const closeBtn = document.createElement("button");

const revisao = document.getElementById("revisao");
const problemas = document.getElementById("problemas");
const riscos = document.getElementById("riscos");
const recomendacoes = document.getElementById("recomendacoes");
const qa = document.getElementById("qa");

const btnClear = document.getElementById("clear");
const btnGenerate = document.getElementById("generate");

const result = document.getElementById("result");
const form = document.getElementById('form');



function clearForm(event) {
	const confirmacao = confirm("Essa ação irá limpar o formulário");
	if (confirmacao) {
		form.reset();
	}
}

function generateReport(event) {
	event.preventDefault();
	result.innerHTML = "";
	const report = createReportCard();
	result.appendChild(report);
	alert("Relatório copiado para área de transferência");
}

function createReportCard() {
	const legibilidade_radio = document.querySelector('input[name="legibilidade"]:checked');
	const manutenibilidade_radio = document.querySelector('input[name="manutenibilidade"]:checked');
	const conformidade_radio = document.querySelector('input[name="conformidade"]:checked');
	const eficiencia_radio = document.querySelector('input[name="eficiencia"]:checked');
	const confiabilidade_radio = document.querySelector('input[name="confiabilidade"]:checked');

	const modal = document.createElement("div");
	modal.classList.add("modal");
	const divContainer = document.createElement("div");
	divContainer.classList.add("container-report");
	const paragrafo = document.createElement("p");

	closeBtn.innerText = "Fechar";
	closeBtn.classList.add("btnClose");

	divContainer.append(paragrafo, closeBtn);
	modal.appendChild(divContainer);

	const comentarioGerado = `h1. DevCheck finalizado com ${resultadoSelect.value}
* Minha análise foi: ${analiseSelect.value}
* Minha avaliação com relação a qualidade do código escrito de acordo com:
** Legibilidade: ${legibilidade_radio.value}
** Manutenibilidade: ${manutenibilidade_radio.value}
** Conformidade: ${conformidade_radio.value}
** Eficiência: ${eficiencia_radio.value}
* Meu nível de confiança da solução implementada: ${confiabilidade_radio.value}

h1. Revisão do report do desenvolvedor
${revisao.value}

h1. Riscos
${riscos.value}

h1. Problemas
${problemas.value}

h1. Recomendações para um próximo ticket
${recomendacoes.value}

h1. Recomendações para QA
${qa.value}`;
	paragrafo.innerText = comentarioGerado
	try{
		navigator.clipboard.writeText(comentarioGerado)
	} catch (error) {
		console.error('Ocorreu um erro ao copiar para o clipboard:', error);
	}

	return modal;
}

btnClear.addEventListener("click", clearForm);
form.addEventListener("submit", generateReport);
closeBtn.addEventListener("click", function () {
	result.innerHTML = "";
});
