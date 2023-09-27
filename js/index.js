// const { create } = require("jsdom/lib/jsdom/living/generated/Blob");

document.addEventListener("DOMContentLoaded", function() {
    const monsterContainer = document.querySelector("#monster-container");
    const monsterForm = document.querySelector("#monster-form");
    
    let page = 1

    fetchMonster(page)

    //GET Monster Data
    function fetchMonster(page) {
        console.log(page)
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(function (data) {
            console.log(data)
            data.forEach(function (monster) {
                const monsterInfo = document.createElement('div');
                monsterInfo.innerHTML = `
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>${monster.description}</p>
                `
                monsterContainer.appendChild(monsterInfo);
            })
        })
    }
        

    //Handle Form
    monsterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.querySelector("#name").value;
        const age = document.querySelector("#age").value;
        const description = document.querySelector("#description").value;

       fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({ name: name, age: age, description: description })
            
        })
    })

    //Handle forward and back Button
    const backBtn = document.querySelector("#back");
    const forwardBtn = document.querySelector("#forward");

    forwardBtn.addEventListener('click', function() {
        page += 1;
        monsterContainer.innerHTML = "";
        fetchMonster(page)
    })

    backBtn.addEventListener('click', function() {
        page -=1;
        monsterContainer.innerHTML = "";
        fetchMonster(page)
    })

})
    