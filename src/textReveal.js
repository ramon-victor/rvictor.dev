document.addEventListener("DOMContentLoaded", initializeNameAnimation);

function initializeNameAnimation() {
	const elements = {
		nameWrapper: document.getElementById("name-wrapper"),
		firstNameRest: document.querySelector(".first-name-rest"),
		lastName: document.querySelector(".last-name"),
		revealText: document.querySelectorAll(".reveal-text"),
        domain: document.querySelector(".domain"),
	};

	const widths = {
		firstNameRest: window.getComputedStyle(elements.firstNameRest).width,
		lastName: window.getComputedStyle(elements.lastName).width,
	};

	setInitialState(elements.revealText);
	addEventListeners(elements, widths);
}

function setInitialState(revealText) {
	revealText.forEach((el) => {
		el.style.width = "0px";
		el.style.opacity = "0";
	});
}

function addEventListeners(elements, widths) {
	elements.nameWrapper.addEventListener("mouseleave", () => handleMouseLeave(elements));
	elements.nameWrapper.addEventListener("mouseenter", () => handleMouseEnter(elements, widths));
}

function handleMouseLeave(elements) {
	elements.revealText.forEach((el) => {
		animate(el, { width: "0px", opacity: "0" }, 800);
	});
	animate(elements.firstNameRest, { width: "0px", opacity: "0", marginRight: "0px" }, 800);
	animate(elements.domain, { width: "auto", opacity: "1" }, 800);
}

function handleMouseEnter(elements, widths) {
	animate(elements.firstNameRest, { width: widths.firstNameRest, opacity: "1", marginRight: "8px" }, 800);
	animate(elements.lastName, { width: widths.lastName, opacity: "1" }, 800);
    animate(elements.domain, { width: "0px", opacity: "0" }, 800);
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
