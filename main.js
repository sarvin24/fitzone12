// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll-to-top button
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Highlight current day in schedule
function highlightCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const currentDay = days[today];
    const rows = document.querySelectorAll('.day-row');
    rows.forEach(row => {
        if (row.getAttribute('data-day') === currentDay) {
            row.classList.add('highlight');
        }
    });
}

// Form validation and success animation
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('.invalid-feedback').forEach(el => el.classList.remove('show'));

        // Validate fields
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const terms = document.getElementById('terms');

        if (!fullName.value.trim()) {
            fullName.classList.add('is-invalid');
            document.getElementById('nameError').classList.add('show');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            document.getElementById('emailError').classList.add('show');
            isValid = false;
        }

        if (!phone.value.trim()) {
            phone.classList.add('is-invalid');
            document.getElementById('phoneError').classList.add('show');
            isValid = false;
        }

        if (!terms.checked) {
            terms.classList.add('is-invalid');
            document.getElementById('termsError').classList.add('show');
            isValid = false;
        }

        if (isValid) {
            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Animated checkmark (using CSS animation)
            const checkmark = document.querySelector('.checkmark');
            checkmark.style.animation = 'checkmark 0.8s ease-in-out';

            // Reset form after modal closes
            successModal._element.addEventListener('hidden.bs.modal', function() {
                registerForm.reset();
            });
        }
    });
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentDay();
});