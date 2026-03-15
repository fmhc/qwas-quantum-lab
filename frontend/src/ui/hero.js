export function createHero() {
  // Hero is already in HTML, this handles any dynamic functionality
  const heroSection = document.getElementById('hero');

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroContent = heroSection.querySelector('.hero-content');

    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
    }
  });

  // Typing effect for subtitle (optional enhancement)
  const subtitle = heroSection.querySelector('.hero-subtitle');
  if (subtitle) {
    subtitle.setAttribute('data-text', subtitle.textContent);
  }
}
