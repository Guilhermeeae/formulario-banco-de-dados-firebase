// Importar o Firebase e inicializar a aplicação
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js';

// Configuração do Firebase
import { firebaseConfig } from './firebase-config.js';

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referenciar o formulário
const solicitacaoForm = document.getElementById('solicitacaoForm');
const mensagemSucesso = document.getElementById('mensagemSucesso');

// Função para validar CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove tudo que não é dígito

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
}

// Função para enviar os dados do formulário para o Firebase
function enviarSolicitacao(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nomeSolicitante = document.getElementById('nomeSolicitante').value;
    const cargoSolicitante = document.getElementById('cargoSolicitante').value;
    const nomeEmpresa = document.getElementById('nomeEmpresa').value;
    const cnpj = document.getElementById('cnpj').value;
    const setor = document.getElementById('setor').value;
    const telefoneContato = document.getElementById('telefoneContato').value;
    const emailSolicitante = document.getElementById('emailSolicitante').value;
    const dataSolicitacao = document.getElementById('dataSolicitacao').value;
    const urgencia = document.getElementById('urgencia').value;
    const observacoes = document.getElementById('observacoes').value;

    const problemaPrincipal = document.getElementById('problemaPrincipal').value;
    const descricaoDetalhada = document.getElementById('descricaoDetalhada').value;
    const impacto = document.getElementById('impacto').value;
    const outrosProblemas = document.getElementById('outrosProblemas').value;
    const perguntaOpcional = document.getElementById('perguntaOpcional').value;

    // Validação do CNPJ
    if (!validarCNPJ(cnpj)) {
        alert('CNPJ inválido. Por favor, insira um CNPJ válido.');
        return;
    }

    // Estrutura dos dados a serem enviados
    const dadosSolicitacao = {
        nomeSolicitante,
        cargoSolicitante,
        nomeEmpresa,
        cnpj,
        setor,
        telefoneContato,
        emailSolicitante,
        dataSolicitacao,
        urgencia,
        observacoes,
        problemaPrincipal,
        descricaoDetalhada,
        impacto,
        outrosProblemas,
        perguntaOpcional
    };

    // Referência no Firebase
    const novaSolicitacaoRef = ref(database, 'solicitacoes/' + Date.now());

    // Salvar dados no Firebase
    set(novaSolicitacaoRef, dadosSolicitacao)
        .then(() => {
            // Exibir mensagem de sucesso
            mensagemSucesso.style.display = 'block';
            solicitacaoForm.reset(); // Limpar o formulário
        })
        .catch((error) => {
            console.error('Erro ao enviar os dados: ', error);
        });
}

// Listener para o envio do formulário
solicitacaoForm.addEventListener('submit', enviarSolicitacao);
