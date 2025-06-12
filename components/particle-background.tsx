"use client"

import { useEffect } from "react"

export default function ParticleBackground() {
  useEffect(() => {
    const particlesContainer = document.querySelector(".particles")
    if (!particlesContainer) return

    // Create regular particles
    const createParticles = () => {
      const particleCount = 20

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.width = particle.style.height = Math.random() * 8 + 4 + "px"
        particle.style.animationDelay = Math.random() * 20 + "s"
        particle.style.animationDuration = Math.random() * 15 + 15 + "s"
        particlesContainer.appendChild(particle)
      }
    }

    // Create financial bubbles
    const createFinancialBubbles = () => {
      const financialIcons = [
        "💰",
        "💵",
        "💴",
        "💶",
        "💷",
        "💸",
        "💳",
        "💎",
        "🪙",
        "💲",
        "🏦",
        "📈",
        "📊",
        "💹",
        "🏧",
        "💱",
        "💼",
        "🏅",
        "🎯",
        "⭐",
        "✨",
        "💫",
        "🔆",
        "💯",
      ]
      const colorClasses = ["", "gold", "green", "blue", "purple"]

      const createBubble = () => {
        const bubble = document.createElement("div")
        const icon = financialIcons[Math.floor(Math.random() * financialIcons.length)]
        const colorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)]

        bubble.className = `financial-bubble ${colorClass}`
        bubble.textContent = icon
        bubble.style.left = Math.random() * 100 + "%"
        bubble.style.fontSize = Math.random() * 16 + 18 + "px"
        bubble.style.animationDelay = Math.random() * 5 + "s"

        particlesContainer.appendChild(bubble)

        setTimeout(() => {
          if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble)
          }
        }, 16000)
      }

      // Initial bubbles
      for (let i = 0; i < 12; i++) {
        setTimeout(createBubble, i * 1500)
      }

      // Continuous bubble creation
      const scheduleBubble = () => {
        createBubble()
        const nextDelay = Math.random() * 3000 + 2000
        setTimeout(scheduleBubble, nextDelay)
      }

      setTimeout(scheduleBubble, 8000)
    }

    createParticles()
    createFinancialBubbles()
  }, [])

  return <div className="particles"></div>
}
