// Support Section Content
const supportContent = {
    'help-center': {
        title: 'Help Center',
        content: `
            <h2>Help Center</h2>
            <p>Welcome to our Help Center! We're here to assist you with any questions about our astrological services.</p>
            
            <h3>Frequently Asked Questions</h3>
            <ul>
                <li><strong>How accurate are the birth chart readings?</strong><br>
                Our birth chart calculations use precise astronomical data and are highly accurate for the time and location provided.</li>
                
                <li><strong>Can I save my birth chart for future reference?</strong><br>
                Yes! Create an account to save your birth chart and access it anytime.</li>
                
                <li><strong>How often are horoscopes updated?</strong><br>
                Daily horoscopes are updated every 24 hours at midnight UTC.</li>
                
                <li><strong>What if I don't know my exact birth time?</strong><br>
                We can still generate a birth chart using noon as default, but for maximum accuracy, we recommend using your exact birth time.</li>
            </ul>
            
            <h3>Need More Help?</h3>
            <p>Contact our support team for personalized assistance with any technical issues or questions about your readings.</p>
        `
    },
    'contact-us': {
        title: 'Contact Us',
        content: `
            <h2>Contact Our Cosmic Support Team</h2>
            <p>We'd love to hear from you! Reach out to us through any of the following channels:</p>
            
            <h3>🌌 Email Support</h3>
            <ul>
                <li><strong>General Inquiries:</strong> support@cosmicinsight.com</li>
                <li><strong>Technical Support:</strong> tech@cosmicinsight.com</li>
                <li><strong>Partnerships:</strong> partnerships@cosmicinsight.com</li>
            </ul>
            
            <h3>📞 Phone Support</h3>
            <ul>
                <li><strong>US & Canada:</strong> +1 (555) 123-STAR</li>
                <li><strong>UK:</strong> +44 (0) 20 1234 5678</li>
                <li><strong>Hours:</strong> Monday-Friday, 9AM-6PM EST</li>
            </ul>
            
            <h3>📍 Office Location</h3>
            <p>Cosmic Insight Headquarters<br>
            123 Astrology Avenue<br>
            Celestial City, CS 12345<br>
            United States</p>
            
            <h3>💫 Emergency Support</h3>
            <p>For urgent matters outside business hours, please email <strong>emergency@cosmicinsight.com</strong> and we'll respond within 2 hours.</p>
        `
    },
    'privacy-policy': {
        title: 'Privacy Policy',
        content: `
            <h2>Privacy Policy</h2>
            <p>At Cosmic Insight, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
            
            <h3>Information We Collect</h3>
            <ul>
                <li><strong>Birth Data:</strong> Date, time, and location for accurate astrological calculations</li>
                <li><strong>Account Information:</strong> Name, email, and preferences when you create an account</li>
                <li><strong>Usage Data:</strong> How you interact with our platform to improve user experience</li>
                <li><strong>Cookies:</strong> To remember your preferences and login status</li>
            </ul>
            
            <h3>How We Use Your Information</h3>
            <ul>
                <li>Generate accurate astrological readings and birth charts</li>
                <li>Personalize your experience on our platform</li>
                <li>Improve our services and develop new features</li>
                <li>Send important updates about your account (with your consent)</li>
            </ul>
            
            <h3>Data Protection</h3>
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul>
                <li>Encryption of sensitive information</li>
                <li>Regular security audits</li>
                <li>Limited access to personal data</li>
                <li>Secure server infrastructure</li>
            </ul>
            
            <h3>Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal data at any time through your account settings or by contacting us.</p>
            
            <p><em>Last updated: January 2024</em></p>
        `
    },
    'terms-of-service': {
        title: 'Terms of Service',
        content: `
            <h2>Terms of Service</h2>
            <p>Welcome to Cosmic Insight! By using our services, you agree to these terms and conditions.</p>
            
            <h3>Service Description</h3>
            <p>Cosmic Insight provides astrological calculations, birth chart interpretations, numerology readings, and related spiritual guidance services for entertainment and self-reflection purposes.</p>
            
            <h3>User Responsibilities</h3>
            <ul>
                <li>Provide accurate birth information for calculations</li>
                <li>Use our services for personal purposes only</li>
                <li>Respect our intellectual property rights</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use our services in compliance with applicable laws</li>
            </ul>
            
            <h3>Disclaimer</h3>
            <p><strong>Important:</strong> Our astrological services are provided for entertainment and self-reflection purposes only. They should not be used as a substitute for professional medical, legal, financial, or psychological advice. Always consult qualified professionals for important life decisions.</p>
            
            <h3>Subscription Terms</h3>
            <ul>
                <li>Free accounts have access to basic features</li>
                <li>Premium subscriptions provide enhanced readings and features</li>
                <li>Subscriptions automatically renew unless canceled</li>
                <li>Refunds are available within 14 days of purchase</li>
            </ul>
            
            <h3>Intellectual Property</h3>
            <p>All content, algorithms, and designs on Cosmic Insight are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our permission.</p>
            
            <h3>Termination</h3>
            <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.</p>
            
            <p><em>By using our services, you acknowledge that you have read and agree to these terms.</em></p>
        `
    }
};

// Modal functionality
function showSupportContent(contentKey) {
    const modal = document.getElementById('support-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (supportContent[contentKey]) {
        modalBody.innerHTML = supportContent[contentKey].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeSupportModal() {
    const modal = document.getElementById('support-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById('support-modal');
    if (event.target === modal) {
        closeSupportModal();
    }
}

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSupportModal);
    }
    
    // Add click handlers to footer support links
    const supportLinks = document.querySelectorAll('.footer-section:nth-child(3) .footer-links a');
    supportLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.toLowerCase().replace(/\s+/g, '-');
            showSupportContent(linkText);
        });
    });
});