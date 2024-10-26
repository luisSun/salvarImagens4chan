// Função para mostrar os links armazenados no popup
function displayLinks() {
    const linksList = document.getElementById('linksList');

    chrome.storage.local.get(['linksArray', 'id'], (result) => {
        const links = result.linksArray || [];
        const id = result.id; // Recupera o ID armazenado

        links.forEach(link => {
            const li = document.createElement('li');
            li.textContent = link; // Define o texto do item como o link
            linksList.appendChild(li); // Adiciona o item à lista
        });
    });
}

// Função para baixar as imagens
function downloadImages() {
    chrome.storage.local.get(['linksArray', 'id'], (result) => {
        const links = result.linksArray || [];
        const id = result.id; // Recupera o ID armazenado

        // Verifica se há links para baixar
        if (links.length === 0) {
            alert("Não há links disponíveis para download.");
            return; // Sai da função se não houver links
        }

        links.forEach(link => {
            const fileName = link.split('/').pop(); // Obtém o nome do arquivo da URL

            // Inicia o download de cada imagem
            chrome.downloads.download({
                url: link.startsWith("http") ? link : "https:" + link, // Assegura que o link seja absoluto
                filename: `4ChanRip/${id}/${fileName}`, // Adiciona o ID ao nome do arquivo
                saveAs: false // Define como false para evitar a caixa de diálogo "Salvar como"
            }, (downloadId) => {
                if (chrome.runtime.lastError) {
                    console.error("Erro ao iniciar o download:", chrome.runtime.lastError.message);
                } else {
                    console.log(`Download iniciado para: ${link}`);
                }
            });
        });
    });
}

// Adiciona o evento de clique ao botão de download
document.getElementById('downloadButton').addEventListener('click', downloadImages);

// Executa a função ao abrir o popup
displayLinks();
