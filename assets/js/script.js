// Luan Marqueti

function adicionarLinha(e) {

    e.preventDefault();

    let inputNome = document.querySelector('#nome').value;
    let inputPeso = parseFloat(document.querySelector('#peso').value);
    let inputAltura = parseFloat(document.querySelector('#altura').value);

    if (inputNome == "" || isNaN(inputPeso) || isNaN(inputAltura) ) {

        console.error("Preencha todos os campos.");

    } else {

        let tabela = document.querySelector("#tabela tbody");
    
        if (inputPeso <= 0 || inputAltura <= 0) {

            console.error("Valores inválidos");
            
        } else {
    
            let imc = calcularImc(inputPeso, inputAltura);
            let status = verificarStatus(imc);
        
            let tr = document.createElement("tr");
    
            let td1 = document.createElement("td");
            td1.innerHTML = inputNome;
    
            let td2 = document.createElement("td");
            td2.innerHTML = inputPeso;
    
            let td3 = document.createElement("td");
            td3.innerHTML = inputAltura;
    
            let td4 = document.createElement("td");
            td4.classList.add("imc");
            td4.innerHTML = imc;
    
            let td5 = document.createElement("td");
            td5.innerHTML = status;

            bExcluir = document.createElement("button");
            bExcluir.innerText = "Excluir";
            bExcluir.classList.add("excluir");
            bExcluir.addEventListener("click", excluirLinha);

            bAumentarPeso = document.createElement("button");
            bAumentarPeso.innerText = "+ Peso";
            bAumentarPeso.classList.add("acrescPeso");
            bAumentarPeso.addEventListener("click", acrescentarPeso);

            bDiminuirPeso = document.createElement("button");
            bDiminuirPeso.innerText = "- Peso";
            bDiminuirPeso.classList.add("diminPeso");
            bDiminuirPeso.addEventListener("click", diminuirPeso);

            let td6 = document.createElement("td");
            td6.append(bExcluir);
            td6.append(bAumentarPeso);
            td6.append(bDiminuirPeso);
    
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
    
            tabela.append(tr);
            
        }

    }

}


function acrescentarPeso(e) {

    let elemento = e.target;

    let colunaPeso = elemento.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;

    let colunaAltura = elemento.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;

    pesoFloat = parseFloat(colunaPeso.innerHTML);
    pesoFloat += 0.5;
    colunaPeso.innerHTML = pesoFloat.toString();
    
    let colunaImc = colunaPeso.nextElementSibling.nextElementSibling;
    colunaImc.innerHTML = calcularImc(parseFloat(colunaPeso.innerHTML), parseFloat(colunaAltura.innerHTML));

    let colunaStatus = colunaPeso.nextElementSibling.nextElementSibling.nextElementSibling;
    colunaStatus.innerHTML = verificarStatus(colunaImc.innerHTML);

}


function diminuirPeso(e) {

    let elemento = e.target;

    let colunaPeso = elemento.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;

    let colunaAltura = elemento.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;

    pesoFloat = parseFloat(colunaPeso.innerHTML);
    pesoFloat -= 0.5;
    colunaPeso.innerHTML = pesoFloat.toString();

    let colunaImc = colunaPeso.nextElementSibling.nextElementSibling;
    colunaImc.innerHTML = calcularImc(parseFloat(colunaPeso.innerHTML), parseFloat(colunaAltura.innerHTML));

    let colunaStatus = colunaPeso.nextElementSibling.nextElementSibling.nextElementSibling;

    colunaStatus.innerHTML = verificarStatus(colunaImc.innerHTML);

}


function excluirLinha(e) {

    let elemento = e.target;

    elemento.parentElement.parentElement.remove();

}


function calcularImc(peso, altura) {

    let imc = parseFloat((peso / altura**2));

    return parseFloat(imc.toFixed(1));

}


function verificarStatus(imc) {

    if (imc < 18.5) {
        return "Magreza";
    } else if (imc >= 18.5 && imc <= 24.9) {
        return "Saudável";
    } else if (imc >= 25.0 && imc <= 29.9) {
        return "Sobrepeso";
    } else if (imc >= 30.0 && imc <= 34.9) {
        return "Obesidade I";
    } else if (imc >= 35.0 && imc <= 39.9) {
        return "Obesidade II";
    } else if (imc >= 40.0) {
        return "Obesidade III";
    }

}


function verificarMaiorImc(e) {

    let maiorImc = 0;

    e.preventDefault();

    let listaDeImcs = document.querySelectorAll(".imc");

    if (listaDeImcs.length > 0) {

        let elementoAserRemovido;

        for (elemento of listaDeImcs) {

            valorNumericoImcElemento = parseFloat(elemento.innerHTML);

            if ( valorNumericoImcElemento > maiorImc) {

                maiorImc = valorNumericoImcElemento;
                elementoAserRemovido = elemento;

            }
        };
        elementoAserRemovido.parentElement.remove();
    }
    
}


function verificarMenorImc(e) {

    let menorImc = Math.pow(10, 100);

    e.preventDefault();

    let listaDeImcs = document.querySelectorAll(".imc");

    if (listaDeImcs.length > 0) {

        let elementoAserRemovido;

        for (elemento of listaDeImcs) {

            valorNumericoImcElemento = parseFloat(elemento.innerHTML);
            if ( valorNumericoImcElemento < menorImc) {

                menorImc = valorNumericoImcElemento;
                elementoAserRemovido = elemento;

            }

        };

        elementoAserRemovido.parentElement.remove();
    }

}


let botaoEnviar = document.querySelector("#enviar");
botaoEnviar.addEventListener("click", adicionarLinha);

let BotaoRemoverMaiorImc = document.querySelector("#removerMaiorImc");
BotaoRemoverMaiorImc.addEventListener("click", verificarMaiorImc);

let BotaoRemoverMenorImc = document.querySelector("#removerMenorImc");
BotaoRemoverMenorImc.addEventListener("click", verificarMenorImc);