import { gsap } from "gsap"

export default function colorize(color, line, placeholder) {
  gsap.to(
    line,
    {
      stroke: color,
      duration: 0.75
    }
  )
  gsap.to(
    placeholder,
    {
      stroke: color,
      duration: 0.75
    }
  )
}