// script.js
(function () {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const statusEl = document.getElementById('formStatus');

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(el, errorEl, message) {
    errorEl.textContent = message;
    el.setAttribute('aria-invalid', 'true');
  }

  function clearError(el, errorEl) {
    errorEl.textContent = '';
    el.removeAttribute('aria-invalid');
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      setError(nameInput, nameError, 'Full Name is required.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setError(emailInput, emailError, 'Email is required.');
      return false;
    }
    if (!emailRegex.test(value)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      setError(messageInput, messageError, 'Message is required.');
      return false;
    }
    clearError(messageInput, messageError);
    return true;
  }

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    statusEl.className = 'status';

    const validName = validateName();
    const validEmail = validateEmail();
    const validMessage = validateMessage();

    if (validName && validEmail && validMessage) {
      form.reset();
      clearError(nameInput, nameError);
      clearError(emailInput, emailError);
      clearError(messageInput, messageError);
      statusEl.textContent = 'Thank you for contacting us!';
      statusEl.classList.add('success');
    } else {
      statusEl.textContent = 'Please fix the errors above and try again.';
      statusEl.classList.add('error');
      const firstInvalid = [nameInput, emailInput, messageInput]
        .find(inp => inp.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.focus();
    }
  });
})();
