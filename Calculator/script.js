
let container = document.querySelector(".container");
let modeBtn = document.querySelector("#mode");
let buttons = container.querySelectorAll(".buttons");
let equalBtn = document.querySelector("#equal");
let clearBtn = document.querySelector("#clear");
let deleteBtn = document.querySelector("#delete");
let inputField = document.querySelector("input");
let currentMode = "darkMode";
let input = "";
let lastChar = ""; // To keep track of the last character

// Toggle between dark mode and light mode
let changeMode = () => {
    if (currentMode === "darkMode") {
        currentMode = "lightMode";
        modeBtn.style.color = "black";
        modeBtn.style.borderColor = "black";
        container.style.backgroundColor = "white";
        equalBtn.style.backgroundColor = "orange";
        inputField.style.color = "black";
    } else if (currentMode === "lightMode") {
        currentMode = "darkMode";
        modeBtn.style.color = "white";
        modeBtn.style.borderColor = "white";
        container.style.backgroundColor = "rgb(37, 36, 36)";
        inputField.style.color = "white";
    }
};

modeBtn.addEventListener("click", () => {
    changeMode();
});

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let buttonText = button.textContent;

        // Handle clear
        if (buttonText === "C") {
            input = "";
            lastChar = "";
            inputField.value = "0";
        } 
        // Handle delete
        else if (buttonText === "DE") {
            input = input.slice(0, -1);
            lastChar = input.slice(-1);
            inputField.value = input || "0";
        } 
        //Handle percentage
        else if (buttonText === "%") {
            if (input !== "") {
                input = (parseFloat(input) / 100).toString();
                inputField.value = input;
            }
            lastChar = buttonText;
        }
        // Handle equal
        else if (buttonText === "=") {
            try {
                input = eval(input).toString();
            } catch (error) {
                input = "Error";
            }
            inputField.value = input;
            lastChar = ""; // Reset lastChar after evaluation
        } 
        // Handle number and operator input
        else {
            // Prevent multiple operators in a row
            if (isOperator(buttonText) && isOperator(lastChar)) {
                input = input.slice(0, -1) + buttonText; // Replace the last operator
            } else {
                input += buttonText;
            }

            inputField.value = input;
            lastChar = buttonText;
        }
    });
});

// Helper function to check if a character is an operator
function isOperator(char) {
    return ["+", "-", "*", "/", "."].includes(char);
}
