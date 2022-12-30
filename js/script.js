const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const email = document.querySelector("#email");
const eraseBtn = document.querySelector(".erase");
const sendBtn = document.querySelector(".send");
const closeBtn = document.querySelector(".close");
const popup = document.querySelector(".popup");

const showError = (input, msg) => {
	//argument INPUT przechowuje nasze INPUTY
	//argument MSG przechowuje nasze placeholdery
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");
	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

//argument INPUT z funckcji 'checkForm' przechowuje tablice z naszymi inputami
//argument EL odnosi się do każdej zmiennej, którą umieściliśmy w tablicy
const checkForm = input => {
	input.forEach(el => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} musi składać się z min. ${min} znaków!`
		);
	}
};
const checkPassword = (password, confirmPassword) => {
	if (password.value !== confirmPassword.value) {
		showError(confirmPassword, "Hasła muszą być jednakowe");
	}
};

const checkEmail = email => {
	const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
	if (regex.test(email.value)) {
		clearError(email);
	} else showError(email, "Adres e-mail jest niepoprawny");
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll(".form-box");
	let errorCount = 0;

	allInputs.forEach(el => {
		if (el.classList.contains("error")) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

sendBtn.addEventListener("click", e => {
	e.preventDefault();
	checkForm([username, password, confirmPassword, email]);
	checkLength(username, 3);
	checkLength(password, 8);
	checkPassword(password, confirmPassword);
	checkEmail(email);
	checkErrors();
});

eraseBtn.addEventListener("click", e => {
	e.preventDefault();

	[username, password, confirmPassword, email].forEach(el => {
		el.value = "";
		clearError(el);
	});
});

closeBtn.addEventListener("click", e => {
	e.preventDefault();

	[username, password, confirmPassword, email].forEach(el => {
		el.value = "";
	});
	popup.classList.remove("show-popup");
});
