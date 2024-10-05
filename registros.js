// Inicialize o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDgOCX7AUlnTvkM2VQWU9ja9TIZ2dxIvo",
    authDomain: "yn-consultoria-logistica-bd.firebaseapp.com",
    projectId: "yn-consultoria-logistica-bd",
    storageBucket: "yn-consultoria-logistica-bd.appspot.com",
    messagingSenderId: "224192954537",
    appId: "1:224192954537:web:001329924bf31c08b8a9b8",
    measurementId: "G-HZLKW7KJZ2"
};

// Inicializa o Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência à coleção de registros
const registrosCollection = collection(db, 'solicitacoes');

// Elementos DOM
const registrosBody = document.getElementById('registrosBody');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeBtn = document.querySelector('.close');

// Dados do registro atual sendo editado
let currentEditId = null;

// Carregar os registros do Firestore e exibi-los
async function loadRegistros() {
    registrosBody.innerHTML = ''; // Limpa o corpo da tabela antes de recarregar

    const snapshot = await getDocs(registrosCollection);
    snapshot.forEach(doc => {
        const data = doc.data();
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${data.nomeSolicitante}</td>
            <td>${data.cargoSolicitante}</td>
            <td>${data.nomeEmpresa}</td>
            <td>${data.cnpj}</td>
            <td>${data.setor}</td>
            <td>${data.telefone}</td>
            <td>${data.email}</td>
            <td>${data.dataSolicitacao}</td>
            <td>${data.urgencia}</td>
            <td>${data.problemaPrincipal}</td>
            <td>${data.descricao}</td>
            <td>${data.impacto}</td>
            <td>${data.outrosProblemas}</td>
            <td>
                <button onclick="editRegistro('${doc.id}')">Editar</button>
                <button onclick="deleteRegistro('${doc.id}')">Excluir</button>
            </td>
        `;

        registrosBody.appendChild(tr);
    });
}

// Função para editar um registro
async function editRegistro(id) {
    currentEditId = id;
    const docRef = doc(db, 'solicitacoes', id);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();

        // Preenche o formulário de edição com os dados atuais
        editForm.editNomeSolicitante.value = data.nomeSolicitante;
        editForm.editCargoSolicitante.value = data.cargoSolicitante;
        editForm.editNomeEmpresa.value = data.nomeEmpresa;
        editForm.editCNPJ.value = data.cnpj;
        editForm.editSetor.value = data.setor;
        editForm.editTelefone.value = data.telefone;
        editForm.editEmail.value = data.email;
        editForm.editDataSolicitacao.value = data.dataSolicitacao;
        editForm.editUrgencia.value = data.urgencia;
        editForm.editProblemaPrincipal.value = data.problemaPrincipal;
        editForm.editDescricao.value = data.descricao;
        editForm.editImpacto.value = data.impacto;
        editForm.editOutrosProblemas.value = data.outrosProblemas;

        // Mostra o modal de edição
        editModal.style.display = 'block';
    }
}

// Função para atualizar os dados de um registro
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const docRef = doc(db, 'solicitacoes', currentEditId);

    await updateDoc(docRef, {
        nomeSolicitante: editForm.editNomeSolicitante.value,
        cargoSolicitante: editForm.editCargoSolicitante.value,
        nomeEmpresa: editForm.editNomeEmpresa.value,
        cnpj: editForm.editCNPJ.value,
        setor: editForm.editSetor.value,
        telefone: editForm.editTelefone.value,
        email: editForm.editEmail.value,
        dataSolicitacao: editForm.editDataSolicitacao.value,
        urgencia: editForm.editUrgencia.value,
        problemaPrincipal: editForm.editProblemaPrincipal.value,
        descricao: editForm.editDescricao.value,
        impacto: editForm.editImpacto.value,
        outrosProblemas: editForm.editOutrosProblemas.value
    });

    // Fecha o modal e recarrega os registros
    editModal.style.display = 'none';
    loadRegistros();
});

// Função para excluir um registro
async function deleteRegistro(id) {
    const docRef = doc(db, 'solicitacoes', id);
    await deleteDoc(docRef);

    // Recarrega a tabela após a exclusão
    loadRegistros();
}

// Fecha o modal de edição ao clicar no botão de fechar
closeBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Carrega os registros quando a página for carregada
window.onload = loadRegistros;
