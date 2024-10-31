async function fetchPessoas() {
    try {
        const response = await fetch("http://localhost:3000/api/pessoas");
        if (response.ok) {
            const pessoas = await response.json();
            const lista = document.getElementById("pessoa-lista");
            lista.innerHTML = "";

            pessoas.forEach(pessoa => {
                const item = document.createElement("li");
                item.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}`;

                const patchButton = document.createElement("button");
                patchButton.textContent = "Atualizar Parcial";
                patchButton.onclick = () => atualizarParcial(pessoa._id);

                const putButton = document.createElement("button");
                putButton.textContent = "Atualizar Completo";
                putButton.onclick = () => atualizarCompleto(pessoa._id);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Deletar";
                deleteButton.onclick = () => deletarPessoa(pessoa._id);

                item.appendChild(patchButton);
                item.appendChild(putButton);
                item.appendChild(deleteButton);
                lista.appendChild(item);
            });
        } else {
            console.error("Erro ao buscar pessoas");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

async function atualizarParcial(id) {
    const nome = prompt("Digite o novo nome (ou deixe em branco para não alterar):");
    const idade = prompt("Digite a nova idade (ou deixe em branco para não alterar):");
    
    // Cria um objeto com os campos que foram preenchidos
    const atualizacoes = {};
    if (nome) atualizacoes.nome = nome;
    if (idade) atualizacoes.idade = idade;

    try {
        const response = await fetch(`http://localhost:3000/api/pessoas/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atualizacoes)
        });

        if (response.ok) {
            alert("Atualização parcial realizada com sucesso!");
            fetchPessoas(); // Atualiza a lista
        } else {
            console.error("Erro ao atualizar pessoa");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

async function atualizarCompleto(id) {
    const nome = prompt("Digite o novo nome:");
    const idade = prompt("Digite a nova idade:");

    if (!nome || !idade) {
        alert("Por favor, preencha todos os campos para atualização completa.");
        return;
    }

    const dadosCompletos = { nome, idade };

    try {
        const response = await fetch(`http://localhost:3000/api/pessoas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosCompletos)
        });

        if (response.ok) {
            alert("Atualização completa realizada com sucesso!");
            fetchPessoas(); 
        } else {
            console.error("Erro ao atualizar pessoa");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

async function deletarPessoa(id) {
    if (confirm("Tem certeza que deseja deletar esta pessoa?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/pessoas/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                alert("Pessoa deletada com sucesso!");
                fetchPessoas(); 
            } else {
                alert("Erro ao deletar pessoa.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
}

fetchPessoas();

document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    
    const dados = { nome, idade };

    try {        
        const resposta = await fetch("http://localhost:3000/api/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        
        if (resposta.ok) {
            const respostaJson = await resposta.json();
            alert(respostaJson.message);

            fetchPessoas();

            console.log(document.getElementById("cadastroForm"));
            document.getElementById("cadastroForm").reset();

        } else {
            alert("Erro ao cadastrar pessoa.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});
