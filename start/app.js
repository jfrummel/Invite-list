document.addEventListener("DOMContentLoaded", ()  => {
    const form = document.getElementById("registrar");
    const input = document.querySelector("input");
    const ul = document.getElementById("invitedList");

    let inviteList = localStorage.getItem("names") ?
        JSON.parse(localStorage.getItem("names")) : [];

    localStorage.setItem('names', JSON.stringify(inviteList));
    const data = JSON.parse(localStorage.getItem('names'));

    const filterName = (nameToRemove) => {
        let newList = JSON.parse(localStorage.getItem("names"));
        let inviteList = newList.filter((name) => {
            return nameToRemove !== name;
        });
        localStorage.setItem("names", JSON.stringify(inviteList));
        return inviteList;
    };


    const createListItem = (name) => {
        const createElement = (elementName, property, value) => {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
        };

        const appendToLi = (elementName, property, value) => {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        };
        const li = document.createElement("li");
        appendToLi("span", "textContent", name);
        appendToLi("label", "textContent", "Confirmed")
            .appendChild(createElement("input", "type", "checkbox"));
        appendToLi("button", "textContent", "Edit");
        appendToLi("button", "textContent", "Remove");
        return li;
    };


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = input.value;
        let inviteList = JSON.parse(localStorage.getItem("names"));
        if (inviteList) {
            for (let i = 0; i < inviteList.length; i++) {
                let li = inviteList[i];
                if (name === li) {
                    alert("Name already added");
                    input.value = "";
                    return;
                }
            }
            if (input.value === "") {
                alert("Please add a name");
            } else {
                const li = createListItem(name);
                ul.appendChild(li);
                inviteList.push(name);
                localStorage.setItem("names", JSON.stringify(inviteList));
                input.value = "";
            }
        }
    });

    ul.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent.toLowerCase();

            const nameActions = {
                remove: () => {
                    const span = li.firstElementChild;
                    const name = span.textContent;
                    filterName(name);
                    ul.removeChild(li);
                },
                edit: () => {
                    const input = document.createElement("input");
                    input.type = "text";
                    const span = li.firstElementChild;
                    input.value = span.textContent;
                    li.insertBefore(input, span);
                    button.textContent = "Save";
                }
            };
            nameActions[action]();
        }
    });

    data.map((name) => {
     const li = createListItem(name);
     ul.appendChild(li);
    })

});



