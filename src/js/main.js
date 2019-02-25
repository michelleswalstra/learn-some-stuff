(function () {
  const doc = document.documentElement

  doc.classList.remove("no-js")
  doc.classList.add("js")

  // Reveal animations
  if (document.body.classList.contains("has-animations")) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal(".hero-title, .hero-paragraph, .hero-cta", {
      duration: 600,
      distance: "20px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "top",
      interval: 150
    })

    sr.reveal(".hero-illustration", {
      duration: 600,
      distance: "40px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "bottom"
    })

    sr.reveal(".feature-extended:nth-child(odd) .feature-extended-image", {
      duration: 600,
      distance: "40px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "left",
      viewFactor: 0.5
    })

    sr.reveal(".feature-extended:nth-child(even) .feature-extended-image", {
      duration: 600,
      distance: "40px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      interval: 100,
      origin: "right",
      viewFactor: 0.5
    })

    const pricingTables = document.querySelectorAll(".pricing-table")

    pricingTables.forEach(pricingTable => {
      const pricingTableHeader = [].slice.call(pricingTable.querySelectorAll(".pricing-table-header"))
      const pricingTableList = [].slice.call(pricingTable.querySelectorAll(".pricing-table-features li"))
      const pricingTableCta = [].slice.call(pricingTable.querySelectorAll(".pricing-table-cta"))
      const elements = pricingTableHeader.concat(pricingTableList).concat(pricingTableCta)

      sr.reveal(elements, {
        duration: 600,
        distance: "20px",
        easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
        interval: 100,
        origin: "top",
        viewFactor: 0.5
      })
    })
  }

  // Accordion component
  function addAccordianEventHandlers () {
    const accordionEl = document.getElementsByClassName("accordion-title")

    if (accordionEl.length) {
      for (let i = 0; i < accordionEl.length; i++) {
        accordionEl[i].addEventListener("click", function () {
          this.parentNode.classList.toggle("is-open")
          const panel = this.nextElementSibling
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null
          } else {
            panel.style.maxHeight = `${panel.scrollHeight}px`
          }
        })
      }
    }
  }

  // Nappy Logic

  var brands = [
    "Pampers", "Huggies"
  ]
  var sizes = [
    "Newborn",
    "1",
    "5"
  ]
  var suppliers = {
    "Takealot": {
      "Pampers": [
        { name: "Newborn", price: "R100" },
        { name: "1", price: "R150" },
        { name: "5", price: "R700" }
      ],
      "Huggies": [
        { name: "Newborn", price: "R100" },
        { name: "5", price: "R700" }
      ]
    },
    "Dischem": {
      "Pampers": [
        { name: "Newborn", price: "R90" },
        { name: "1", price: "R160" }
      ],
      "Huggies": [
        { name: "Newborn", price: "R100" },
        { name: "1", price: "R700" }
      ]
    }
  }

  function addDropDownOptions (el, options) {
    options.forEach(opt => {
      var option = document.createElement("option")
      option.value = opt
      option.text = opt
      el.appendChild(option)
    })
  }

  var selectBrand = document.querySelector("#select__brand")
  var selectSize = document.querySelector("#select__size")

  addDropDownOptions(selectBrand, brands)
  addDropDownOptions(selectSize, sizes)

  var searchButton = document.querySelector("#search")
  searchButton.addEventListener("click", function () {
    var selectedBrand = selectBrand.value
    if (!selectedBrand) {
      window.alert("Please select a brand")
      return
    }
    var selectedSize = selectSize.value
    if (!selectedSize) {
      window.alert("Please select a size")
      return
    }

    var matches = Object.keys(suppliers).reduce(function (acc, cur) {
      // cur -> "Takelot"
      // acc -> []
      var brandData = suppliers[cur][selectedBrand] // { [ { newborn: 1 } ],  [ ... ] }
      if (!brandData) {
        return acc
      }
      var matchingPrice = brandData.find(o => o.name === selectedSize)
      if (!matchingPrice) {
        return acc
      }
      acc.push({
        supplier: cur,
        brand: selectedBrand,
        size: selectedSize,
        price: matchingPrice.price
      })
      return acc
    }, [])

    var template = `
						<li>
							<div class="accordion-title">
								<div class="result__content">
									<span>#{SUPPLIER}</span>
									<span>#{PRICE}</span>
								</div>
								<div class="accordion-icon"></div>
							</div>
							<div class="accordion-body">
								#{MORE_INFO}
							</div>
            </li>`
    var blobs = matches.map(match => {
      return template.replace(/#{SUPPLIER}/g, match.supplier)
        .replace(/#{PRICE}/g, match.price)
        .replace(/#{MORE_INFO}/g, "https://www.google.com?q=" + match.supplier + "%20" + selectedBrand + "%20" + selectedSize)
    })

    var allHtml = blobs.join("")
    var target = document.querySelector("#target")
    target.innerHTML = allHtml

    addAccordianEventHandlers()
  })
}())
