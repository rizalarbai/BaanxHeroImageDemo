let currentCardIndex = 0;
let accumulatedScroll = 0;
const scrollTarget = 90;
let isAnimating = false;
let isTransitioning = false;
let scrollRestriction = 1;

const cards = [
  { selector: '.card-1-1-inch', targetMarginTop: '0px', initialMargin: '526px' },
  { selector: '.card-2-exodus', targetMarginTop: '-90px', initialMargin: '426px' },
  { selector: '.card-3-cl', targetMarginTop: '-90px', initialMargin: '426px' },
  { selector: '.card-4-meta-mask-orange', targetMarginTop: '-90px', initialMargin: '426px' },
  { selector: '.card-5-metamask-purple', targetMarginTop: '-90px', initialMargin: '426px' },
  { selector: '.card-6-metalcard', targetMarginTop: '-90px', initialMargin: '426px' }
];

window.addEventListener('scroll', function() {
  if (window.scrollY === 0 && !isAnimating) {
    isAnimating = true;
    
    cards.forEach(card => {
      const element = document.querySelector(card.selector);
      element.style.marginTop = card.initialMargin;
    });

    setTimeout(() => {
      currentCardIndex = 0;
      isAnimating = false;
      isTransitioning = false;
      scrollRestriction = 1;
      document.addEventListener('wheel', handleWheel, { passive: false });
    }, 500);
  }
});

function handleWheel(e) {
  if (isTransitioning) {
    e.preventDefault();
    window.scrollBy(0, e.deltaY * (1 - scrollRestriction));
    return;
  }

  if (currentCardIndex < cards.length) {
    e.preventDefault();
    
    if (!isAnimating) {
      accumulatedScroll += e.deltaY;

      if (accumulatedScroll >= scrollTarget) {
        isAnimating = true;

        const card = cards[currentCardIndex];
        const element = document.querySelector(card.selector);
        element.style.marginTop = card.targetMarginTop;

        setTimeout(() => {
          currentCardIndex++;
          isAnimating = false;
          accumulatedScroll = 0;

          if (currentCardIndex === cards.length) {
            isTransitioning = true;
            
            const transitionInterval = setInterval(() => {
              scrollRestriction -= 0.1;
              if (scrollRestriction <= 0) {
                clearInterval(transitionInterval);
                document.removeEventListener('wheel', handleWheel);
              }
            }, 100);
          }
        }, 500);
      }
    }
  }
}

document.addEventListener('wheel', handleWheel, { passive: false });