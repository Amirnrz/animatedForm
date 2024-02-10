import './sass/style.scss'
import { gsap } from 'gsap'
import colorize from './helpers/colorize'
import {
  validateEmail,
  validatePhone
} from './helpers/validate.js'

const containers = document.querySelectorAll(".input-container")
const form = document.querySelector('form')

const tl = gsap.timeline({
  defaults:{
    duration:1
  }
})

const start = 
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"
const end = 
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512"

// elastic effect
containers.forEach(container => {
  const input = container.querySelector('.input')
  const line = container.querySelector('.elastic-line')
  const placeholder = container.querySelector('.placeholder')

  input.addEventListener('focus', () => {
    if (!input.value) {
      tl.fromTo(line, { attr: { d: start } }, { attr: { d: end }, ease: "power2.easeOut", duration: 0.75 })

      tl.to(line, { attr: { d: start }, ease:'elastic.out(3, 0.75)' }, '<50%')

      tl.to(placeholder, { top: -15, left: 0, scale: 0.7, duration: 0.5, ease:'power2.inOut' }, '<15%')
    }

  })
})

form.addEventListener('click', () => {
  containers.forEach(container => {
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');
    const placeholder = container.querySelector('.placeholder');

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, { top: 0, left: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' })
      }
    }

    input.addEventListener('input', (e) => {
      if (e.target.type === 'text') {
        let inputText = e.target.value;

        inputText.length > 2
          ? colorize('#6391E8', line, placeholder)
          : colorize("#FE8C99", line, placeholder);
      }

      if (e.target.type === 'email') {
        let valid = validateEmail(e.target.value);

        valid
          ? colorize('#6391E8', line, placeholder)
          : colorize("#FE8C99", line, placeholder);
      }

      if (e.target.type === 'tel') {
        let valid = validatePhone(e.target.value);

        valid
        ? colorize('#6391E8', line, placeholder)
        : colorize("#FE8C99", line, placeholder);
      }
    })

  })
})

// checkbox animation
const checkbox = document.querySelector('.checkbox');
const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

const tl2 = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: 'power2.out'
  }
})

gsap.set(tickMarkPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength })

checkbox.addEventListener('click', () => {
  if (checkbox.checked) {
    tl2.to('.checkbox-fill', { top: '0%' })
    tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 })
    tl2.to('.checkbox-label', { color: '#6391e8' }, '<')
  } else {
    tl2.to('.checkbox-fill', { top: '100%' });
    tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, '<50%');
    tl2.to('.checkbox-label', { color: '#c5c5c5' }, '<')
  }
})

// character animation
gsap.to("#eye", { transformOrigin: 'center' });
gsap.fromTo('#eye', { scaleY: 1 }, { scaleY: 0.3, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: "power2.inOut" });

gsap.fromTo('#eyebrow', { y: 0 }, { y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: 'power1.out'})

// submit animation
const button = document.querySelector('button')
const tl3 = gsap.timeline({
  defaults: {
    duration: 0.75,
    ease: 'power2.out'
  }
})


button.addEventListener('click', (e) => {
  e.preventDefault();

  tl3.to('.contact-right, .contact-left', { y: 30, opacity: 0, pointerEvents: 'none' })

  tl3.to('form', { scale: 0.8 }, '<')

  tl3.fromTo('.submitted', { opacity: 0, y: 30 }, { opacity: 1, y: 0 })

  gsap.set('#hand', { transformOrigin: 'left' })
  gsap.fromTo('#hand', { rotation: 0, y: 0 }, { rotation: -10, y: 2, ease: 'elastic(3, 0.3)', duration: 2, delay: 1 })
})