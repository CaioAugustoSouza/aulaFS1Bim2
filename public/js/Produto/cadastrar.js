document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnGravar");

    btnGravar.addEventListener("click", gravarProduto);

    var inputImg = document.getElementById('inputImagem');

    inputImg.addEventListener('change', exibirPrevia)

})

function exibirPrevia(){
    let imagem = document.getElementById('inputImagem').files[0];

    let ext = imagem.type.split('/').pop();
    if (ext == 'png' || ext =='jpg' || ext=='jpeg'){
        let imgPrevia = document.getElementById('imgPrevia');
        let obgImg = URL.createObjectURL(imagem);
        imgPrevia.setAttribute('src',obgImg);
        document.getElementById('previaImagem').style['display'] = 'block'
    }
    else{
        alert('Extensão de imagem inválida');
        document.getElementById('inputImagem').value = '';
    }


}   


function gravarProduto() {

    var inputCodigo = document.getElementById("inputCodigo");
    var inputNome = document.getElementById("inputNome");
    var inputQtde = document.getElementById("inputQtde");
    var selMarca = document.getElementById("selMarca");
    var selCategoria = document.getElementById("selCategoria");
    var inputValor = document.getElementById('inputValor');
    let inputFile = document.getElementById('inputImagem').files[0];

    //if de validação básica
    if(inputCodigo.value != "" && inputNome.value != "" && inputQtde.value != "" && inputQtde.value != '0' && selMarca.value != '0' && selCategoria.value != '0' && inputValor!='' && inputFile != null){

        // var data = {
        //     codigo: inputCodigo.value,
        //     nome: inputNome.value,
        //     quantidade: inputQtde.value,
        //     marca: selMarca.value,
        //     categoria: selCategoria.value
        // }

        var data = new FormData();
        data.append('codigo', inputCodigo.value)
        data.append('nome', inputNome.value)
        data.append('quantidade', inputQtde.value)
        data.append('selMarca', selMarca.value)
        data.append('selCategoria', selCategoria.value)
        data.append('codigo', inputCodigo.value)
        data.append('valor', inputValor.value)
        data.append('imagem', inputFile)

        fetch('/produto/cadastro', {
            method: "POST",
            // headers: {

            // },
            body: data
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Produto cadastrado!");
            }
            else{
                alert("Erro ao cadastrar produto");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Preencha todos os campos corretamente!");
        return;
    }
}