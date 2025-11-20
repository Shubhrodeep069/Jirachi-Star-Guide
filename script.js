// Section Management
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all nav links
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionId + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-links a[onclick="showSection('${sectionId}')"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            }
        }

        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });




        // Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (savedTheme === "light" || (!savedTheme && prefersLight)) {
        document.body.classList.add("light-theme");
        updateThemeIcon("light");
    }

    themeToggle.addEventListener("click", function () {
        console.log("Theme toggle clicked");
        const isLightTheme = document.body.classList.toggle("light-theme");
        updateThemeIcon(isLightTheme ? "light" : "dark");
        localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    if (theme === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Single DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
    initializeTheme();
    initializePlanetsGrid();
    initializeZodiacGrid();
    showSection("home");
});

        // Birth Chart Calculation with Numerology
        async function calculateBirthChart() {
            const name = document.getElementById('name').value;
            const birthDate = document.getElementById('birthDate').value;
            const birthTime = document.getElementById('birthTime').value;
            const birthPlace = document.getElementById('birthPlace').value;

            if (!name || !birthDate || !birthTime || !birthPlace) {
                alert('Please fill in all fields');
                return;
            }

            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
            button.disabled = true;

            try {
                const birthData = await calculateBirthData(name, birthDate, birthTime, birthPlace);
                displayBirthChartResults(birthData);
            } catch (error) {
                console.error('Error:', error);
                alert('Error calculating birth chart. Please try again.');
            } finally {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        }

        // Calculate birth data including numerology
        async function calculateBirthData(name, date, time, place) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Calculate numerology numbers
            const lifePath = calculateLifePathNumber(date);
            const destiny = calculateDestinyNumber(name);
            const soulUrge = calculateSoulUrgeNumber(name);
            
            return {
                sunSign: getSunSign(date),
                moonSign: getRandomSign(),
                risingSign: getRandomSign(),
                lifePathNumber: lifePath,
                destinyNumber: destiny,
                soulUrgeNumber: soulUrge,
                numerology: {
                    lifePath: getNumerologyMeaning(lifePath),
                    destiny: getNumerologyMeaning(destiny),
                    soulUrge: getNumerologyMeaning(soulUrge)
                }
            };
        }

        function calculateLifePathNumber(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            
            let lifePath = reduceNumber(day) + reduceNumber(month) + reduceNumber(year);
            lifePath = reduceNumber(lifePath);
            
            return lifePath;
        }

        function calculateDestinyNumber(fullName) {
            const numerologyMap = {
                'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
                'B': 2, 'K': 2, 'R': 2,
                'C': 3, 'G': 3, 'L': 3, 'S': 3,
                'D': 4, 'M': 4, 'T': 4,
                'E': 5, 'H': 5, 'N': 5, 'X': 5,
                'U': 6, 'V': 6, 'W': 6,
                'O': 7, 'Z': 7,
                'F': 8, 'P': 8
            };

            let total = 0;
            for (let char of fullName.toUpperCase()) {
                if (numerologyMap[char]) {
                    total += numerologyMap[char];
                }
            }

            let destinyNumber = total;
            while (destinyNumber > 9 && destinyNumber !== 11 && destinyNumber !== 22) {
                destinyNumber = String(destinyNumber).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            }
            return destinyNumber;
        }

        function calculateSoulUrgeNumber(fullName) {
            const vowelMap = { 'A': 1, 'E': 5, 'I': 9, 'O': 6, 'U': 3 };
            let total = 0;
            
            for (let char of fullName.toUpperCase()) {
                if (vowelMap[char]) {
                    total += vowelMap[char];
                }
            }
            
            return reduceNumber(total);
        }

        function reduceNumber(num) {
            if (num === 11 || num === 22 || num === 33) return num;
            while (num > 9) {
                num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
            }
            return num;
        }

        function getSunSign(dateString) {
            const date = new Date(dateString);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            
            if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) return "Capricorn";
            if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) return "Aquarius";
            if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
            if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
            if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
            if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
            if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
            if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
            if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
            if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
            if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
            return "Sagittarius";
        }

        function getRandomSign() {
            const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
            return signs[Math.floor(Math.random() * signs.length)];
        }

        function getNumerologyMeaning(number) {
            const meanings = {
                1: "Leadership, independence, innovation",
                2: "Cooperation, diplomacy, sensitivity",
                3: "Creativity, communication, joy",
                4: "Stability, practicality, organization",
                5: "Freedom, adventure, versatility",
                6: "Responsibility, nurturing, harmony",
                7: "Analysis, spirituality, wisdom",
                8: "Power, abundance, achievement",
                9: "Humanitarianism, compassion, completion",
                11: "Inspiration, intuition, enlightenment",
                22: "Master builder, large-scale achievements"
            };
            return meanings[number] || "Unique spiritual path";
        }

        function displayBirthChartResults(data) {
            const resultsDiv = document.getElementById('birthChartResults');
            let html = `
                <h3>Your Complete Birth Analysis</h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0;">
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px;">
                        <h4 style="color: var(--gold); margin-bottom: 1rem;">Astrological Signs</h4>
                        <p><strong>Sun Sign:</strong> ${data.sunSign}</p>
                        <p><strong>Moon Sign:</strong> ${data.moonSign}</p>
                        <p><strong>Rising Sign:</strong> ${data.risingSign}</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px;">
                        <h4 style="color: var(--gold); margin-bottom: 1rem;">Numerology Numbers</h4>
                        <p><strong>Life Path Number:</strong> ${data.lifePathNumber}</p>
                        <p><strong>Destiny Number:</strong> ${data.destinyNumber}</p>
                        <p><strong>Soul Urge Number:</strong> ${data.soulUrgeNumber}</p>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 10px; margin-top: 2rem;">
                    <h4 style="color: var(--gold); margin-bottom: 1rem;">Numerology Meanings</h4>
                    <p><strong>Life Path ${data.lifePathNumber}:</strong> ${data.numerology.lifePath}</p>
                    <p><strong>Destiny ${data.destinyNumber}:</strong> ${data.numerology.destiny}</p>
                    <p><strong>Soul Urge ${data.soulUrgeNumber}:</strong> ${data.numerology.soulUrge}</p>
                </div>
            `;
            
            resultsDiv.innerHTML = html;
            resultsDiv.style.display = 'block';
        }

        // Compatibility Check
        function checkCompatibility() {
            const sign1 = document.getElementById('person1Sign').value;
            const sign2 = document.getElementById('person2Sign').value;
            
            if (!sign1 || !sign2) {
                alert('Please select both zodiac signs');
                return;
            }
            
            const compatibilityScores = {
                'aries': { aries: 60, taurus: 40, gemini: 70, cancer: 30, leo: 90, virgo: 50, libra: 70, scorpio: 60, sagittarius: 80, capricorn: 40, aquarius: 70, pisces: 50 },
                'taurus': { aries: 40, taurus: 70, gemini: 50, cancer: 80, leo: 50, virgo: 90, libra: 60, scorpio: 70, sagittarius: 40, capricorn: 80, aquarius: 50, pisces: 70 }
                // Add more compatibility scores for other signs
            };
            
            const score = compatibilityScores[sign1]?.[sign2] || Math.floor(Math.random() * 40) + 50;
            
            const resultDiv = document.getElementById('compatibilityResult');
            resultDiv.innerHTML = `
                <h3>Compatibility Result: ${score}%</h3>
                <p>${getCompatibilityMessage(score)}</p>
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                    <strong>Relationship Advice:</strong><br>
                    ${getRelationshipAdvice(sign1, sign2)}
                </div>
            `;
            resultDiv.style.display = 'block';
        }

        function getCompatibilityMessage(score) {
            if (score >= 80) return "Excellent compatibility! This relationship has great potential.";
            if (score >= 60) return "Good compatibility with some areas for growth.";
            if (score >= 40) return "Moderate compatibility - requires effort from both sides.";
            return "Challenging compatibility - significant differences to overcome.";
        }

        function getRelationshipAdvice(sign1, sign2) {
            const advice = {
                'aries-leo': "Both are fire signs - passionate but need to manage tempers.",
                'taurus-cancer': "Earth and water blend well - stable and nurturing relationship.",
                'gemini-aquarius': "Air signs together - intellectual and communicative partnership."
                // Add more advice combinations
            };
            return advice[`${sign1}-${sign2}`] || "Focus on communication and understanding each other's needs.";
        }

        // Daily Horoscope
        function showDailyHoroscope(sign) {
            const horoscopes = {
                'aries': "Today is a day for action! Your energy is high - use it to tackle challenges.",
                'taurus': "Focus on stability today. Financial matters may require your attention.",
                'gemini': "Communication is key today. Social interactions will be rewarding.",
                'cancer': "Emotional matters take center stage. Trust your intuition.",
                'leo': "Your creative energy is flowing. Express yourself boldly today.",
                'virgo': "Attention to detail will serve you well. Organize and plan.",
                'libra': "Balance is important today. Seek harmony in relationships.",
                'scorpio': "Deep insights await. Trust your transformative power.",
                'sagittarius': "Adventure calls! Be open to new experiences today.",
                'capricorn': "Career matters are highlighted. Your ambition is your strength.",
                'aquarius': "Innovative ideas flow. Share your unique perspective.",
                'pisces': "Intuition is strong today. Creative and spiritual pursuits favored."
            };
            
            const resultDiv = document.getElementById('horoscope-result');
            resultDiv.innerHTML = `
                <h3>Daily Horoscope for ${sign.charAt(0).toUpperCase() + sign.slice(1)}</h3>
                <p>${horoscopes[sign]}</p>
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    <strong>Lucky Numbers:</strong> ${Math.floor(Math.random() * 9) + 1}, ${Math.floor(Math.random() * 9) + 1}<br>
                    <strong>Lucky Color:</strong> ${getLuckyColor(sign)}<br>
                    <strong>Best Time:</strong> ${getBestTime(sign)}
                </div>
            `;
            resultDiv.style.display = 'block';
        }

        function getLuckyColor(sign) {
            const colors = {
                'aries': 'Red', 'taurus': 'Green', 'gemini': 'Yellow', 
                'cancer': 'Silver', 'leo': 'Gold', 'virgo': 'Brown',
                'libra': 'Pink', 'scorpio': 'Black', 'sagittarius': 'Purple',
                'capricorn': 'Gray', 'aquarius': 'Blue', 'pisces': 'Sea Green'
            };
            return colors[sign] || 'White';
        }

        function getBestTime(sign) {
            const times = {
                'aries': 'Morning', 'taurus': 'Afternoon', 'gemini': 'Evening',
                'cancer': 'Night', 'leo': 'Noon', 'virgo': 'Early Morning',
                'libra': 'Sunset', 'scorpio': 'Midnight', 'sagittarius': 'Afternoon',
                'capricorn': 'Business Hours', 'aquarius': 'Late Evening', 'pisces': 'Early Evening'
            };
            return times[sign] || 'Anytime';
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showSection('home');
        });


        







        // script.js - Complete version with zodiac data

// Zodiac signs data with complete characteristics
const zodiacData = {
    'aries': {
        name: 'Aries',
        symbol: '♈',
        dates: 'Mar 21 - Apr 19',
        characteristics: {
            personality: `
                <h3>Core Personality</h3>
                <p><strong>Element:</strong> Fire</p>
                <p><strong>Quality:</strong> Cardinal</p>
                <p><strong>Ruling Planet:</strong> Mars</p>
                <p><strong>Symbol:</strong> The Ram</p>
                <p>Aries are natural leaders, filled with energy and enthusiasm. They approach life with initiative and courage, always ready to take on new challenges.</p>
            `,
            strengths: `
                <h3>Strengths</h3>
                <ul>
                    <li>Courageous and determined</li>
                    <li>Confident and enthusiastic</li>
                    <li>Optimistic and honest</li>
                    <li>Passionate and intelligent</li>
                    <li>Pioneering spirit</li>
                    <li>Quick decision makers</li>
                    <li>Great in emergencies</li>
                </ul>
            `,
            weaknesses: `
                <h3>Weaknesses</h3>
                <ul>
                    <li>Impatient and moody</li>
                    <li>Short-tempered and impulsive</li>
                    <li>Aggressive and selfish</li>
                    <li>Argumentative and reckless</li>
                    <li>Can be insensitive</li>
                    <li>Difficulty with follow-through</li>
                </ul>
            `,
            love: `
                <h3>Love & Relationships</h3>
                <p>Aries are passionate lovers who enjoy the thrill of the chase. They need partners who can keep up with their energy and independence.</p>
                <p><strong>Best Matches:</strong> Leo, Sagittarius, Gemini</p>
                <p><strong>Challenges:</strong> Can be impatient in relationships, needs constant excitement</p>
                <p><strong>Love Style:</strong> Direct, passionate, and enthusiastic</p>
            `,
            career: `
                <h3>Career & Money</h3>
                <p>Thrive in leadership positions and competitive environments. Natural entrepreneurs who excel in high-pressure situations.</p>
                <p><strong>Ideal Careers:</strong> Military, sports, entrepreneurship, surgery, engineering</p>
                <p><strong>Money Style:</strong> Impulsive spenders, good at making money but need to learn saving</p>
            `
        }
    },
    'taurus': {
        name: 'Taurus',
        symbol: '♉',
        dates: 'Apr 20 - May 20',
        characteristics: {
            personality: `
                <h3>Core Personality</h3>
                <p><strong>Element:</strong> Earth</p>
                <p><strong>Quality:</strong> Fixed</p>
                <p><strong>Ruling Planet:</strong> Venus</p>
                <p><strong>Symbol:</strong> The Bull</p>
                <p>Taurus is grounded and sensual, appreciating life's pleasures and stability. They are reliable and methodical in their approach to life.</p>
            `,
            strengths: `
                <h3>Strengths</h3>
                <ul>
                    <li>Reliable and patient</li>
                    <li>Practical and devoted</li>
                    <li>Responsible and stable</li>
                    <li>Musical and artistic</li>
                    <li>Great with finances</li>
                    <li>Loyal and committed</li>
                    <li>Good taste and style</li>
                </ul>
            `,
            weaknesses: `
                <h3>Weaknesses</h3>
                <ul>
                    <li>Stubborn and possessive</li>
                    <li>Resistant to change</li>
                    <li>Materialistic and lazy</li>
                    <li>Self-indulgent</li>
                    <li>Can be overly cautious</li>
                    <li>Holds grudges</li>
                </ul>
            `,
            love: `
                <h3>Love & Relationships</h3>
                <p>Taurus seeks stability and security in relationships. They are loyal partners who value comfort and sensual pleasures.</p>
                <p><strong>Best Matches:</strong> Cancer, Virgo, Capricorn</p>
                <p><strong>Challenges:</strong> Can be possessive and resistant to change</p>
                <p><strong>Love Style:</strong> Steady, reliable, and sensual</p>
            `,
            career: `
                <h3>Career & Money</h3>
                <p>Excel in stable, practical careers where they can build security. Natural talents in finance and arts.</p>
                <p><strong>Ideal Careers:</strong> Banking, agriculture, art, music, real estate</p>
                <p><strong>Money Style:</strong> Excellent savers, value quality over quantity</p>
            `
        }
    },
    'gemini': {
        name: 'Gemini',
        symbol: '♊',
        dates: 'May 21 - Jun 20',
        characteristics: {
            personality: `
                <h3>Core Personality</h3>
                <p><strong>Element:</strong> Air</p>
                <p><strong>Quality:</strong> Mutable</p>
                <p><strong>Ruling Planet:</strong> Mercury</p>
                <p><strong>Symbol:</strong> The Twins</p>
                <p>Gemini are expressive, quick-witted, and curious about everything. They thrive on communication and mental stimulation.</p>
            `,
            strengths: `
                <h3>Strengths</h3>
                <ul>
                    <li>Adaptable and versatile</li>
                    <li>Excellent communication skills</li>
                    <li>Youthful and energetic</li>
                    <li>Intelligent and witty</li>
                    <li>Social and outgoing</li>
                    <li>Quick learners</li>
                    <li>Multitasking abilities</li>
                </ul>
            `,
            weaknesses: `
                <h3>Weaknesses</h3>
                <ul>
                    <li>Nervous and inconsistent</li>
                    <li>Indecisive and unreliable</li>
                    <li>Superficial and cunning</li>
                    <li>Inconsistent and gossipy</li>
                    <li>Restless and easily bored</li>
                    <li>Difficulty with commitment</li>
                </ul>
            `,
            love: `
                <h3>Love & Relationships</h3>
                <p>Gemini needs mental stimulation and variety in relationships. They enjoy partners who can keep up with their quick minds.</p>
                <p><strong>Best Matches:</strong> Libra, Aquarius, Aries</p>
                <p><strong>Challenges:</strong> Can be inconsistent and need constant mental stimulation</p>
                <p><strong>Love Style:</strong> Intellectual, communicative, and playful</p>
            `,
            career: `
                <h3>Career & Money</h3>
                <p>Excel in careers that involve communication, variety, and mental challenges. Natural journalists and teachers.</p>
                <p><strong>Ideal Careers:</strong> Journalism, teaching, sales, writing, media</p>
                <p><strong>Money Style:</strong> Spontaneous spenders, good at making money through communication</p>
            `
        }
    }
    // Add more zodiac signs here following the same pattern...
};

// Planets data
const planets = [
    { name: 'Sun', symbol: '☉', color: '#FFD700' },
    { name: 'Moon', symbol: '☽', color: '#F0F8FF' },
    { name: 'Mercury', symbol: '☿', color: '#A9A9A9' },
    { name: 'Venus', symbol: '♀', color: '#FFB6C1' },
    { name: 'Mars', symbol: '♂', color: '#FF4500' },
    { name: 'Jupiter', symbol: '♃', color: '#FFA500' },
    { name: 'Saturn', symbol: '♄', color: '#C0C0C0' },
    { name: 'Uranus', symbol: '♅', color: '#40E0D0' },
    { name: 'Neptune', symbol: '♆', color: '#1E90FF' },
    { name: 'Pluto', symbol: '♇', color: '#800080' },
    { name: 'Rahu', symbol: '☊', color: '#8B4513' },
    { name: 'Ketu', symbol: '☋', color: '#2F4F4F' }
];

// Zodiac signs data for grid
const zodiacSigns = [
    { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
    { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
    { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
    { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
    { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
    { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
    { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
    { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
    { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
    { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
    { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
];

// Section Management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-links a[onclick="showSection('${sectionId}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Initialize planets grid
function initializePlanetsGrid() {
    const grid = document.getElementById('planets-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    planets.forEach(planet => {
        const planetBlock = document.createElement('div');
        planetBlock.className = 'planet-block';
        planetBlock.innerHTML = `
            <div class="planet-icon" style="font-size: 2.5rem; color: ${planet.color}; margin-bottom: 0.5rem;">${planet.symbol}</div>
            <h4>${planet.name}</h4>
        `;
        planetBlock.addEventListener('click', () => showPlanetDetails(planet.name));
        grid.appendChild(planetBlock);
    });
}

// Initialize zodiac grid
function initializeZodiacGrid() {
    const grid = document.getElementById('zodiac-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    zodiacSigns.forEach(sign => {
        const zodiacCard = document.createElement('div');
        zodiacCard.className = 'zodiac-card';
        zodiacCard.innerHTML = `
            <div class="zodiac-symbol">${sign.symbol}</div>
            <h4>${sign.name}</h4>
            <p>${sign.dates}</p>
        `;
        zodiacCard.addEventListener('click', () => showZodiacDetails(sign.name.toLowerCase()));
        grid.appendChild(zodiacCard);
    });
}

// Show zodiac details with all characteristics
function showZodiacDetails(signName) {
    const detailsContainer = document.getElementById('zodiac-details');
    const zodiacNameElement = document.getElementById('selected-zodiac-name');
    const characteristicsContainer = document.getElementById('zodiac-characteristics');
    
    if (!detailsContainer || !zodiacNameElement || !characteristicsContainer) return;
    
    const signData = zodiacData[signName];
    if (!signData) {
        console.error('No data found for sign:', signName);
        return;
    }
    
    zodiacNameElement.textContent = `${signData.name} Characteristics`;
    characteristicsContainer.innerHTML = '';
    
    const characteristics = ['personality', 'strengths', 'weaknesses', 'love', 'career'];
    
    characteristics.forEach((charType, index) => {
        if (signData.characteristics[charType]) {
            const charCard = document.createElement('div');
            charCard.className = 'zodiac-characteristic-card';
            charCard.style.animationDelay = `${index * 0.2}s`;
            charCard.innerHTML = signData.characteristics[charType];
            characteristicsContainer.appendChild(charCard);
        }
    });
    
    detailsContainer.style.display = 'block';
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Show planet details with all 12 houses
function showPlanetDetails(planetName) {
    const detailsContainer = document.getElementById('planet-details');
    const planetNameElement = document.getElementById('selected-planet-name');
    const housesGrid = document.getElementById('houses-grid');
    
    if (!detailsContainer || !planetNameElement || !housesGrid) return;
    
    // Update active planet
    document.querySelectorAll('.planet-block').forEach(block => {
        block.classList.remove('active');
        if (block.querySelector('h4').textContent === planetName) {
            block.classList.add('active');
        }
    });
    
    planetNameElement.textContent = `${planetName} in All 12 Houses`;
    housesGrid.innerHTML = '';
    
    // Create house cards with animations
    for (let i = 1; i <= 12; i++) {
        const houseCard = document.createElement('div');
        houseCard.className = 'house-card';
        houseCard.style.animationDelay = `${i * 0.1}s`;
        houseCard.innerHTML = `
            <h4>${planetName} in ${getOrdinal(i)} House</h4>
            <p>${getHouseDescription(planetName, i)}</p>
        `;
        housesGrid.appendChild(houseCard);
    }
    
    detailsContainer.style.display = 'block';
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Helper functions
function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}










// Complete planetary house descriptions
function getHouseDescription(planetName, houseNumber) {
    const planetaryHouses = {
        'Sun': {
            1: 'Strong sense of identity, natural leadership, charismatic personality. You shine brightly and are noticed wherever you go.',
            2: 'Values self-worth through possessions and financial security. Good at attracting wealth but may overspend on luxury.',
            3: 'Expressive communicator, curious mind, strong sibling connections. Your ideas carry authority and influence.',
            4: 'Deep connection to family roots and emotional security. Strong need for a beautiful and comfortable home environment.',
            5: 'Creative self-expression, romantic nature, love for entertainment and children. Natural performer and entertainer.',
            6: 'Service-oriented, health-conscious, analytical worker. Takes pride in work and seeks recognition through service.',
            7: 'Partnership-focused, seeks equal relationships. Attracts strong partners and needs recognition in relationships.',
            8: 'Deep, transformative nature, interest in mysteries and psychology. Powerful presence in intimate relationships.',
            9: 'Philosophical, love for travel and higher learning. Natural teacher with strong beliefs and principles.',
            10: 'Ambitious, career-focused, seeks public recognition. Natural leader destined for career success and fame.',
            11: 'Socially conscious, innovative, values friendships and community. Shines in group settings and humanitarian causes.',
            12: 'Spiritual, intuitive, private, connection to subconscious. Hidden talents and behind-the-scenes influence.'
        },
        'Moon': {
            1: 'Emotions visible to all, nurturing personality. Moods affect appearance and first impressions.',
            2: 'Emotional security through possessions and financial stability. Intuitive about money matters.',
            3: 'Emotional communication, curious mind. Learns through feelings and needs emotional connection in communication.',
            4: 'Deep connection to home and family. Strong nurturing instincts and need for emotional roots.',
            5: 'Emotional creativity, romantic nature. Feelings are expressed dramatically and creatively.',
            6: 'Emotional about work and health. Needs emotional satisfaction from daily routines and service.',
            7: 'Emotional partnerships, need for emotional harmony. Projects feelings onto partners.',
            8: 'Deep emotional transformations. Intense emotional bonds and psychic sensitivity.',
            9: 'Emotional connection to beliefs and philosophy. Learns through emotional experiences.',
            10: 'Public emotions, emotional career. Reputation affected by emotional states.',
            11: 'Emotional friendships, community feelings. Needs emotional connection with friends and groups.',
            12: 'Hidden emotions, spiritual feelings. Private emotional world and subconscious patterns.'
        },
        'Mercury': {
            1: 'Quick-thinking, expressive, curious. Mind and identity are closely connected.',
            2: 'Practical thinking, value-oriented communication. Good with financial calculations and negotiations.',
            3: 'Natural communicator, curious, learning-oriented. Excellent writing and speaking abilities.',
            4: 'Thoughts influenced by family and home environment. Good memory for emotional experiences.',
            5: 'Creative thinking, playful communication. Expresses ideas through creative channels.',
            6: 'Analytical mind, detail-oriented thinking. Excellent problem-solving in work environment.',
            7: 'Diplomatic communication, partnership-oriented thinking. Considers others perspectives.',
            8: 'Deep, investigative mind. Interested in mysteries, research, and psychology.',
            9: 'Philosophical thinking, higher learning. Enjoys teaching and exploring different cultures.',
            10: 'Strategic thinking, career-oriented communication. Good at public speaking and career planning.',
            11: 'Innovative ideas, futuristic thinking. Excellent at networking and group communication.',
            12: 'Intuitive mind, subconscious thinking. Creative ideas come from dreams and intuition.'
        },
        'Venus': {
            1: 'Charming, attractive, diplomatic. Natural beauty and grace in appearance.',
            2: 'Values luxury, beauty, and comfort. Attracts wealth and enjoys material pleasures.',
            3: 'Charming communication, artistic expression. Enjoy learning and sharing through art.',
            4: 'Beautiful home environment, family harmony. Strong attachment to family traditions.',
            5: 'Romantic, creative, love for arts. Natural talent in creative and romantic expression.',
            6: 'Service through beauty, health consciousness. Finds pleasure in helping others.',
            7: 'Harmonious partnerships, diplomatic relationships. Attracts beautiful and artistic partners.',
            8: 'Intense relationships, transformative love. Deep emotional and sexual connections.',
            9: 'Love for travel, cultural appreciation. Attracted to foreign partners and philosophies.',
            10: 'Charming public image, career through arts. Success in beauty, fashion, or arts industry.',
            11: 'Social grace, artistic friendships. Attracts influential friends and group recognition.',
            12: 'Secret romances, spiritual love. Private artistic talents and compassionate nature.'
        },
        'Mars': {
            1: 'Assertive, pioneering, energetic. Strong physical energy and competitive nature.',
            2: 'Energetic about earning money, financial initiative. Can be impulsive with spending.',
            3: 'Energetic communication, quick actions. Competitive in learning and speaking.',
            4: 'Energetic about home and family. May have conflicts with family members.',
            5: 'Energetic creativity, competitive sports. Passionate romance and creative drive.',
            6: 'Hard worker, health activism. Lots of energy for work and service activities.',
            7: 'Assertive in partnerships, competitive relationships. Needs active partners.',
            8: 'Intense energy, transformative actions. Powerful in crisis situations.',
            9: 'Energetic about beliefs, adventurous spirit. Loves physical travel and challenges.',
            10: 'Ambitious career drive, competitive professional. Natural leader and entrepreneur.',
            11: 'Energetic in groups, innovative actions. Leads social causes and reforms.',
            12: 'Hidden energy, spiritual warrior. Works behind the scenes and has secret ambitions.'
        },
        'Jupiter': {
            1: 'Optimistic personality, expansive nature. Natural luck and positive outlook on life.',
            2: 'Financial expansion, wealth attraction. Good fortune with money and resources.',
            3: 'Expansive communication, philosophical learning. Success through writing and teaching.',
            4: 'Expansive home life, fortunate family. Benefits from property and family connections.',
            5: 'Creative expansion, fortunate romance. Success in creative projects and with children.',
            6: 'Lucky with health, expansive service. Benefits through work and health routines.',
            7: 'Fortunate partnerships, expansive relationships. Benefits through marriage and business partners.',
            8: 'Financial growth through others, philosophical depth. Interest in metaphysics and inheritance.',
            9: 'Natural philosopher, fortunate travels. Success in higher education and foreign affairs.',
            10: 'Career expansion, public recognition. Success and growth in professional life.',
            11: 'Social expansion, fortunate friendships. Benefits through groups and social networks.',
            12: 'Spiritual growth, hidden blessings. Compassionate service and spiritual wisdom.'
        },
        'Saturn': {
            1: 'Disciplined personality, serious nature. Takes life seriously and has strong self-control.',
            2: 'Financial discipline, careful spending. Builds wealth slowly through hard work.',
            3: 'Serious communication, structured learning. Methodical thinking and speaking.',
            4: 'Structured home life, family responsibilities. Strong sense of duty to family.',
            5: 'Disciplined creativity, serious romance. Takes creative work and love seriously.',
            6: 'Hard worker, health discipline. Strong work ethic and attention to health routines.',
            7: 'Serious partnerships, committed relationships. Looks for stable, mature partners.',
            8: 'Deep responsibilities, transformative discipline. Handles crises with maturity.',
            9: 'Structured beliefs, traditional philosophy. Systematic approach to higher learning.',
            10: 'Career discipline, ambitious goals. Builds career slowly but steadily.',
            11: 'Responsible friendships, structured goals. Serious about social responsibilities.',
            12: 'Spiritual discipline, karmic lessons. Solitude needed for spiritual growth.'
        },
        'Uranus': {
            1: 'Unique personality, independent nature. Unconventional appearance and revolutionary ideas.',
            2: 'Unconventional values, sudden financial changes. Innovative approach to money.',
            3: 'Original communication, sudden insights. Unusual learning methods and ideas.',
            4: 'Unconventional home life, sudden moves. Breaks from family traditions.',
            5: 'Creative innovation, unusual romance. Sudden creative inspirations and love affairs.',
            6: 'Unconventional work methods, sudden job changes. Innovative health approaches.',
            7: 'Unusual partnerships, sudden relationships. Attracts unique and independent partners.',
            8: 'Transformative insights, sudden changes. Interest in occult and metaphysics.',
            9: 'Revolutionary beliefs, sudden travels. Unconventional philosophical views.',
            10: 'Unconventional career, sudden fame. Innovative professional approach.',
            11: 'Social innovation, unique friendships. Involved in progressive groups and causes.',
            12: 'Spiritual innovation, hidden talents. Sudden psychic insights and revelations.'
        },
        'Neptune': {
            1: 'Dreamy personality, spiritual nature. Mysterious appearance and compassionate heart.',
            2: 'Intuitive about money, spiritual values. May have confusion about finances.',
            3: 'Imaginative communication, poetic expression. Creative writing and spiritual teaching.',
            4: 'Dreamy home environment, spiritual roots. Strong connection to family karma.',
            5: 'Creative dreams, romantic ideals. Artistic talents and spiritual romance.',
            6: 'Service through healing, compassionate work. Interest in alternative health.',
            7: 'Idealistic partnerships, spiritual relationships. Seeks soulmate connections.',
            8: 'Psychic sensitivity, spiritual transformations. Deep connection to universal consciousness.',
            9: 'Spiritual beliefs, mystical travels. Interest in spiritual practices and philosophies.',
            10: 'Dreamy career, spiritual vocation. Success in arts, healing, or spiritual fields.',
            11: 'Spiritual friendships, idealistic goals. Involved in spiritual or humanitarian groups.',
            12: 'Deep spirituality, psychic abilities. Strong connection to divine and universal love.'
        },
        'Pluto': {
            1: 'Intense personality, powerful presence. Transformative life path and strong will.',
            2: 'Transformative relationship with money, financial power. Can lose and regain wealth dramatically.',
            3: 'Powerful communication, investigative mind. Ability to influence others through words.',
            4: 'Deep family transformations, powerful roots. May experience major family changes.',
            5: 'Intense creativity, powerful romance. Transformative creative expression and love affairs.',
            6: 'Transformative work, healing power. Ability to transform health and work environments.',
            7: 'Intense partnerships, power struggles. Relationships involve deep transformations.',
            8: 'Natural psychologist, transformative power. Deep understanding of life and death cycles.',
            9: 'Powerful beliefs, transformative travels. Life-changing philosophical insights.',
            10: 'Career transformations, public power. Rise and fall in career with eventual mastery.',
            11: 'Transformative friendships, social power. Ability to influence groups and society.',
            12: 'Spiritual power, hidden transformations. Works with collective unconscious and karma.'
        },
        'Rahu': {
            1: 'Ambitious personality, desire for recognition. Strong drive for personal achievement.',
            2: 'Material desires, wealth attraction. Strong focus on financial security and luxury.',
            3: 'Desire for knowledge, communication skills. Ambitious about learning and speaking.',
            4: 'Desire for emotional security, property matters. Strong attachment to home and family.',
            5: 'Creative ambitions, romantic desires. Strong drive for creative expression and love.',
            6: 'Desire for perfection, health ambitions. Ambitious about work and service.',
            7: 'Partnership ambitions, desire for social status. Attracts influential partners.',
            8: 'Desire for transformation, occult interests. Strong interest in mysteries and research.',
            9: 'Desire for higher knowledge, foreign connections. Ambitious about travel and philosophy.',
            10: 'Career ambitions, desire for fame. Strong drive for professional success.',
            11: 'Social ambitions, desire for influence. Wants to lead groups and social causes.',
            12: 'Spiritual desires, hidden ambitions. Secret goals and spiritual yearnings.'
        },
        'Ketu': {
            1: 'Spiritual personality, detachment from self. May feel disconnected from personal identity.',
            2: 'Detachment from material things, spiritual values. Less interest in wealth accumulation.',
            3: 'Intuitive communication, detached learning. Learns through intuition rather than study.',
            4: 'Detachment from family, spiritual roots. May feel disconnected from family traditions.',
            5: 'Spiritual creativity, detached romance. Creative inspiration from spiritual sources.',
            6: 'Detached service, spiritual health. Serves without attachment to results.',
            7: 'Spiritual partnerships, detached relationships. Looks for spiritual connections.',
            8: 'Deep spirituality, detachment from transformation. Natural psychic and healer.',
            9: 'Spiritual beliefs, detachment from philosophy. Direct spiritual experiences.',
            10: 'Spiritual career, detachment from fame. Works behind the scenes spiritually.',
            11: 'Spiritual friendships, detached goals. Involved in spiritual groups and causes.',
            12: 'Deep spirituality, liberation. Strong connection to enlightenment and moksha.'
        }
    };

    // Return the specific description or a default message
    if (planetaryHouses[planetName] && planetaryHouses[planetName][houseNumber]) {
        return planetaryHouses[planetName][houseNumber];
    } else {
        return `The ${planetName} influences the ${getOrdinal(houseNumber)} house area in unique ways specific to its nature.`;
    }
}









// Theme Toggle with Local Storage
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    // Set initial theme
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.classList.add('light-theme');
        updateThemeIcon('light');
    } else {
        updateThemeIcon('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isLightTheme = document.body.classList.toggle('light-theme');
            
            // Update icon
            updateThemeIcon(isLightTheme ? 'light' : 'dark');
            
            // Save preference to localStorage
            localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        });
    }
    
    // Initialize grids
    initializePlanetsGrid();
    initializeZodiacGrid();
});

// Helper function to update theme icon
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}


