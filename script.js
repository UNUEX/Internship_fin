const cardNumberInput = document.getElementById('cardNumber');
const expireDateInput = document.getElementById('expiredate');
const cvvInput = document.getElementById('cvv');
const nameHolderInput = document.getElementById('nameholder');

cardNumberInput.addEventListener('input', () => {
    let value = cardNumberInput.value.replace(/\D/g, '');
    if (value.length > 16) {
        value = value.substring(0, 16);
    }

   let result = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            result += ' ';
        }
        result += value[i];
    }

    cardNumberInput.value = result;

        if (value.length === 16) {
        const ok = isValidLuhn(value);
        setValid(cardNumberInput, ok);
        if (ok) {
            expireDateInput.focus();
        }
    } else {
        setValid(cardNumberInput, true);
    }
});

expireDateInput.addEventListener('input', () => {
    let value = expireDateInput.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.substring(0, 4);
    }

     if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    expireDateInput.value = value;

        if (value.length === 5) {
        const ok = isValidExpiry(value);
        setValid(expireDateInput, ok);
        if (ok) {
            cvvInput.focus();
        }
    } else {
        setValid(expireDateInput, true);
    }
});

cvvInput.addEventListener('input', () => {
    let value = cvvInput.value.replace(/\D/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3);
    }

    cvvInput.value = value;

        if (value.length === 3) {
        nameHolderInput.focus();
    }
});

nameHolderInput.addEventListener('input', () => {
    let value = nameHolderInput.value.toUpperCase();
    value = value.replace(/[^A-Z\ ]/g, '');
    nameHolderInput.value = value;
});

function isValidLuhn(number) {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        let digit = Number(number[number.length - 1 - i]);
        if (i % 2 === 1) {
            digit = digit * 2;
            if (digit > 9) {
                digit = digit - 9;
            }
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

function isValidExpiry(value) {
    if (value.length !== 5) {
        return false;
    }
    const month = Number(value.substring(0, 2));
    const year = 2000 + Number(value.substring(3));
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (month < 1 || month > 12) {
        return false;
    }
    if (year > currentYear) {
        return true;
    }
    return year === currentYear && month >= currentMonth;
}

function setValid(input, isValid) {
    if (isValid) {
        input.style.borderColor = '';
    } else {
        input.style.borderColor = 'red';
    }
}