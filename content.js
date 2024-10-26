// Função para processar as postagens
function processPosts() {
    const posts = document.querySelectorAll('.post.reply, .opContainer');
    const threads = document.querySelectorAll('.postContainer.opContainer');
    const linksArray = []; // Array para armazenar os links
    let id = null; // Variável para armazenar um único ID

    // Itera sobre os elementos selecionados
    threads.forEach(thread => {
        const threadId = thread.getAttribute('id'); // Obtém o valor do atributo id
        if (threadId) {
            // Extrai os números do id usando uma expressão regular
            const number = threadId.match(/\d+/); // Encontra a primeira sequência de dígitos
            if (number) {
                id = number[0]; // Armazena o número na variável id
            }
        }
    });

    // Exibe o ID no console
    console.log(id);

    posts.forEach(post => {
        const fileThumb = post.querySelector('.fileThumb');
        if (fileThumb) {
            post.style.backgroundColor = 'red'; 
            fileThumb.style.backgroundColor = 'yellow'; 
            fileThumb.style.border = '5px solid yellow'; 
            fileThumb.style.display = 'inline-block'; 
            fileThumb.style.padding = '5px'; 

            const href = fileThumb.getAttribute('href');
            linksArray.push('https:'+href); // Armazena o href no array
            console.log(`Link added to array: ${href}`); 
        }
    });

    // Armazena o array no storage do Chrome
    chrome.storage.local.set({ id: id }, () => {
        console.log('ID stored in local storage');
    });

    // Armazena o array no storage do Chrome
    chrome.storage.local.set({ linksArray: linksArray }, () => {
        console.log('Links stored in local storage');
    });
}

// Executa a função quando o conteúdo da página for carregado
processPosts();
