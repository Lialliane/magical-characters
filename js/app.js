let chara_container = document.getElementsByClassName("container");
let selection_box = document.getElementById("houses")
let urlMagic = "https://hp-api.onrender.com/api/characters";
let character_data;


fetch(urlMagic).then(response => response.json()).then((data) =>{
    character_data = data;
    renderList();
}).catch(typeError);

selection_box.addEventListener("change", renderList);
selection_box.addEventListener("mousedown", (element) =>{ 
    element.target.value = '';}
);

function renderList() {
    chara_container[0].innerHTML = "";
    let chara_rendered = 0;
    for (let i = 0; (i < character_data.length) && (chara_rendered < 16); i++) {
        if(selection_box.value == character_data[i].house || selection_box.value == "all")
        {
            chara_container[0].innerHTML +=
                `<div class="chara-box">
                    <div class="character">
                        <figure>
                            <img src="${character_data[i].image == ""? "../src/not-found.jpg" : character_data[i].image}" alt="${character_data[i].name}">
                        </figure>
                        <div class="character-info">
                            <h3>${character_data[i].name}</h3>
                            <span>${character_data[i].house}</span>
                            <span>${character_data[i].dateOfBirth == null? " " : character_data[i].dateOfBirth}</span>
                        </div>
                    </div>
                </div>`;
            chara_rendered++;
        }
    }
}

function typeError(error){
    chara_container[0].innerHTML = `
    <h2>There's an issue getting characters, 
    please try again later.</h2>`;
}