(function () {
    const form = document.getElementById("contactForm");

    if (!form) return;

    const submitButton = form.querySelector("button[type='submit']");
    const submitText = submitButton ? submitButton.querySelector(".text-caption") : null;
    const status = form.querySelector(".form-status");
    const interestField = document.getElementById("contactInterest");
    const budgetField = document.getElementById("contactBudget");

    const defaultSelectTexts = [
        "Você tem interesse em",
        "Tipo de orçamento",
    ];

    function getSelectValue(index) {
        const current = form.querySelectorAll(".nice-select .current")[index];
        return current ? current.textContent.trim() : "";
    }

    function isDefaultSelectValue(value) {
        return defaultSelectTexts.includes(value);
    }

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

    function resetNiceSelects() {
        const currentItems = form.querySelectorAll(".nice-select .current");
        currentItems.forEach(function (current, index) {
            current.textContent = defaultSelectTexts[index] || "";
        });

        form.querySelectorAll(".nice-select .option").forEach(function (option) {
            option.classList.remove("selected", "focus");
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const interest = getSelectValue(0);
        const budget = getSelectValue(1);

        if (isDefaultSelectValue(interest) || isDefaultSelectValue(budget)) {
            setStatus("Selecione o interesse e o tipo de orçamento antes de enviar.", "error");
            return;
        }

        interestField.value = interest;
        budgetField.value = budget;

        setStatus("", "");
        setSubmitting(true);

        try {
            const response = await fetch(form.action, {
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
            setStatus("Não foi possível enviar agora. Tente novamente ou chame pelo WhatsApp.", "error");
        } finally {
            setSubmitting(false);
        }
    });
})();
