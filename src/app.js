const currencyMap = {
  GHS: { symbol: '₵', rate: 1 },
  USD: { symbol: '$', rate: 0.083 },
  EUR: { symbol: '€', rate: 0.074 },
  GBP: { symbol: '£', rate: 0.062 },
  NGN: { symbol: '₦', rate: 33.5 }
};

const programs = [
  {
    title: 'Virtual Administrative Assistant',
    type: 'Operations',
    status: 'Available',
    description: 'Learn inbox management, scheduling, client communication, and running efficient remote admin systems.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Operations Excellence'
  },
  {
    title: 'AI Automation, Prompt Writing & Website Building',
    type: 'AI & Web',
    status: 'Available',
    description: 'Build practical AI workflows, write better prompts, and launch simple websites without heavy coding.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Career Growth'
  },
  {
    title: 'Customer Service',
    type: 'Client Support',
    status: 'Available',
    description: 'Master communication, problem-solving, ticket handling, and service standards that support business trust.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Client Ready'
  },
  {
    title: 'Graphic Design',
    type: 'Design',
    status: 'Not Available',
    description: 'Develop branding, social graphics, layouts, typography, and image composition for digital campaigns.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Creative Studio'
  },
  {
    title: 'UX/UI Design',
    type: 'Product Design',
    status: 'Available',
    description: 'Design user-centered interfaces, flows, wireframes, and product experiences that convert attention into action.',
    image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Human-Centered'
  },
  {
    title: 'Social Media Management',
    type: 'Marketing',
    status: 'Available',
    description: 'Plan content calendars, write strategy, measure engagement, and grow audience trust across platforms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Growth Strategy'
  },
  {
    title: 'SEO & Content Writing',
    type: 'Content',
    status: 'Not Available',
    description: 'Learn keyword strategy, search intent, audience targeting, and writing that builds visibility and trust.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Search Impact'
  },
  {
    title: 'Content Creation & Copywriting',
    type: 'Content',
    status: 'Available',
    description: 'Write persuasive copy, craft engaging hooks, and turn marketing messages into clear conversion-focused content.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Storytelling'
  },
  {
    title: 'Video Editing',
    type: 'Media',
    status: 'Available',
    description: 'Edit short-form video, smooth transitions, manage pacing, audio, captions, and export-ready content.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
    basePrice: 50,
    accent: 'Short-form Wins'
  }
];

const formatPrice = (value, currency) => {
  const { symbol, rate } = currencyMap[currency] || currencyMap.GHS;
  const converted = Number(value) * rate;
  return `${symbol}${converted.toFixed(converted >= 100 ? 0 : 2)}`;
};

const initializeCurrencySwitcher = () => {
  const storageCurrency = localStorage.getItem('bravelynCurrency') || 'GHS';
  const switchers = document.querySelectorAll('.currency-switcher');

  switchers.forEach((select) => {
    select.value = storageCurrency;
    select.addEventListener('change', (event) => {
      const nextCurrency = event.target.value;
      localStorage.setItem('bravelynCurrency', nextCurrency);

      document.querySelectorAll('.course-price').forEach((node) => {
        const basePrice = Number(node.dataset.basePrice || 50);
        node.textContent = formatPrice(basePrice, nextCurrency);
      });
    });
  });

  document.querySelectorAll('.course-price').forEach((node) => {
    const basePrice = Number(node.dataset.basePrice || 50);
    node.textContent = formatPrice(basePrice, storageCurrency);
  });
};

const renderFeaturedPrograms = () => {
  const grid = document.querySelector('[data-featured-grid]');
  if (!grid) return;

  grid.innerHTML = programs.slice(0, 3)
    .map((program) => `
      <article class="course-card">
        <div class="course-image" style="background-image: url('${program.image}')">
          <span class="course-badge ${program.status === 'Available' ? 'available' : 'upcoming'}">${program.status}</span>
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span>${program.type}</span>
            <span>${program.accent}</span>
          </div>
          <h3>${program.title}</h3>
          <p>${program.description}</p>
          <div class="price-row">
            <div class="price-tag">
              <small>From</small>
              <strong class="course-price" data-base-price="${program.basePrice}">₵50</strong>
            </div>
            <a class="link-btn" href="/courses.html">View course</a>
          </div>
        </div>
      </article>
    `)
    .join('');
};

const renderCourseCatalog = () => {
  const grid = document.querySelector('[data-course-grid]');
  if (!grid) return;

  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const filtered = activeFilter === 'all'
    ? programs
    : programs.filter((program) => program.status.toLowerCase() === activeFilter);

  grid.innerHTML = filtered
    .map((program) => `
      <article class="course-card">
        <div class="course-image" style="background-image: url('${program.image}')">
          <span class="course-badge ${program.status === 'Available' ? 'available' : 'upcoming'}">${program.status}</span>
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span>${program.type}</span>
            <span>${program.accent}</span>
          </div>
          <h3>${program.title}</h3>
          <p>${program.description}</p>
          <div class="price-row">
            <div class="price-tag">
              <small>From</small>
              <strong class="course-price" data-base-price="${program.basePrice}">₵50</strong>
            </div>
            <a class="link-btn" href="/contact.html">Enroll now</a>
          </div>
        </div>
      </article>
    `)
    .join('');
};

const initializeCourseFilters = () => {
  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((element) => element.classList.remove('active'));
      button.classList.add('active');
      renderCourseCatalog();
      initializeCurrencySwitcher();
    });
  });
};

const initializeForms = () => {
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const alertBox = document.querySelector('#contact-alert');
      alertBox.className = 'alert success';
      alertBox.textContent = 'Thanks for reaching out. Our admissions team will contact you soon.';
      contactForm.reset();
    });
  }

  const signinForm = document.querySelector('#signin-form');
  if (signinForm) {
    signinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const alertBox = document.querySelector('#signin-alert');
      alertBox.className = 'alert success';
      alertBox.textContent = 'Signed in successfully. Redirecting to your dashboard...';
      setTimeout(() => {
        alertBox.textContent = 'Demo mode: You are now signed in.';
      }, 800);
    });
  }

  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const alertBox = document.querySelector('#signup-alert');
      alertBox.className = 'alert success';
      alertBox.textContent = 'Your account is ready. Welcome to Bravelyn Digital Academy.';
      signupForm.reset();
    });
  }
};

const initializeAssistant = () => {
  const form = document.querySelector('#assistant-form');
  if (!form) return;

  const messages = document.querySelector('#assistant-messages');
  const input = document.querySelector('#assistant-input');
  const buttons = document.querySelectorAll('.quick-prompt');

  const responses = {
    course: 'Our flagship programs include Virtual Administrative Assistant, AI Automation & Website Building, Customer Service, Graphic Design, UX/UI Design, Social Media Management, SEO & Content Writing, Content Creation & Copywriting, and Video Editing.',
    career: 'If you want a practical route into digital work, start with Virtual Administrative Assistant or AI Automation if you love productivity and tech tools. If you want a creative route, try Graphic Design or Video Editing.',
    pricing: 'All programs are priced from GHS 50. Use the currency switcher in the header to see equivalent pricing in USD, EUR, GBP, or NGN.',
    support: 'You can reach the academy via the Contact page or email wisdomtorkukwame@gmail.com for course guidance and admissions support.',
    default: 'Bravelyn Digital Academy helps learners build practical digital skills through guided projects and portfolio-ready work. Ask me about courses, career fit, pricing, or admissions.'
  };

  const getResponse = (question) => {
    const value = question.toLowerCase();
    if (value.includes('course') || value.includes('program') || value.includes('learn')) return responses.course;
    if (value.includes('career') || value.includes('job') || value.includes('best')) return responses.career;
    if (value.includes('price') || value.includes('cost') || value.includes('currency')) return responses.pricing;
    if (value.includes('contact') || value.includes('support') || value.includes('email')) return responses.support;
    return responses.default;
  };

  const addMessage = (content, type = 'bot') => {
    const item = document.createElement('div');
    item.className = `message ${type}`;
    item.textContent = content;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.prompt;
      form.requestSubmit();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    input.value = '';
    setTimeout(() => addMessage(getResponse(question), 'bot'), 250);
  });
};

const initializeNavigation = () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
};

const initializeYear = () => {
  const yearNode = document.querySelector('[data-year]');
  if (yearNode) yearNode.textContent = new Date().getFullYear();
};

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedPrograms();
  renderCourseCatalog();
  initializeCurrencySwitcher();
  initializeCourseFilters();
  initializeForms();
  initializeAssistant();
  initializeNavigation();
  initializeYear();
});
