document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrar");
    const input = form.querySelector("input");
    const mainDiv = document.querySelector(".main");
    const ul = document.getElementById("invitedList");
    const div = document.createElement("div");
    const filterLabel = document.createElement("label");
    filterLabel.textContent = "Invitees that have confirmed";
    const filterCheckbox = document.createElement("input");
    filterCheckbox.type = "checkbox";
    filterLabel.appendChild(filterCheckbox);
    div.appendChild(filterLabel);
    mainDiv.insertBefore(div, ul);
    filterCheckbox.addEventListener("change" , (e) => {
        const isConfirmed = filterCheckbox.checked;
        const list = ul.children;
        if (isConfirmed) {
            for (let i = 0; i < list.length; i++) {
                let li = list[i];
                if (li.className === "responded") {
                    li.style.display = "";
                } else {
                    li.style.display = "none";
                }
            }
        } else {
            for (let i = 0; i < list.length; i++) {
                let li = list[i];
                li.style.display = "";
            }
        }
    });

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
        const list = ul.children;
        for (let i = 0; i < list.length; i++) {
            let li = list[i];
            let span = li.firstElementChild;
            if (span.textContent === name) {
                alert("Name already added");
                input.value = "";
                return;
            }
        }
        if (name === "") {
            alert("Please add a name");
            return;
        }
        const li = createListItem(name);
        ul.appendChild(li);
        input.value = '';
    });

    ul.addEventListener("change", (e) => {
        const checkbox = e.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;
        if (checked) {
            listItem.className = "responded";
        } else {
            listItem.className = '';
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
                    ul.removeChild(li);
                },
                edit: () => {
                    const span = li.firstElementChild;
                    const input = document.createElement("input");
                    input.type = "text";
                    input.value = span.textContent;
                    li.insertBefore(input, span);
                    li.removeChild(span);
                    button.textContent = "Save";
                },
                save: () => {
                    const input = li.firstElementChild;
                    const span = document.createElement("span");
                    span.textContent = input.value;
                    li.insertBefore(span, input);
                    li.removeChild(input);
                    button.textContent = "Edit";
                }
            };
            //Select and run actions by button's name
            nameActions[action]();
        }
    });
});
