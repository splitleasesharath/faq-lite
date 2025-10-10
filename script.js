// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ==================== Tab Switching Functionality ====================
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Scroll to FAQ container smoothly
            document.querySelector('.faq-container').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // ==================== Accordion Functionality ====================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');

            // Close all accordion items (optional - remove these lines for multi-open accordion)
            accordionItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==================== Market Research Widget ====================
    const marketWidget = document.getElementById('marketWidget');
    const closeWidget = document.querySelector('.close-widget');
    const nextBtn = document.querySelector('.next-btn');
    const widgetTextarea = marketWidget.querySelector('textarea');

    // Close widget functionality
    closeWidget.addEventListener('click', function() {
        marketWidget.style.display = 'none';
    });

    // Enable/disable Next button based on textarea input
    widgetTextarea.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            nextBtn.style.background = '#5B4AD6';
            nextBtn.style.cursor = 'pointer';
            nextBtn.disabled = false;
        } else {
            nextBtn.style.background = '#d0d0d0';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.disabled = true;
        }
    });

    // Initialize button state
    nextBtn.style.background = '#d0d0d0';
    nextBtn.style.cursor = 'not-allowed';
    nextBtn.disabled = true;

    // Next button click handler
    nextBtn.addEventListener('click', function() {
        if (!this.disabled) {
            alert('Thank you for your interest! We will send you the market research report shortly.');
            widgetTextarea.value = '';
            nextBtn.style.background = '#d0d0d0';
            nextBtn.disabled = true;
        }
    });

    // ==================== Floating Chat Button ====================
    const floatingChatBtn = document.querySelector('.floating-chat-btn');

    floatingChatBtn.addEventListener('click', function() {
        alert('Chat feature coming soon! Contact us at support@splitlease.com');
    });

    // ==================== AI Chat Widget ====================
    const aiInput = document.querySelector('.ai-input');
    const voiceBtn = document.querySelector('.voice-btn');
    const exploreBtn = document.querySelector('.explore-btn');
    const chatTooltip = document.querySelector('.chat-tooltip');

    // AI input handler
    aiInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim().length > 0) {
            handleAIQuery(this.value);
            this.value = '';
        }
    });

    // Voice button handler
    voiceBtn.addEventListener('click', function() {
        alert('Voice input feature coming soon!');
    });

    // Explore button handler
    exploreBtn.addEventListener('click', function() {
        // Scroll to top and switch to general tab
        window.scrollTo({ top: 0, behavior: 'smooth' });
        tabs[0].click();
    });

    // Simple AI query handler
    function handleAIQuery(query) {
        const lowerQuery = query.toLowerCase();

        // Simple keyword matching
        if (lowerQuery.includes('price') || lowerQuery.includes('cost')) {
            alert('Pricing varies by location and amenities. You can filter by price range when searching for properties. Most rentals range from $50-150 per night.');
        } else if (lowerQuery.includes('book') || lowerQuery.includes('reservation')) {
            alert('To book: 1) Search for available spaces, 2) Select your dates, 3) Review the listing, 4) Complete payment. It\'s that simple!');
        } else if (lowerQuery.includes('cancel')) {
            alert('Cancellation policies vary by host. Check the specific policy before booking. Most offer flexible cancellation up to 24-48 hours before check-in.');
        } else if (lowerQuery.includes('host')) {
            alert('To become a host, click "Host with Us" in the menu and complete the listing process. It takes about 15-20 minutes.');
        } else {
            alert('I found several FAQ articles that might help. Check out the FAQ sections above or contact support@splitlease.com for more help.');
        }
    }

    // Hide tooltip after 10 seconds
    setTimeout(function() {
        if (chatTooltip) {
            chatTooltip.style.opacity = '0';
            chatTooltip.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                chatTooltip.style.display = 'none';
            }, 500);
        }
    }, 10000);

    // ==================== Smooth Scroll for Links ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Footer Form Handlers ====================
    const shareBtn = document.querySelector('.share-btn');
    const submitBtn = document.querySelector('.submit-btn');

    shareBtn.addEventListener('click', function() {
        const emailInput = this.previousElementSibling;
        const email = emailInput.value;
        const shareMethod = document.querySelector('input[name="share-method"]:checked').value;

        if (email.trim() && validateEmail(email)) {
            alert(`Referral invitation will be sent via ${shareMethod} to ${email}`);
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });

    submitBtn.addEventListener('click', function() {
        const inputs = this.parentElement.querySelectorAll('.footer-input');
        const url = inputs[0].value;
        const email = inputs[1].value;

        if (url.trim() && email.trim() && validateEmail(email)) {
            alert('Your listing import request has been submitted! We will process it shortly.');
            inputs[0].value = '';
            inputs[1].value = '';
        } else {
            alert('Please fill in both URL and email address correctly.');
        }
    });

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ==================== Scroll Effects ====================
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow to header on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ==================== Hover Effects for Buttons ====================
    const allButtons = document.querySelectorAll('button, .btn-primary');

    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transition = 'all 0.2s ease';
            }
        });
    });

    // ==================== Keyboard Accessibility ====================
    // Allow Enter/Space to trigger accordion
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');

        header.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                this.setAttribute('aria-expanded',
                    item.classList.contains('active') ? 'true' : 'false'
                );
            }
        });
    });

    // Allow Enter/Space to trigger tabs
    tabs.forEach(tab => {
        tab.setAttribute('role', 'tab');
        tab.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ==================== Animation on Scroll (Optional) ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe accordion items for fade-in animation
    accordionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(item);
    });

    // ==================== Initialize ====================
    console.log('Split Lease FAQ Page Loaded Successfully!');
    console.log('Total FAQ sections:', tabContents.length);
    console.log('Total FAQ items:', accordionItems.length);

});
