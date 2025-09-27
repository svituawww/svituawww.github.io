// Question Form Validation and Submission
// SVIT UA Contact Form Handler with JSON Configuration


// External configuration function
function getBecomevolunteerFormConfig() {
    return {
        title: "SVIT UA Become Volunteer Form",
        emailTarget: "info@svitua.se",
        pageContent: {
            header: {
                title: "Стати волонтером",
                description: "Заповніть форму, щоб стати волонтером, та ми вам передзвонимо"
            }
        },
        fields: {
            lastName: {
                label: "Прізвище",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Прізвище є обов'язковим полем",
                    minLength: "Прізвище має бути довшим за 2 символи",
                    maxLength: "Прізвище не може бути довшим за 50 символів"
                }
            },
            firstName: {
                label: "Ім'я",
                type: "text",
                required: true,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Ім'я є обов'язковим полем",
                    minLength: "Ім'я має бути довшим за 2 символи",
                    maxLength: "Ім'я не може бути довшим за 50 символів"
                }
            },
            email: {
                label: "Електронна пошта",
                type: "email",
                required: true,
                validation: {
                    required: "Email є обов'язковим полем",
                    format: "Введіть коректний email адрес"
                }
            },
            phone: {
                label: "Телефон",
                type: "tel",
                required: false,
                validation: {
                    required: "Телефон є обов'язковим полем",
                    format: "Введіть коректний номер телефону"
                }
            },
            kommun: {
                label: "Комуна",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 100,
                validation: {
                    required: "Комуна є обов'язковим полем",
                    minLength: "Назва комуни має бути довшою за 2 символи",
                    maxLength: "Назва комуни не може бути довшою за 100 символів"
                }
            },
            question: {
                label: "Цілі",
                type: "textarea",
                required: true,
                minLength: 10,
                maxLength: 2000,
                rows: 6,
                placeholder: "Опишіть ваші цілі детально...",
                validation: {
                    required: "Цілі є обов'язковим полем",
                    minLength: "Цілі має бути довшим за 10 символів",
                    maxLength: "Цілі не може бути довшим за 2000 символів"
                }
            }
        },
        submitButton: {
            text: "Надіслати цілі",
            loadingText: "Надсилання...",
            successMessage: "Дякуємо! Ваші цілі успішно надіслано.",
            errorMessage: "Помилка при надсиланні форми. Спробуйте ще раз або зв'яжіться з нами безпосередньо."
        },
        contactInfo: {
            title: "Контактна інформація",
            email: "info@svitua.se",
            phone: "+467 37 570 310",
            address: "Швеція",
            autoSendNote: {
                title: "📧 Автоматична відправка",
                description: "Ваші цілі буде автоматично надіслано на email:",
                responseTime: "Ми відповімо вам протягом 24 годин."
            }
        },
        validation: {
            emailRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            phoneRegex: "^[\\+]?[0-9\\s\\-\\(\\)]{7,15}$"
        }
    };
}



// External configuration function
function getQuestionFormConfig() {
    return {
        title: "SVIT UA Contact Form",
        emailTarget: "info@svitua.se",
        pageContent: {
            header: {
                title: "Задати питання",
                description: "Зв'яжіться з нами для отримання додаткової інформації про наші послуги та можливості"
            }
        },
        fields: {
            lastName: {
                label: "Прізвище",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Прізвище є обов'язковим полем",
                    minLength: "Прізвище має бути довшим за 2 символи",
                    maxLength: "Прізвище не може бути довшим за 50 символів"
                }
            },
            firstName: {
                label: "Ім'я",
                type: "text",
                required: true,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Ім'я є обов'язковим полем",
                    minLength: "Ім'я має бути довшим за 2 символи",
                    maxLength: "Ім'я не може бути довшим за 50 символів"
                }
            },
            email: {
                label: "Електронна пошта",
                type: "email",
                required: true,
                validation: {
                    required: "Email є обов'язковим полем",
                    format: "Введіть коректний email адрес"
                }
            },
            phone: {
                label: "Телефон",
                type: "tel",
                required: false,
                validation: {
                    required: "Телефон є обов'язковим полем",
                    format: "Введіть коректний номер телефону"
                }
            },
            kommun: {
                label: "Комуна",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 100,
                validation: {
                    required: "Комуна є обов'язковим полем",
                    minLength: "Назва комуни має бути довшою за 2 символи",
                    maxLength: "Назва комуни не може бути довшою за 100 символів"
                }
            },
            question: {
                label: "Ваше питання",
                type: "textarea",
                required: true,
                minLength: 10,
                maxLength: 2000,
                rows: 6,
                placeholder: "Опишіть ваше питання детально...",
                validation: {
                    required: "Питання є обов'язковим полем",
                    minLength: "Питання має бути довшим за 10 символів",
                    maxLength: "Питання не може бути довшим за 2000 символів"
                }
            }
        },
        submitButton: {
            text: "Надіслати питання",
            loadingText: "Надсилання...",
            successMessage: "Дякуємо! Ваше питання успішно надіслано.",
            errorMessage: "Помилка при надсиланні форми. Спробуйте ще раз або зв'яжіться з нами безпосередньо."
        },
        contactInfo: {
            title: "Контактна інформація",
            email: "info@svitua.se",
            phone: "+467 37 570 310",
            address: "Швеція",
            autoSendNote: {
                title: "📧 Автоматична відправка",
                description: "Ваше питання буде автоматично надіслано на email:",
                responseTime: "Ми відповімо вам протягом 24 годин."
            }
        },
        validation: {
            emailRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            phoneRegex: "^[\\+]?[0-9\\s\\-\\(\\)]{7,15}$"
        }
    };
}

function getBecomememberFormConfig() {
    return {
        title: "SVIT UA Contact Form",
        emailTarget: "anna@svitua.se",
        subject: "Стати членом організації",
        pageContent: {
            header: {
                title: "Стати членом організації:",
                description: "Заповніть форму, щоб стати членом організації, та ми вам передзвонимо. 200 крон/рік"
            }
        },
        fields: {
            lastName: {
                label: "Прізвище",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Прізвище є обов'язковим полем",
                    minLength: "Прізвище має бути довшим за 2 символи",
                    maxLength: "Прізвище не може бути довшим за 50 символів"
                }
            },
            firstName: {
                label: "Ім'я",
                type: "text",
                required: true,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Ім'я є обов'язковим полем",
                    minLength: "Ім'я має бути довшим за 2 символи",
                    maxLength: "Ім'я не може бути довшим за 50 символів"
                }
            },
            email: {
                label: "Електронна пошта",
                type: "email",
                required: true,
                validation: {
                    required: "Email є обов'язковим полем",
                    format: "Введіть коректний email адрес"
                }
            },
            phone: {
                label: "Телефон",
                type: "tel",
                required: true,
                validation: {
                    required: "Телефон є обов'язковим полем",
                    format: "Введіть коректний номер телефону"
                }
            },
            kommun: {
                label: "Комуна",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 100,
                validation: {
                    required: "Комуна є обов'язковим полем",
                    minLength: "Назва комуни має бути довшою за 2 символи",
                    maxLength: "Назва комуни не може бути довшою за 100 символів"
                }
            },
            question: {
                label: "Ваше повідомлення",
                type: "textarea",
                required: true,
                minLength: 10,
                maxLength: 2000,
                rows: 6,
                placeholder: "Опишіть ваше повідомлення детально...",
                validation: {
                    required: "Повідомлення є обов'язковим полем",
                    minLength: "Повідомлення має бути довшим за 10 символів",
                    maxLength: "Повідомлення не може бути довшим за 2000 символів"
                }
            }
        },
        submitButton: {
            text: "Надіслати повідомлення",
            loadingText: "Надсилання...",
            successMessage: "Дякуємо! Ваше повідомлення успішно надіслано.",
            errorMessage: "Помилка при надсиланні форми. Спробуйте ще раз або зв'яжіться з нами безпосередньо."
        },
        contactInfo: {
            title: "Контактна інформація",
            email: "anna@svitua.se",
            phone: "+467 37 570 310",
            address: "Швеція",
            autoSendNote: {
                title: "📧 Автоматична відправка",
                description: "Ваше повідомлення буде автоматично надіслано на email:",
                responseTime: "Ми відповімо вам протягом 24 годин."
            }
        },
        validation: {
            emailRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            phoneRegex: "^[\\+]?[0-9\\s\\-\\(\\)]{7,15}$"
        }
    };
}

function getPartnerrequestFormConfig() {
    return {
        title: "SVIT UA Donate Form",
        emailTarget: "anna@svitua.se",
        pageContent: {
            header: {
                title: "Партнерський запит",
                description: "Заповніть форму, щоб стати партнером, та ми вам передзвонимо"
            }
        },
        fields: {
            lastName: {
                label: "Назва організації",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Назва організації є обов'язковим полем",
                    minLength: "Назва організації має бути довшою за 2 символи",
                    maxLength: "Назва організації не може бути довшою за 100 символів"
                }
            },
            firstName: {
                label: "Ім'я",
                type: "text",
                required: true,
                minLength: 2,
                maxLength: 50,
                validation: {
                    required: "Ім'я є обов'язковим полем",
                    minLength: "Ім'я має бути довшим за 2 символи",
                    maxLength: "Ім'я не може бути довшим за 50 символів"
                }
            },
            email: {
                label: "Електронна пошта",
                type: "email",
                required: true,
                validation: {
                    required: "Email є обов'язковим полем",
                    format: "Введіть коректний email адрес"
                }
            },
            phone: {
                label: "Телефон",
                type: "tel",
                required: false,
                validation: {
                    required: "Телефон є обов'язковим полем",
                    format: "Введіть коректний номер телефону"
                }
            },
            kommun: {
                label: "Комуна",
                type: "text",
                required: false,
                minLength: 2,
                maxLength: 100,
                validation: {
                    required: "Комуна є обов'язковим полем",
                    minLength: "Назва комуни має бути довшою за 2 символи",
                    maxLength: "Назва комуни не може бути довшою за 100 символів"
                }
            },
            question: {
                label: "Повідомлення",
                type: "textarea",
                required: true,
                minLength: 10,
                maxLength: 2000,
                rows: 6,
                placeholder: "Опишіть ваше повідомлення щодо учасів в проекті...",
                validation: {
                    required: "Повідомлення є обов'язковим полем",
                    minLength: "Повідомлення має бути довшим за 10 символів",
                    maxLength: "Повідомлення не може бути довшим за 2000 символів"
                }
            }
        },
        submitButton: {
            text: "Надіслати повідомлення",
            loadingText: "Надсилання...",
            successMessage: "Дякуємо! Ваше повідомлення успішно надіслано.",
            errorMessage: "Помилка при надсиланні форми. Спробуйте ще раз або зв'яжіться з нами безпосередньо."
        },
        contactInfo: {
            title: "Контактна інформація",
            email: "anna@svitua.se",
            phone: "+467 37 570 310",
            address: "Швеція",
            autoSendNote: {
                title: "📧 Автоматична відправка",
                description: "Ваші побажання буде автоматично надіслано на email:",
                responseTime: "Ми відповімо вам протягом 24 годин."
            }
        },
        validation: {
            emailRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            phoneRegex: "^[\\+]?[0-9\\s\\-\\(\\)]{7,15}$"
        }
    };
}

function getJsonFormConfig(formName) {
    switch (formName) {
        case 'question':
            return getQuestionFormConfig();
        case 'becomevolunteer':
            return getBecomevolunteerFormConfig();
        case 'becomemember':
            return getBecomememberFormConfig();
        case 'partnerrequest':
            return getPartnerrequestFormConfig();
        default:
            console.warn('Unknown form type:', formName);
            return null;
    }
}

class QuestionFormValidator {
    constructor() {
        this.form = document.getElementById('questionForm');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.config = null;
        this.fields = {};
        
        this.init();
    }
    
    init() {
        try {
            console.log('🚀 Initializing Dynamic Form System...');
            
            // Load configuration
            this.loadConfig();
            
            // Initialize fields from config
            this.initializeFields();
            
            // Populate page content from config
            this.populatePageContent();
            
            // Populate contact information from config
            this.populateContactInfo();
            
            // Add event listeners
            this.addEventListeners();
            
            console.log('✅ Dynamic Form System initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize form:', error);
        }
    }
    
    loadConfig() {
        // Detect form type from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const formType = urlParams.get('form') || 'question'; // Default to 'question' if no parameter
        
        console.log('🔍 Dynamic Form System - Detected form type from URL:', formType);
        console.log('🔍 Current URL:', window.location.href);
        
        // Load configuration based on form type
        this.config = getJsonFormConfig(formType);
        
        if (!this.config) {
            console.error('❌ Invalid form type:', formType);
            // Fallback to question form if invalid type
            this.config = getJsonFormConfig('question');
        }
        
        console.log('✅ Form configuration loaded:', this.config.title);
        console.log('📧 Email target:', this.config.emailTarget);
    }
    
    initializeFields() {
        // Initialize fields based on config
        Object.keys(this.config.fields).forEach(fieldName => {
            const fieldElement = document.getElementById(fieldName);
            if (fieldElement) {
                this.fields[fieldName] = fieldElement;
                
                // Update field attributes based on config
                const fieldConfig = this.config.fields[fieldName];
                if (fieldConfig.required) {
                    fieldElement.setAttribute('required', 'required');
                } else {
                    fieldElement.removeAttribute('required');
                }
                
                if (fieldConfig.minLength) {
                    fieldElement.setAttribute('minlength', fieldConfig.minLength);
                }
                
                if (fieldConfig.maxLength) {
                    fieldElement.setAttribute('maxlength', fieldConfig.maxLength);
                }
                
                // Update placeholder from config
                if (fieldConfig.placeholder) {
                    fieldElement.setAttribute('placeholder', fieldConfig.placeholder);
                }
                
                // Update rows for textarea
                if (fieldConfig.rows && fieldElement.tagName === 'TEXTAREA') {
                    fieldElement.setAttribute('rows', fieldConfig.rows);
                }
                
                // Update label to show/hide asterisk based on required status
                this.updateFieldLabel(fieldName, fieldConfig);
            }
        });
        
        // Initialize submit button text
        this.initializeSubmitButton();
    }
    
    updateFieldLabel(fieldName, fieldConfig) {
        const fieldElement = document.getElementById(fieldName);
        if (fieldElement) {
            const labelElement = document.querySelector(`label[for="${fieldName}"]`);
            if (labelElement) {
                if (fieldConfig.required) {
                    // Add asterisk for required fields
                    if (!labelElement.textContent.includes('*')) {
                        labelElement.textContent = fieldConfig.label + ' *';
                    }
                } else {
                    // Remove asterisk for optional fields
                    labelElement.textContent = fieldConfig.label;
                }
            }
        }
    }
    
    initializeSubmitButton() {
        const submitButton = this.form.querySelector('.submit-btn');
        if (submitButton) {
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            if (btnText) {
                btnText.textContent = this.config.submitButton.text;
            }
            
            if (btnLoading) {
                btnLoading.textContent = this.config.submitButton.loadingText;
            }
        }
    }
    
    populateContactInfo() {
        const contactInfo = this.config.contactInfo;
        if (contactInfo) {
            // Populate form-info section
            this.populateFormInfo(contactInfo);
            
            // Populate contact-note section
            this.populateContactNote(contactInfo);
        }
    }
    
    populateFormInfo(contactInfo) {
        const formInfoContainer = document.getElementById('formInfoContainer');
        if (formInfoContainer) {
            formInfoContainer.innerHTML = `
                <h3>${contactInfo.title}</h3>
                <p><strong>Email:</strong> <span>${contactInfo.email}</span></p>
                <p><strong>Телефон:</strong> <span>${contactInfo.phone}</span></p>
                <p><strong>Адреса:</strong> <span>${contactInfo.address}</span></p>
            `;
        }
    }
    
    populateContactNote(contactInfo) {
        const contactNoteContainer = document.getElementById('contactNoteContainer');
        if (contactNoteContainer) {
            contactNoteContainer.innerHTML = `
                <h4>${contactInfo.autoSendNote.title}</h4>
                <p>${contactInfo.autoSendNote.description} <strong>${contactInfo.email}</strong></p>
                <p>${contactInfo.autoSendNote.responseTime}</p>
            `;
        }
    }
    
    populatePageContent() {
        const pageContent = this.config.pageContent;
        if (pageContent) {
            // Populate header content
            this.populateHeaderContent(pageContent.header);
        }
    }
    
    populateHeaderContent(headerContent) {
        if (headerContent) {
            // Update page title
            const pageTitle = document.querySelector('title');
            if (pageTitle) {
                pageTitle.textContent = `SVIT UA - ${headerContent.title}`;
            }
            
            // Update header title
            const headerTitle = document.getElementById('pageTitle');
            if (headerTitle) {
                headerTitle.textContent = headerContent.title;
            }
            
            // Update header description
            const headerDescription = document.getElementById('pageDescription');
            if (headerDescription) {
                headerDescription.textContent = headerContent.description;
            }
        }
    }
    
    addEventListeners() {
        // Add form submit listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation for all fields
        Object.values(this.fields).forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorElement = document.getElementById(fieldName + 'Error');
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Get field configuration
        const fieldConfig = this.config.fields[fieldName];
        if (!fieldConfig) {
            console.warn(`No configuration found for field: ${fieldName}`);
            return true;
        }
        
        // Validation rules based on config
        let isValid = true;
        let errorMessage = '';
        
        // Check if field is required
        if (fieldConfig.required && !value) {
            isValid = false;
            errorMessage = fieldConfig.validation?.required || `${fieldConfig.label} є обов'язковим полем`;
        }
        // Check minimum length (only if field has value and is required, or if it has value and minLength is set)
        else if (value && fieldConfig.minLength && value.length < fieldConfig.minLength) {
            isValid = false;
            errorMessage = fieldConfig.validation?.minLength || `${fieldConfig.label} має бути довшим за ${fieldConfig.minLength} символи`;
        }
        // Check maximum length (only if field has value)
        else if (value && fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            isValid = false;
            errorMessage = fieldConfig.validation?.maxLength || `${fieldConfig.label} не може бути довшим за ${fieldConfig.maxLength} символів`;
        }
        // Check email format (only if field has value)
        else if (value && fieldConfig.type === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = fieldConfig.validation?.format || 'Введіть коректний email адрес';
        }
        // Check phone format (only if field has value)
        else if (value && fieldConfig.type === 'tel' && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = fieldConfig.validation?.format || 'Введіть коректний номер телефону';
        }
        
        // Show error if validation failed
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else if (value) {
            // Only show success state if field has value
            this.showFieldSuccess(field);
        } else if (!fieldConfig.required) {
            // For empty optional fields, ensure no error styling
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = new RegExp(this.config.validation.emailRegex);
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        // Allow various phone formats: +46737570310, 0737570310, 0737-570310, etc.
        const phoneRegex = new RegExp(this.config.validation.phoneRegex);
        return phoneRegex.test(phone);
    }
    
    showFieldError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        const fieldConfig = this.config.fields[field.name];
        
        // For optional fields, only show error if they have a value
        if (fieldConfig && !fieldConfig.required) {
            if (field.value.trim()) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                field.classList.add('error');
                field.classList.remove('success');
            } else {
                // Hide error completely for empty optional fields
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                field.classList.remove('error', 'success');
            }
        } else {
            // For required fields, show error normally
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('error');
            field.classList.remove('success');
        }
    }
    
    showFieldSuccess(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        errorElement.textContent = '';
        field.classList.remove('error');
        field.classList.add('success');
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        const fieldConfig = this.config.fields[field.name];
        
        // For optional fields, always clear error styling completely
        if (fieldConfig && !fieldConfig.required) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.classList.remove('error', 'success');
        } else {
            // For required fields, just clear the error state
            errorElement.textContent = '';
            errorElement.style.display = 'block';
            field.classList.remove('error');
        }
    }
    
    validateAllFields() {
        let isValid = true;
        
        Object.values(this.fields).forEach(field => {
            const fieldName = field.name;
            const fieldConfig = this.config.fields[fieldName];
            
            // Only validate if field is required or has a value
            if (fieldConfig && (fieldConfig.required || field.value.trim())) {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        if (!this.validateAllFields()) {
            this.showMessage('Будь ласка, виправте помилки в формі', 'error');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = {
                lastName: formData.get('lastName'),
                firstName: formData.get('firstName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                kommun: formData.get('kommun'),
                question: formData.get('question'),
                timestamp: new Date().toISOString(),
                source: 'SVIT UA Website Form'
            };
            
            // Simulate form submission (replace with actual email service)
            await this.submitForm(data);
            
            // Show success message
            this.showMessage(this.config.submitButton.successMessage, 'success');
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage(this.config.submitButton.errorMessage, 'error');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async submitForm(data) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would send this to your email service
        // For now, we'll just log the data and simulate success
        console.log('Form data to be sent:', data);
        
        // Simulate email sending to configured target
        console.log('Email would be sent to:', this.config.emailTarget);
        console.log('Subject: Нове питання від ' + data.firstName + ' ' + data.lastName);
        console.log('Content:', data);
        
        return true;
    }
    
    setLoadingState(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            if (btnText) btnText.textContent = this.config.submitButton.loadingText;
            if (btnLoading) btnLoading.textContent = this.config.submitButton.loadingText;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            if (btnText) btnText.textContent = this.config.submitButton.text;
        }
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}-message`;
        messageElement.textContent = message;
        
        // Insert before form
        this.form.parentNode.insertBefore(messageElement, this.form);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        
        // Clear all field states
        Object.values(this.fields).forEach(field => {
            field.classList.remove('error', 'success');
            const errorElement = document.getElementById(field.name + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
    
    // Method to dynamically update field requirements
    updateFieldRequirement(fieldName, required) {
        if (this.config.fields[fieldName]) {
            this.config.fields[fieldName].required = required;
            
            const field = this.fields[fieldName];
            if (field) {
                if (required) {
                    field.setAttribute('required', 'required');
                } else {
                    field.removeAttribute('required');
                }
            }
            
            // Update the label to show/hide asterisk
            this.updateFieldLabel(fieldName, this.config.fields[fieldName]);
            
            console.log(`Field ${fieldName} required set to: ${required}`);
        }
    }
    
    // Method to reload configuration
    reloadConfig() {
        this.loadConfig();
        this.initializeFields();
        this.populatePageContent();
        this.populateContactInfo();
        console.log('Configuration reloaded');
    }
    
    // Method to update contact information
    updateContactInfo(newContactInfo) {
        if (newContactInfo) {
            this.config.contactInfo = { ...this.config.contactInfo, ...newContactInfo };
            this.populateContactInfo();
            console.log('Contact information updated:', newContactInfo);
        }
    }
    
    // Method to update page content
    updatePageContent(newPageContent) {
        if (newPageContent) {
            this.config.pageContent = { ...this.config.pageContent, ...newPageContent };
            this.populatePageContent();
            console.log('Page content updated:', newPageContent);
        }
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('questionForm')) {
        window.questionFormValidator = new QuestionFormValidator();
    }
});

// Add CSS for form messages
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
    }
    
    .success-message {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .error-message {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`;
document.head.appendChild(style);
