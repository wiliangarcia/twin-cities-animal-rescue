// ==========================================
// TOUCHSTONE 4: CLIENT C (ANIMAL RESCUE) JS
// ==========================================

// 1. DATA STRUCTURE (Arrays / Objects)
const availablePrograms = [
    { id: 'p1', name: 'Foster Caregiver Program', type: 'Foster' },
    { id: 'p2', name: 'Volunteer Dog Walker', type: 'Volunteer' },
    { id: 'p3', name: 'Adoption Matchmaking', type: 'Adoption' }
];

let savedInterests = JSON.parse(localStorage.getItem('savedRescues')) || [];

// 2. INTERACTIVE FEATURE: Save & Display Saved Programs/Pets
document.addEventListener('DOMContentLoaded', () => {
    renderSavedList();
    initValidation();
});

function toggleSaveProgram(programName) {
    const index = savedInterests.indexOf(programName);
    if (index === -1) {
        savedInterests.push(programName);
    } else {
        savedInterests.splice(index, 1);
    }
    // Browser Storage (localStorage)
    localStorage.setItem('savedRescues', JSON.stringify(savedInterests));
    renderSavedList();
}

function renderSavedList() {
    const container = document.getElementById('saved-list-container');
    if (!container) return;

    if (savedInterests.length === 0) {
        container.innerHTML = '<p>No saved programs or pets yet.</p>';
        return;
    }

    let html = '<ul>';
    savedInterests.forEach(item => {
        html += `<li>${item} <button onclick="toggleSaveProgram('${item}')">Remove</button></li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
}

// 3. JAVASCRIPT FORM VALIDATION (contact.html)
function initValidation() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-msg').forEach(el => el.remove());

        // Required Field Check: Full Name
        const nameInput = document.getElementById('full-name');
        if (nameInput && nameInput.value.trim() === '') {
            showError(nameInput, 'Full name is required.');
            isValid = false;
        }

        // Email Format Validation
        const emailInput = document.getElementById('email-address');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        // Prevent submission if invalid
        if (!isValid) {
            e.preventDefault();
        } else {
            alert('Application submitted successfully!');
        }
    });
}

function showError(inputElement, message) {
    const error = document.createElement('span');
    error.className = 'error-msg';
    error.style.color = '#d9534f';
    error.style.fontSize = '0.85rem';
    error.style.display = 'block';
    error.textContent = message;
    inputElement.parentNode.appendChild(error);
}
