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
        } else {
            alert("Erro ao cadastrar pessoa.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});
