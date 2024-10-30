async function fetchPessoas() {
    try {
        const response = await fetch("http://localhost:3000/api/pessoas"); // Atualize a porta se necessário
        if (response.ok) {
            const pessoas = await response.json();
            const lista = document.getElementById("pessoa-lista");
            lista.innerHTML = ""; // Limpa a lista para evitar duplicações

            pessoas.forEach(pessoa => {
                const item = document.createElement("li");
                item.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}`;
                lista.appendChild(item);
            });
        } else {
            console.error("Erro ao buscar pessoas");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
fetchPessoas();

document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Coleta os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    // Cria o objeto a ser enviado
    const dados = { nome, idade };

    try {
        // Faz uma requisição POST para o endpoint da API
        const resposta = await fetch("http://localhost:3000/api/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        // Verifica se a resposta foi bem-sucedida
        if (resposta.ok) {
            const respostaJson = await resposta.json();
            alert(respostaJson.message);
        } else {
            alert("Erro ao cadastrar pessoa.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});
