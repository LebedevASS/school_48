function runCode() {
    let output = document.getElementById("output");
    output.innerHTML = '';
    let code = document.getElementById("code").value;
    Sk.configure({output:outf, read:builtinRead});
    let module = Sk.importMainWithBody("<stdin>",false,code);
  }

  function outf(text) {
    let output = document.getElementById("output");
    output.innerHTML += text;
  }

  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }