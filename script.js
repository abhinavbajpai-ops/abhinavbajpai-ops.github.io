/* ============================================
   PROFESSIONAL PORTFOLIO - JAVASCRIPT
   AI Assistant, Charts, & Interactivity
   ============================================ */

// ============================================
// PROFILE IMAGE HANDLER
// ============================================

function setupProfileImageUpload() {
  const profileImages = document.querySelectorAll('.profile-image, .large-profile-image');
  
  profileImages.forEach(img => {
    img.addEventListener('click', function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      
      input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
          // Update all profile images
          document.querySelectorAll('.profile-image, .large-profile-image').forEach(el => {
            el.src = event.target.result;
          });
          
          // Save to localStorage
          localStorage.setItem('profileImage', event.target.result);
          console.log('✅ Profile image updated!');
        };
        
        reader.readAsDataURL(file);
      };
      
      input.click();
    });
  });
  
  // Load profile image from localStorage if it exists
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    document.querySelectorAll('.profile-image, .large-profile-image').forEach(el => {
      el.src = savedImage;
    });
  }
}

// ============================================
// AI ASSISTANT CHATBOT
// ============================================

const aiAssistant = document.getElementById('aiAssistant');
const aiMinimize = document.getElementById('aiMinimize');
const aiMessages = document.getElementById('aiMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let conversationHistory = [];

// Knowledge base for AI
const knowledgeBase = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings'],
    responses: [
      'Hey there! 👋 I\'m your AI guide. Ask me about Abhinav\'s skills, achievements, education, or projects!',
      'Hello! Ready to learn more about this portfolio? Ask away!'
    ]
  },
  name: {
    keywords: ['abhinav', 'name', 'who are you'],
    responses: [
      '👤 I\'m abhinav Bajpai, a strategic thinker and aspiring leader!',
      '🎯 abhinav - pursuing BBA from IIM Bangalore with focus on Digital Business & Entrepreneurship.'
    ]
  },
  skills: {
    keywords: ['skill', 'competency', 'ability', 'expertise'],
    responses: [
      '📊 4 core competency areas: Strategic & Analytical, Business & Entrepreneurship, Policy & Governance, and Leadership.',
      '💡 Top skills include Strategic Problem Solving (95%), Public Policy Research (93%), and Team Leadership (94%)!'
    ]
  },
  education: {
    keywords: ['education', 'school', 'college', 'university', 'degree', 'iim', 'bangalore'],
    responses: [
      '🎓 Pursuing BBA from Indian Institute of Management Bangalore (2025-2028) in Digital Business & Entrepreneurship.',
      '📚 Also completed Class XII from School with Science (PCB) specialization.'
    ]
  },
  achievements: {
    keywords: ['achievement', 'award', 'winner', 'finalist', 'jagriti', 'strat', 'competition'],
    responses: [
      '🏆 National Finalist in Strat-Impact: A Strategy Case Competition at Jagriti 2026, IIT (BHU) Varanasi!',
      '⭐ Also Runner-Up in Interschool Academic Quiz, Winner of Biology Gene Pool Workshop, and MUN Participant.'
    ]
  },
  projects: {
    keywords: ['project', 'work', 'case', 'analysis', 'marketing'],
    responses: [
      '🚀 Featured project: Marketing Strategy Analysis of digital platform growth models in travel industry.',
      '📈 Analyzed MakeMyTrip and OYO focusing on Digital Acquisition, Consumer Engagement, and Platform Scaling.'
    ]
  },
  leadership: {
    keywords: ['leader', 'leadership', 'captain', 'manage', 'lead'],
    responses: [
      '👑 Demonstrated leadership through multiple roles and experiences.',
      '⚽ Led teams and managed strategic initiatives showcasing strong interpersonal skills.'
    ]
  },
  contact: {
    keywords: ['contact', 'email', 'reach', 'message', 'connect', 'linkedin'],
    responses: [
      '📧 You can reach via email or LinkedIn. Use the contact form below to send a message!',
      '💬 Feel free to connect on social media or use the contact section to get in touch!'
    ]
  },
  personality: {
    keywords: ['who are you', 'about', 'tell me', 'describe', 'yourself', 'profile'],
    responses: [
      '👤 Analytical undergraduate at IIM Bangalore specializing in Digital Business & Entrepreneurship.',
      '🎯 Passionate about combining strategic thinking with data-driven analysis to solve complex problems!'
    ]
  }
};

// Initialize AI
function initializeAI() {
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
  aiMinimize.addEventListener('click', toggleMinimize);
}

// Send message
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  userInput.value = '';

  // Get AI response
  setTimeout(() => {
    const response = getAIResponse(message);
    addMessage(response, 'bot');
  }, 400);
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${sender}`;
  messageDiv.innerHTML = `<p>${text}</p>`;
  aiMessages.appendChild(messageDiv);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

// Get AI response based on keywords
function getAIResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  for (const category in knowledgeBase) {
    const category_data = knowledgeBase[category];
    for (const keyword of category_data.keywords) {
      if (lowerMessage.includes(keyword)) {
        return category_data.responses[Math.floor(Math.random() * category_data.responses.length)];
      }
    }
  }

  // Default responses
  const defaultResponses = [
    '🤔 That\'s interesting! Could you be more specific? Ask about abhinav\'s skills, education, projects, or achievements!',
    '💭 I\'m still learning! Try asking about specific areas or accomplishments.',
    '👍 Great question! Check the relevant section on the website for more details!'
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Toggle minimize
function toggleMinimize() {
  aiAssistant.classList.toggle('minimized');
  const isMinimized = aiAssistant.classList.contains('minimized');
  aiMessages.style.display = isMinimized ? 'none' : 'flex';
  aiMessages.parentElement.style.display = isMinimized ? 'none' : 'flex';
  document.querySelector('.ai-input-area').style.display = isMinimized ? 'none' : 'flex';
}

// ============================================
// CHARTS INITIALIZATION
// ============================================

function initializeCharts() {
  // 1. Skills Distribution (Pie Chart)
  const ctx1 = document.getElementById('skillsChart')?.getContext('2d');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Strategic', 'Business', 'Policy', 'Leadership'],
        datasets: [{
          data: [25, 25, 25, 25],
          backgroundColor: [
            '#0a2540',
            '#16a085',
            '#f39c12',
            '#3498db'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12 },
              padding: 15,
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  // 2. Skills Proficiency (Radar Chart)
  const ctx2 = document.getElementById('proficiencyChart')?.getContext('2d');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'radar',
      data: {
        labels: ['Problem Solving', 'Market Analysis', 'Leadership', 'Policy Analysis', 'Communication'],
        datasets: [{
          label: 'Proficiency Level',
          data: [95, 88, 94, 93, 91],
          borderColor: '#16a085',
          backgroundColor: 'rgba(22, 160, 133, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#16a085',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            labels: { font: { size: 12 } }
          }
        }
      }
    });
  }

  // 3. Achievements Distribution (Bar Chart)
  const ctx3 = document.getElementById('achievementChart')?.getContext('2d');
  if (ctx3) {
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['National', 'School', 'Science', 'Diplomacy'],
        datasets: [{
          label: 'Achievements',
          data: [1, 1, 1, 1],
          backgroundColor: [
            '#f39c12',
            '#95a5a6',
            '#cd7f32',
            '#16a085'
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            max: 2
          }
        }
      }
    });
  }

  // 4. Career Focus Areas (Polar Chart)
  const ctx4 = document.getElementById('focusChart')?.getContext('2d');
  if (ctx4) {
    new Chart(ctx4, {
      type: 'polarArea',
      data: {
        labels: ['Public Policy', 'Startups', 'Strategy', 'Digital', 'Governance'],
        datasets: [{
          label: 'Interest Level',
          data: [90, 85, 95, 88, 87],
          backgroundColor: [
            '#0a2540',
            '#16a085',
            '#0f3460',
            '#3498db',
            '#9b59b6'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12 },
              padding: 15
            }
          }
        },
        scales: {
          r: {
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    });
  }
}

// ============================================
// NAVIGATION TOGGLE (MOBILE)
// ============================================

function initializeNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// ============================================
// PROJECT DROPDOWN/EXPAND
// ============================================

function toggleProject(button) {
  const projectCard = button.closest('.project-card');
  const details = projectCard.querySelector('.project-details');
  details.classList.toggle('active');

  // Update button text
  if (details.classList.contains('active')) {
    button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
  } else {
    button.innerHTML = '<i class="fas fa-chevron-down"></i> Learn More';
  }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

function handleContactForm(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const name = event.target.querySelector('input[type="text"]').value;

  // Show success message
  alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon!`);

  // Reset form
  event.target.reset();
}

// ============================================
// DOWNLOAD RESUME
// ============================================

function downloadResume() {
  // Create a simple resume download
  const resumeContent = `
ABHINAV BAJPAI -  RESUME
=====================================

CONTACT INFORMATION:
Email: abhinavbajpai25@iimb.ac.in
LinkedIn: linkedin.com/in/abhinav-bajpai-a68bb3384/
Location: New Delhi, India

EDUCATION:
- Indian Institute of Management Bangalore (2025-2028)
  Bachelor of Business Administration
  Specialization: Digital Business & Entrepreneurship

- Class XII - Science (PCB) - Score: 76.4%

CORE COMPETENCIES:
✓ Strategic Problem Solving (95%)
✓ Public Policy Research (93%)
✓ Team Leadership (94%)
✓ Market Analysis (88%)
✓ Business Case Analysis (87%)
✓ Startup Growth Strategy (92%)
✓ Decision Making (92%)
✓ Stakeholder Communication (91%)

ACHIEVEMENTS:
🏆 National Finalist - Strat-Impact: A Strategy Case Competition
   Jagriti 2026, IIT (BHU) Varanasi (February 2026)

🥈 Runner-Up - Interschool Academic Quiz

🎖️ Winner - Biology Gene Pool Workshop

🌐 Model United Nations Participant

LEADERSHIP EXPERIENCE:
• House Captain - Led 200+ students and coordinated school competitions
• Football Team Captain & Goalkeeper - Led defensive strategy and team coordination in interschool tournaments

PROFESSIONAL INTERESTS:
Public Policy, Government Strategy, Digital Economy Regulation,
Startup Ecosystems, Business Strategy Consulting, Institutional Governance

FEATURED PROJECT:
Marketing Strategy Analysis - Digital Platform Growth Models in Travel Industry
- Companies: MakeMyTrip and OYO
- Focus: Digital Acquisition Funnels, Consumer Engagement, Platform Scaling
  `;

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resumeContent));
  element.setAttribute('download', 'abhinav_Bajpai_Resume.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.parentElement.parentElement.dataset.level + '%' || '0%';
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio of Abhinav Bajpai loaded successfully!');
  setupProfileImageUpload();
  initializeAI();
  initializeCharts();
  initializeNavigation();
  animateSkillBars();
  console.log('💡 Tip: Click on the profile image to upload your photo!');
  console.log('💬 Tip: Use the AI Assistant to learn more about the portfolio!');
});
window.addEventListener('scroll', () => {
  const scrollAmount = window.scrollY;
  if (scrollAmount > 500) {
  }
});
let isAIProcessing = false;
const originalSendMessage = window.sendMessage;
window.sendMessage = function() {
  if (!isAIProcessing) {
    isAIProcessing = true;
    originalSendMessage.call(this);
    setTimeout(() => { isAIProcessing = false; }, 500);
  }
};
