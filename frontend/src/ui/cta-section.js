export function createCTASection() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      organization: form.organization.value.trim(),
      interest_type: form.interest_type.value,
      message: form.message.value.trim()
    };

    try {
      // PocketBase API endpoint - proxied through nginx
      const response = await fetch('/api/collections/interest_signups/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Success
      form.style.display = 'none';
      successMessage.classList.remove('hidden');

      // Track event (optional)
      if (typeof gtag === 'function') {
        gtag('event', 'form_submission', {
          event_category: 'engagement',
          event_label: formData.interest_type
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);

      // Show error feedback
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Create error message if not exists
      let errorEl = form.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-error';
        errorEl.style.cssText = 'color: #ef4444; margin-top: 1rem; text-align: center; font-size: 0.875rem;';
        form.appendChild(errorEl);
      }
      errorEl.textContent = 'Something went wrong. Please try again or email us directly.';

      // Remove error after 5 seconds
      setTimeout(() => {
        if (errorEl) errorEl.remove();
      }, 5000);
    }
  });

  // Real-time validation feedback
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateInput(input);
      }
    });
  });
}

function validateInput(input) {
  const isValid = input.checkValidity();

  if (!isValid && input.value) {
    input.classList.add('invalid');
    input.style.borderColor = '#ef4444';
  } else {
    input.classList.remove('invalid');
    input.style.borderColor = '';
  }

  return isValid;
}
