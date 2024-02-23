document.addEventListener("DOMContentLoaded", function() {
    let dropdownBtn = document.getElementById("dropdownBtn")
    let dropdownContent = document.getElementById("dropdownContent")

    dropdownBtn.addEventListener("click", toggleDropdown)

    dropdownContent.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
        selectItem(event.target.getAttribute("data-item"))
        }
    })

    window.addEventListener("click", function(event) {
        if (!event.target.closest('.dropdown')) {
        dropdownContent.style.display = "none"
        }
    })

    function toggleDropdown() {
        dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block"
    }

    function selectItem(itemText) {
        dropdownBtn.innerText = itemText
        toggleDropdown()
    }
})

let faq_questions = document.querySelectorAll(".faq-block")

faq_questions.forEach((item) => {
    item.addEventListener("click", function() {
        const isOpen = this.classList.contains("faq-active")

        faq_questions.forEach((faq) => {
            faq.classList.remove("faq-active")
            faq.style.height = "20px"
        })
        
        if (!isOpen) {
            this.classList.add("faq-active")
            const contentHeight = this.querySelector(".faq-content").offsetHeight
            this.style.height = `${contentHeight + 40}px`
        }

        const faq_open_close_button = this.querySelector(".faq-qst-button")
        faq_open_close_button.textContent = isOpen ? "+" : "X"

        faq_questions.forEach((faq) => {
            if (faq !== this) {
                const faq_open_close_button_other = faq.querySelector(".faq-qst-button")
                faq_open_close_button_other.textContent = "+"
            }
        })
    })
})

const brg = document.querySelector('.brg') 
const navBrg = document.querySelector('.nav-brg') 
brg.addEventListener('click', () => {
    navBrg.classList.toggle('none')
    brg.classList.toggle('change')
})

let offset = 0
let slideIndex = 1

const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector("#prev"),
    next = document.querySelector("#next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderWrapper = document.querySelector('.offer__slider-wrapper')
    slidesField = document.querySelector('.offer__slider-inner')

let width = window.getComputedStyle(sliderWrapper).width

    function deleteNotDigits(str) {
    return +str.replace(/\D/g, '')
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent =  `0${slideIndex}`
    } else {
        total.textContent = slides.length
        current.textContent =  slideIndex
    }
    if(slidesField.classList.width === 600) {
        slidesField.style.width = 600
    } else {
        slidesField.style.width = 100 * slides.length + '%'
    }
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0
        } else {
            offset += deleteNotDigits(width) 
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`
        } else {
            current.textContent =  slideIndex
        }
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`
        } else {
            current.textContent =  slideIndex
        }
        
    })
    let form = document.getElementById('myForm')

form.addEventListener('submit', function (event) {
    removeErrorStyles() 

    if (!validateForm()) {
        event.preventDefault()
    }
})

function validateForm() {
    let elements = form.elements
    let isValid = true

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].hasAttribute('type') && elements[i].value === '') {
            markFieldAsError(elements[i])
            isValid = false
        }

        if (elements[i].hasAttribute('pattern')) {
            let pattern = new RegExp(elements[i].getAttribute('pattern'))
            if (!pattern.test(elements[i].value)) {
                alert('Invalid format in ' + elements[i].getAttribute('placeholder'))
                markFieldAsError(elements[i])
                isValid = false
            }
        }
    }

    if (isValid) {
        alert('Form submitted successfully!')
    }

    return isValid
}

function markFieldAsError(field) {
    field.classList.add('error')
}

function removeErrorStyles() {
    let elements = form.elements

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('error')
    }
}
