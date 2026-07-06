(function () {
    const form = document.getElementById("contactForm");
    const endpoint = "https://formspree.io/f/mykqveja";

    if (!form) return;

    const submitButton = form.querySelector("button[type='submit']");
    const submitText = submitButton ? submitButton.querySelector(".text-caption") : null;
    const status = form.querySelector(".form-status");
    const interestField = document.getElementById("contactInterest");
    const budgetField = document.getElementById("contactBudget");
    const fallbackSelectTexts = [
        "Voce tem interesse em",
        "Você tem interesse em",
        "VocÃª tem interesse em",
        "Tipo de orcamento",
        "Tipo de orçamento",
        "Tipo de orÃ§amento",
        "-- Selecione uma opcao --",
        "-- Selecione uma opção --",
        "-- Selecione uma opÃ§Ã£o --",
        "-- Selecione uma faixa --",
    ];

    form.setAttribute("action", endpoint);
    form.setAttribute("method", "POST");

    function setStatus(message, type) {
        if (!status) return;

        status.textContent = message;
        status.classList.remove("is-success", "is-error");

        if (type) {
            status.classList.add(`is-${type}`);
        }
    }

    function setSubmitting(isSubmitting) {
        if (submitButton) {
            submitButton.disabled = isSubmitting;
        }

        if (submitText) {
            submitText.textContent = isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM";
        }
    }

    function getSelectValue(index) {
        const current = form.querySelectorAll(".nice-select .current")[index];
        return current ? current.textContent.trim() : "";
    }

    function hasValidSelectValue(value) {
        return value && !fallbackSelectTexts.includes(value);
    }

    function resetNiceSelects() {
        const defaultSelectTexts = ["Você tem interesse em", "Tipo de orçamento"];

        form.querySelectorAll(".nice-select .current").forEach(function (current, index) {
            current.textContent = defaultSelectTexts[index] || "";
        });

        form.querySelectorAll(".nice-select .option").forEach(function (option) {
            option.classList.remove("selected", "focus");
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!form.reportValidity()) return;

        const interest = getSelectValue(0);
        const budget = getSelectValue(1);

        if (!hasValidSelectValue(interest) || !hasValidSelectValue(budget)) {
            setStatus("Selecione o interesse e o tipo de orçamento antes de enviar.", "error");
            return;
        }

        if (interestField) interestField.value = interest;
        if (budgetField) budgetField.value = budget;

        setStatus("", "");
        setSubmitting(true);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Formspree request failed");
            }

            form.reset();
            resetNiceSelects();
            setStatus("Mensagem enviada com sucesso. Obrigado pelo contato!", "success");
        } catch (error) {
            setStatus("Não foi possível enviar agora. Confira os campos e tente novamente.", "error");
        } finally {
            setSubmitting(false);
        }
    });
})();
