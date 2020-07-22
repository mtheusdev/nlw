function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url).then(res => res.json()).then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })

}
document.querySelector("select[name=uf]").addEventListener("change", getCities)

// itens de coleta

// pegar todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid li")

const colletectedItems = document.querySelector("input[name=items]")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selecteItems = []

function handleSelectedItem(event) {
    // adicionar ou remover uma classe com js
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id // pega id (nomes)
        // console.log(itemId)

    // verificar se existem items selecionados, se sim 
    // pegar os items selecionados
    const alreadSelected = selecteItems.findIndex(function(item) {
            const itemFound = item === itemId // true or false
            return itemFound
                //item => item == itemId
        })
        // se ja estiver selecionado, tirar da seleção
    if (alreadSelected != -1) { // -1 se não tem nada no array de items selecionados
        // tirar da seleção
        const filteredItems = selecteItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selecteItems = filteredItems

    } else {
        //se não estiver selecionado, adicionar a seleção
        selecteItems.push(itemId)
    }

    //console.log(selecteItems)
    // atualizar o campo escondido com os dados selecionados
    colletectedItems.value = selecteItems


}