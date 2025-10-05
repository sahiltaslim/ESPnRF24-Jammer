const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeButton = document.getElementById('closeButton');

function showAlert(message) {
    messageText.textContent = message;
    messageBox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function validateAndProcess(params) {
    const { redirectPath, inputs, customValidation, customMessage } = params;
    const values = {};

    for (const input of inputs) {
        const element = document.getElementById(input.id);
        let value = element.value.trim();
        const key = input.id.replace("Input", "");

        if (input.type === 'number') {
            const numValue = parseInt(value);
            if (isNaN(numValue) || numValue < input.min || numValue > input.max) {
                showAlert(`${input.name} must be a number between ${input.min} and ${input.max}.`);
                return;
            }
            values[key] = numValue;
        } else if (input.id === 'password') {
            if (value && value.length < 8) {
                showAlert("Password must be at least 8 characters long.");
                return;
            }
            values[key] = value;
        } else if (input.id === 'ssid') {
            if (!value) {
                showAlert("Please enter an SSID.");
                return;
            }
            values[key] = value;
        } else {
            values[key] = value;
        }
    }

    if (customValidation && !customValidation(values)) {
        showAlert(customMessage);
        return;
    }

    if (redirectPath) {
        const queryParams = Object.keys(values).map(key => `${key}=${values[key]}`).join('&');
        location.href = `${redirectPath}?${queryParams}`;
    }
}


closeButton.addEventListener('click', () => {
    messageBox.classList.remove('show');
    document.body.style.overflow = '';
});

document.addEventListener("DOMContentLoaded", () => {
    const applyButton = document.getElementById('apply-button');
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            validateAndProcess({
                redirectPath: "/access_point_method",
                inputs: [
                    { id: 'ssid', name: 'SSID' },
                    { id: 'password', name: 'Password' },
                    { id: 'channel', name: 'Channel', type: 'number', min: 1, max: 13 },
                ]
            });
        });
    }
    const miscButton = document.getElementById("misc");
    if (miscButton) {
        miscButton.addEventListener("click", () => {
            validateAndProcess({
                redirectPath: "/misc_jam",
                inputs: [
                    { id: "startInput", name: "Start value", type: 'number', min: 0, max: 125 },
                    { id: "stopInput", name: "Stop value", type: 'number', min: 0, max: 125 },
                ],
                customValidation: (values) => values.stop >= values.start,
                customMessage: "Stop value must not be less than Start value.",
            });
        });
    }
    const wifiButton = document.getElementById("wifi");
    if (wifiButton) {
        wifiButton.addEventListener("click", () => {
            validateAndProcess({
                redirectPath: "/wifi_selected_jam",
                inputs: [
                    { id: "channelInput", name: "Channel", type: 'number', min: 0, max: 12 }
                ],
            });
        });
    }
});
