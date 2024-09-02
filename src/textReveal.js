document.addEventListener("DOMContentLoaded", initializeNameAnimation);

function initializeNameAnimation() {
	const elements = {
		nameWrapper: document.getElementById("name-wrapper"),
		firstNameRest: document.querySelector(".first-name-rest"),
		lastName: document.querySelector(".last-name"),
		revealText: document.querySelectorAll(".reveal-text"),
		domain: document.querySelector(".domain"),
	};

	const originalElementStyles = {
		firstNameRest: getElementStyle(elements.firstNameRest, "width"),
		lastName: {
			width: getElementStyle(elements.lastName, "width"),
			marginLeft: getElementStyle(elements.lastName, "marginLeft"),
		},
	};

	setTimeout(() => {
		setupEventListeners(elements, originalElementStyles);
	}, 100);
}

function setupEventListeners(elements, originalElementStyles) {
	const eventActions = {
		mouseleave: () => handleMouseLeave(elements, originalElementStyles),
		mouseenter: () => handleMouseEnter(elements),
	};

	for (const [event, action] of Object.entries(eventActions)) {
		elements.nameWrapper.addEventListener(event, action);
	}
}

function handleMouseLeave(elements, originalElementStyles) {
	animate(elements.firstNameRest, { width: originalElementStyles.firstNameRest, opacity: "1" }, 800);
	animate(
		elements.lastName,
		{
			width: originalElementStyles.lastName.width,
			opacity: "1",
			marginLeft: originalElementStyles.lastName.marginLeft,
		},
		800
	);
	animate(elements.domain, { width: "0px", opacity: "0" }, 800);
}

function handleMouseEnter(elements) {
	elements.revealText.forEach((el) => {
		animate(el, { width: "0px", opacity: "0" }, 800);
	});
	animate(elements.lastName, { marginLeft: "0" }, 800);
	animate(elements.domain, { opacity: "1" }, 800);
}

function animate(element, properties, duration) {
	return new Promise((resolve) => {
		element.style.transition = `all ${duration}ms ease-in`;
		Object.keys(properties).forEach((key) => {
			element.style[key] = properties[key];
		});
		setTimeout(resolve, duration);
	});
}

function getElementStyle(element, property) {
	return window.getComputedStyle(element)[property];
}
