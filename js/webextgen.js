(function () {
  var webExtName;
  var webExtZip;

  function generateExtensionName() {
    var chain = new Foswig(2);
    chain.addWordsToChain(window.__webextZipNames);
    function genWord() {
      return chain.generateWord(5,10,false);
    }
    return [genWord(), genWord(), genWord()]
      .join('-').toLowerCase().replace(' ', '');
  }

  function buildZip(name) {
    var zip = new JSZip();
    var manifest = {
      manifest_version: 2,
      version: '1.0',
      description: 'A test extension from webext-generator.',
      icons: {
        48: 'icons/border-48.png'
      },
    };
    manifest.name = webExtName;
    zip.file('manifest.json', JSON.stringify(manifest, null, 4));
    return zip;
  }

  function generate() {
    webExtName = generateExtensionName();
    webExtZip = buildZip(webExtName);
    document.getElementById('zipname').innerText = webExtName + '.zip';
  }

  generate();

  var refreshButton = document.getElementById('refresh');
  var downloadButton = document.getElementById('download');
  refreshButton.addEventListener('click', generate, false);

  if (JSZip.support.blob) {
    function downloadWithBlob() {
      webExtZip.generateAsync({type: 'blob'}).then(function (blob) {
        saveAs(blob, webExtName + '.zip');
      }, function (err) {
        console.error(err);
      });
      return false;
    }
    downloadButton.addEventListener('click', downloadWithBlob, false);
  } else {
    downloadButton.innerText += ' (not supported on this browser)';
    downloadButton.setAttribute('disabled', true);
  }
})();

