(function () {
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.hero-title, .hero-paragraph, .hero-cta', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'top',
      interval: 150
    })

    sr.reveal('.hero-illustration', {
      duration: 600,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom'
    })

    sr.reveal('.feature-extended:nth-child(odd) .feature-extended-image', {
      duration: 600,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'left',
      viewFactor: 0.5
    })

    sr.reveal('.feature-extended:nth-child(even) .feature-extended-image', {
      duration: 600,
      distance: '40px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      interval: 100,
      origin: 'right',
      viewFactor: 0.5
    })

    const pricingTables = document.querySelectorAll('.pricing-table')

    pricingTables.forEach(pricingTable => {
      const pricingTableHeader = [].slice.call(pricingTable.querySelectorAll('.pricing-table-header'))
      const pricingTableList = [].slice.call(pricingTable.querySelectorAll('.pricing-table-features li'))
      const pricingTableCta = [].slice.call(pricingTable.querySelectorAll('.pricing-table-cta'))
      const elements = pricingTableHeader.concat(pricingTableList).concat(pricingTableCta)

      sr.reveal(elements, {
        duration: 600,
        distance: '20px',
        easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
        interval: 100,
        origin: 'top',
        viewFactor: 0.5
      })
    })
  }

  // Accordion component
  const accordionEl = document.getElementsByClassName('accordion-title')

  if (accordionEl.length) {
    for (let i = 0; i < accordionEl.length; i++) {
      accordionEl[i].addEventListener('click', function () {
        this.parentNode.classList.toggle('is-open')
        const panel = this.nextElementSibling
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`
        }
      })
    }
  }

  // Nappy Logic

  var selectBrand = document.getElementById("select__brand");
  var optionsBrand = ["Pampers", "Huggies", "Cuddlers"];

  for(var i = 0; i < optionsBrand.length; i++) {
    var opt = optionsBrand[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectBrand.appendChild(el);
  }​
  var selectSize = document.getElementById("select__size");
  var optionsSize = ["Newborn", "1", "2", "3", "4", "4+", "5", "6"];

  for(var i = 0; i < optionsSize.length; i++) {
    var opt = optionsSize[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectSize.appendChild(el);
  }​

  // Brand Results

  function brandResults() {
    const chosenBrand = selectBrand.options[selectBrand.selectedIndex].text;
    const chosenSize = selectSize.options[selectSize.selectedIndex].text;

    if (chosenBrand == "Pampers") {
      console.log("I like Pampers");
    }
  }

}())
