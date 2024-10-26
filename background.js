chrome.action.onClicked.addListener((tab) => {
    console.log('Ícone da extensão clicado na aba:', tab);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: procurarEGuardarImagens
    });
  });
  
  function procurarEGuardarImagens() {
    console.log('Iniciando a busca de imagens na página');
    const links = Array.from(document.querySelectorAll('a.fileThumb, img')).map(a => a.href || a.src);
    console.log('Links de imagens encontrados:', links);
  
    links.forEach((link, index) => {
      const filename = `imagem_${index + 1}.jpg`;
      chrome.runtime.sendMessage({ link, filename });
      console.log(`Enviando mensagem para download: ${filename}`);
    });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Mensagem recebida para download:', request);
  
    if (request.action === 'iniciarDownload') {
      sendResponse({ success: true });
    }
  
    chrome.downloads.download({
      url: request.link,
      filename: `teste/${request.filename}`,
      conflictAction: 'overwrite'
    }, (downloadId) => {
      if (downloadId) {
        console.log(`Download iniciado com sucesso para o arquivo: ${request.filename}`);
      } else {
        console.log('Erro ao iniciar o download:', chrome.runtime.lastError);
      }
    });
  });
  