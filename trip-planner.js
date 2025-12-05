// Data Manager
class TripDataManager {
  constructor() {
    this.hotels = JSON.parse(localStorage.getItem("hotels")) || []
    this.spending = JSON.parse(localStorage.getItem("spending")) || []
    this.itinerary = JSON.parse(localStorage.getItem("itinerary")) || []
    this.checklist = JSON.parse(localStorage.getItem("checklist")) || []
    this.gallery = JSON.parse(localStorage.getItem("gallery")) || []
  }

  save() {
    localStorage.setItem("hotels", JSON.stringify(this.hotels))
    localStorage.setItem("spending", JSON.stringify(this.spending))
    localStorage.setItem("itinerary", JSON.stringify(this.itinerary))
    localStorage.setItem("checklist", JSON.stringify(this.checklist))
    localStorage.setItem("gallery", JSON.stringify(this.gallery))
  }

  addHotel(hotel) {
    hotel.id = Date.now()
    this.hotels.push(hotel)
    this.save()
    return hotel
  }

  deleteHotel(id) {
    this.hotels = this.hotels.filter((h) => h.id !== id)
    this.save()
  }

  updateHotel(id, hotel) {
    const index = this.hotels.findIndex((h) => h.id === id)
    if (index !== -1) {
      this.hotels[index] = { ...this.hotels[index], ...hotel }
      this.save()
    }
  }

  addSpending(expense) {
    expense.id = Date.now()
    this.spending.push(expense)
    this.save()
    return expense
  }

  deleteSpending(id) {
    this.spending = this.spending.filter((e) => e.id !== id)
    this.save()
  }

  updateSpending(id, expense) {
    const index = this.spending.findIndex((e) => e.id === id)
    if (index !== -1) {
      this.spending[index] = { ...this.spending[index], ...expense }
      this.save()
    }
  }

  getTotalSpending() {
    return this.spending.reduce((sum, e) => sum + Number.parseFloat(e.amount || 0), 0)
  }

  addItinerary(plan) {
    plan.id = Date.now()
    this.itinerary.push(plan)
    this.save()
    return plan
  }

  deleteItinerary(id) {
    this.itinerary = this.itinerary.filter((p) => p.id !== id)
    this.save()
  }

  updateItinerary(id, plan) {
    const index = this.itinerary.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.itinerary[index] = { ...this.itinerary[index], ...plan }
      this.save()
    }
  }

  addChecklistItem(item) {
    item.id = Date.now()
    item.completed = false
    this.checklist.push(item)
    this.save()
    return item
  }

  deleteChecklistItem(id) {
    this.checklist = this.checklist.filter((item) => item.id !== id)
    this.save()
  }

  updateChecklistItem(id, updates) {
    const index = this.checklist.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.checklist[index] = { ...this.checklist[index], ...updates }
      this.save()
    }
  }

  toggleChecklistItem(id) {
    const index = this.checklist.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.checklist[index].completed = !this.checklist[index].completed
      this.save()
    }
  }

  getChecklistStats() {
    const total = this.checklist.length
    const completed = this.checklist.filter(item => item.completed).length
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0
    return { total, completed, progress }
  }

  addGalleryPhoto(photo) {
    photo.id = Date.now()
    this.gallery.push(photo)
    this.save()
    return photo
  }

  deleteGalleryPhoto(id) {
    this.gallery = this.gallery.filter((photo) => photo.id !== id)
    this.save()
  }

  getGalleryStats() {
    const stats = {
      total: this.gallery.length,
      scenery: this.gallery.filter(p => p.category === 'scenery').length,
      food: this.gallery.filter(p => p.category === 'food').length,
      activities: this.gallery.filter(p => p.category === 'activities').length,
      people: this.gallery.filter(p => p.category === 'people').length,
      accommodation: this.gallery.filter(p => p.category === 'accommodation').length,
      transport: this.gallery.filter(p => p.category === 'transport').length
    }
    return stats
  }
}

// Initialize data manager
const dataManager = new TripDataManager()

// Weather Widget
function refreshWeather() {
  // Simulated weather data (in a real app, you'd use a weather API)
  const weatherData = {
    temp: Math.floor(Math.random() * 15) + 5, // 5-20°C
    feelsLike: Math.floor(Math.random() * 15) + 3,
    description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Snow'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h
  }

  document.getElementById('weatherTemp').textContent = `${weatherData.temp}°C`
  document.getElementById('feelsLike').textContent = `${weatherData.feelsLike}°C`
  document.getElementById('weatherDesc').textContent = weatherData.description
  document.getElementById('humidity').textContent = `${weatherData.humidity}%`
  document.getElementById('windSpeed').textContent = `${weatherData.windSpeed} km/h`

  // Add refresh animation
  const refreshBtn = document.querySelector('.weather-refresh')
  refreshBtn.style.transform = 'rotate(360deg)'
  setTimeout(() => {
    refreshBtn.style.transform = 'rotate(0deg)'
  }, 500)
}

// Initialize weather on page load
refreshWeather()

// Trip Countdown Timer
function updateCountdown() {
  const tripDate = new Date('2025-12-21T12:50:00').getTime()
  const now = new Date().getTime()
  const distance = tripDate - now
  
  const countdownContainer = document.querySelector('.trip-countdown')
  
  console.log('Countdown debug - Distance:', distance, 'Trip date:', new Date(tripDate).toLocaleString(), 'Now:', new Date(now).toLocaleString())
  
  if (distance < 0) {
    // Hide countdown when trip starts
    if (countdownContainer) {
      countdownContainer.style.display = 'none'
      console.log('Countdown completed - hiding')
    }
    return
  } else {
    // Show countdown if trip hasn't started yet
    if (countdownContainer) {
      countdownContainer.style.display = 'flex'
      console.log('Countdown active - showing')
    }
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  document.getElementById('days').textContent = days.toString().padStart(2, '0')
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0')
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0')
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0')
  
  console.log(`Countdown values: ${days}d ${hours}h ${minutes}m ${seconds}s`)
}

// Update countdown every second
document.addEventListener('DOMContentLoaded', function() {
  setInterval(updateCountdown, 1000)
  updateCountdown()
})

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle')
const themeIcon = themeToggle.querySelector('.theme-icon')

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light'
document.documentElement.setAttribute('data-theme', currentTheme)
updateThemeIcon(currentTheme)

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙'
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  updateThemeIcon(newTheme)
  
  // Add rotation animation
  themeToggle.style.transform = 'rotate(360deg)'
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)'
  }, 300)
})

// Tab switching
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-pane").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(tabName).classList.add("active")

  // Add active class to clicked button
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

  // Render data when tab opens
  if (tabName === "hotels") renderHotels()
  if (tabName === "spending") renderSpending()
  if (tabName === "itinerary") renderItinerary()
  if (tabName === "checklist") renderChecklist()
  if (tabName === "gallery") renderGallery()
}

// Hotel Management
document.getElementById("hotelForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const hotel = {
    name: document.getElementById("hotelName").value,
    price: Number.parseFloat(document.getElementById("hotelPrice").value),
    checkIn: document.getElementById("checkIn").value,
    checkOut: document.getElementById("checkOut").value,
    link: document.getElementById("hotelLink").value,
  }

  dataManager.addHotel(hotel)
  document.getElementById("hotelForm").reset()
  renderHotels()
})

function renderHotels() {
  const list = document.getElementById("hotelsList")
  list.innerHTML = ""

  dataManager.hotels.forEach((hotel) => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
            <h4>${hotel.name}</h4>
            <p><strong>Price:</strong> $${hotel.price.toFixed(2)}</p>
            <p><strong>Check-in:</strong> ${hotel.checkIn}</p>
            <p><strong>Check-out:</strong> ${hotel.checkOut}</p>
            ${hotel.link ? `<p><a href="${hotel.link}" target="_blank" style="color: var(--primary);">🔗 Hotel Link</a></p>` : ""}
            <div class="card-actions">
                <button class="btn btn-secondary btn-small" onclick="editHotel(${hotel.id})">✏️ Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteHotelItem(${hotel.id})">🗑️ Delete</button>
            </div>
        `
    list.appendChild(card)
  })
}

function deleteHotelItem(id) {
  if (confirm("Are you sure you want to delete this hotel?")) {
    dataManager.deleteHotel(id)
    renderHotels()
  }
}

function editHotel(id) {
  const hotel = dataManager.hotels.find((h) => h.id === id)
  if (!hotel) return

  const modal = document.getElementById("editModal")
  const form = document.getElementById("editForm")

  form.innerHTML = `
        <div class="form-group">
            <label for="editHotelName">Hotel Name</label>
            <input type="text" id="editHotelName" value="${hotel.name}" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editHotelPrice">Price</label>
                <input type="number" id="editHotelPrice" value="${hotel.price}" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="editCheckIn">Check-in</label>
                <input type="time" id="editCheckIn" value="${hotel.checkIn}" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editCheckOut">Check-out</label>
                <input type="time" id="editCheckOut" value="${hotel.checkOut}" required>
            </div>
            <div class="form-group">
                <label for="editHotelLink">Hotel Link</label>
                <input type="url" id="editHotelLink" value="${hotel.link || ""}">
            </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button type="button" class="btn btn-primary" onclick="saveHotelEdit(${id})">Save</button>
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        </div>
    `

  modal.classList.remove("hidden")
}

function saveHotelEdit(id) {
  const hotel = {
    name: document.getElementById("editHotelName").value,
    price: Number.parseFloat(document.getElementById("editHotelPrice").value),
    checkIn: document.getElementById("editCheckIn").value,
    checkOut: document.getElementById("editCheckOut").value,
    link: document.getElementById("editHotelLink").value,
  }

  dataManager.updateHotel(id, hotel)
  closeModal()
  renderHotels()
}

// Spending Management
document.getElementById("spendingForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const expense = {
    day: document.getElementById("spendDay").value,
    amount: Number.parseFloat(document.getElementById("spendAmount").value),
    person: document.getElementById("spendPerson").value,
    notes: document.getElementById("spendNotes").value,
    timestamp: new Date().toLocaleString(),
    dateAdded: new Date().toISOString()
  }

  dataManager.addSpending(expense)
  document.getElementById("spendingForm").reset()
  renderSpending()
})

function renderSpending() {
  const list = document.getElementById("spendingList")
  list.innerHTML = ""

  const total = dataManager.spending.reduce((sum, item) => sum + parseFloat(item.amount), 0)
  document.getElementById("totalAmount").textContent = `₹${total.toFixed(2)}`

  dataManager.spending.forEach((item) => {
    const itemElement = document.createElement("div")
    itemElement.className = "card"
    itemElement.innerHTML = `
      <div class="card-header">
        <h3>${item.day}</h3>
        <span class="amount">₹${parseFloat(item.amount).toFixed(2)}</span>
      </div>
      <div class="expense-details">
        <p><strong>Person:</strong> ${item.person}</p>
        ${item.notes ? `<p><strong>Notes:</strong> ${item.notes}</p>` : ""}
        <p><strong>Added:</strong> ${item.timestamp}</p>
      </div>
      <div class="card-actions">
        <button class="btn btn-secondary btn-small" onclick="editSpending(${item.id})">✏️ Edit</button>
        <button class="btn btn-danger btn-small" onclick="deleteSpendingItem(${item.id})">🗑️ Delete</button>
      </div>
    `
    list.appendChild(itemElement)
  })

  // Update analytics
  updateSpendingAnalytics()
}

function updateSpendingAnalytics() {
  if (dataManager.spending.length === 0) return

  // Calculate stats
  const amounts = dataManager.spending.map(item => parseFloat(item.amount))
  const avgDaily = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
  const highestDay = Math.max(...amounts)
  const lowestDay = Math.min(...amounts)

  document.getElementById("avgDaily").textContent = `₹${avgDaily.toFixed(2)}`
  document.getElementById("highestDay").textContent = `₹${highestDay.toFixed(2)}`
  document.getElementById("lowestDay").textContent = `₹${lowestDay.toFixed(2)}`

  // Draw category chart (by person)
  drawPersonChart()
  
  // Draw daily trend chart
  drawDailyChart()
  
  // Draw person-wise spending chart
  drawPersonSpendingChart()
}

function drawPersonChart() {
  const canvas = document.getElementById("categoryChart")
  const ctx = canvas.getContext("2d")
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // Group spending by person
  const persons = {}
  dataManager.spending.forEach(item => {
    const person = item.person || "Unknown"
    if (!persons[person]) {
      persons[person] = 0
    }
    persons[person] += parseFloat(item.amount)
  })
  
  const personData = Object.entries(persons)
  if (personData.length === 0) return
  
  const total = personData.reduce((sum, [, amount]) => sum + amount, 0)
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"]
  
  // Draw pie chart
  let currentAngle = -Math.PI / 2
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(centerX, centerY) - 20
  
  personData.forEach(([person, amount], index) => {
    const sliceAngle = (amount / total) * 2 * Math.PI
    
    // Draw slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.closePath()
    ctx.fillStyle = colors[index % colors.length]
    ctx.fill()
    
    // Draw label
    const labelAngle = currentAngle + sliceAngle / 2
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)
    
    ctx.fillStyle = "white"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${person}`, labelX, labelY - 8)
    ctx.fillText(`₹${amount.toFixed(0)}`, labelX, labelY + 8)
    
    currentAngle += sliceAngle
  })
}

function drawPersonSpendingChart() {
  // Create a new canvas for person-wise daily spending if it doesn't exist
  let personCanvas = document.getElementById("personChart")
  if (!personCanvas) {
    // Add new canvas to analytics section
    const analyticsGrid = document.querySelector(".analytics-grid")
    const newCard = document.createElement("div")
    newCard.className = "analytics-card"
    newCard.innerHTML = `
      <h4>👥 Person-wise Daily Spending</h4>
      <canvas id="personChart" width="300" height="200"></canvas>
    `
    analyticsGrid.appendChild(newCard)
    personCanvas = document.getElementById("personChart")
  }
  
  const ctx = personCanvas.getContext("2d")
  ctx.clearRect(0, 0, personCanvas.width, personCanvas.height)
  
  if (dataManager.spending.length === 0) return
  
  // Get unique persons and days
  const persons = [...new Set(dataManager.spending.map(item => item.person))]
  const days = [...new Set(dataManager.spending.map(item => item.day.split(' - ')[0]))]
  
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"]
  
  // Chart dimensions
  const padding = 30
  const chartWidth = personCanvas.width - 2 * padding
  const chartHeight = personCanvas.height - 2 * padding
  
  // Draw axes
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, personCanvas.height - padding)
  ctx.lineTo(personCanvas.width - padding, personCanvas.height - padding)
  ctx.stroke()
  
  // Calculate max amount for scaling
  const maxAmount = Math.max(...dataManager.spending.map(item => parseFloat(item.amount)))
  
  // Group data by day and person
  const dayPersonData = {}
  dataManager.spending.forEach(item => {
    const day = item.day.split(' - ')[0]
    if (!dayPersonData[day]) dayPersonData[day] = {}
    if (!dayPersonData[day][item.person]) dayPersonData[day][item.person] = 0
    dayPersonData[day][item.person] += parseFloat(item.amount)
  })
  
  // Draw grouped bar chart
  const barWidth = chartWidth / (days.length * persons.length + days.length - 1) * 0.8
  const groupSpacing = barWidth * 0.2
  
  days.forEach((day, dayIndex) => {
    persons.forEach((person, personIndex) => {
      const amount = dayPersonData[day]?.[person] || 0
      const barHeight = (amount / maxAmount) * chartHeight * 0.8
      const x = padding + dayIndex * (persons.length * barWidth + groupSpacing) + personIndex * barWidth
      const y = personCanvas.height - padding - barHeight
      
      // Draw bar
      ctx.fillStyle = colors[persons.indexOf(person) % colors.length]
      ctx.fillRect(x, y, barWidth, barHeight)
      
      // Draw value label
      if (amount > 0) {
        ctx.fillStyle = "#374151"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`₹${amount.toFixed(0)}`, x + barWidth / 2, y - 5)
      }
    })
    
    // Draw day label
    ctx.fillStyle = "#374151"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.fillText(day, padding + dayIndex * (persons.length * barWidth + groupSpacing) + (persons.length * barWidth) / 2, personCanvas.height - padding + 15)
  })
  
  // Draw legend
  persons.forEach((person, index) => {
    const legendX = padding + index * 60
    const legendY = 15
    
    ctx.fillStyle = colors[index % colors.length]
    ctx.fillRect(legendX, legendY, 12, 12)
    
    ctx.fillStyle = "#374151"
    ctx.font = "10px Arial"
    ctx.textAlign = "left"
    ctx.fillText(person, legendX + 16, legendY + 9)
  })
}

function drawDailyChart() {
  const canvas = document.getElementById("dailyChart")
  const ctx = canvas.getContext("2d")
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (dataManager.spending.length === 0) return
  
  // Group spending by day (extract day number from day string)
  const dailyTotals = {}
  dataManager.spending.forEach(item => {
    const dayMatch = item.day.match(/Day (\d+)/)
    const dayNumber = dayMatch ? dayMatch[1] : 'Unknown'
    if (!dailyTotals[dayNumber]) {
      dailyTotals[dayNumber] = 0
    }
    dailyTotals[dayNumber] += parseFloat(item.amount)
  })
  
  const dailyData = Object.entries(dailyTotals).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  if (dailyData.length === 0) return
  
  const maxAmount = Math.max(...dailyData.map(d => d[1]))
  
  // Chart dimensions
  const padding = 20
  const chartWidth = canvas.width - 2 * padding
  const chartHeight = canvas.height - 2 * padding
  
  // Draw axes
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, canvas.height - padding)
  ctx.lineTo(canvas.width - padding, canvas.height - padding)
  ctx.stroke()
  
  // Draw bars
  const barWidth = chartWidth / dailyData.length * 0.8
  const barSpacing = chartWidth / dailyData.length * 0.2
  
  dailyData.forEach((data, index) => {
    const [day, amount] = data
    const barHeight = (amount / maxAmount) * chartHeight * 0.8
    const x = padding + index * (barWidth + barSpacing) + barSpacing / 2
    const y = canvas.height - padding - barHeight
    
    // Draw bar
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(x, y, barWidth, barHeight)
    
    // Draw value label
    ctx.fillStyle = "#374151"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`₹${amount.toFixed(0)}`, x + barWidth / 2, y - 5)
    
    // Draw day label
    ctx.fillText(`Day ${day}`, x + barWidth / 2, canvas.height - padding + 15)
  })
}

function deleteSpendingItem(id) {
  if (confirm("Are you sure you want to delete this expense?")) {
    dataManager.deleteSpending(id)
    renderSpending()
  }
}

function editSpending(id) {
  const expense = dataManager.spending.find((e) => e.id === id)
  if (!expense) return

  const modal = document.getElementById("editModal")
  const form = document.getElementById("editForm")

  form.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="editSpendDay">Day</label>
                <select id="editSpendDay" required>
                    <option value="Day 1 - Sunday (21 Dec)" ${expense.day === 'Day 1 - Sunday (21 Dec)' ? 'selected' : ''}>Day 1 - Sunday (21 Dec)</option>
                    <option value="Day 2 - Monday (22 Dec)" ${expense.day === 'Day 2 - Monday (22 Dec)' ? 'selected' : ''}>Day 2 - Monday (22 Dec)</option>
                    <option value="Day 3 - Tuesday (23 Dec)" ${expense.day === 'Day 3 - Tuesday (23 Dec)' ? 'selected' : ''}>Day 3 - Tuesday (23 Dec)</option>
                    <option value="Day 4 - Wednesday (24 Dec)" ${expense.day === 'Day 4 - Wednesday (24 Dec)' ? 'selected' : ''}>Day 4 - Wednesday (24 Dec)</option>
                    <option value="Day 5 - Thursday (25 Dec)" ${expense.day === 'Day 5 - Thursday (25 Dec)' ? 'selected' : ''}>Day 5 - Thursday (25 Dec)</option>
                    <option value="Day 6 - Friday (26 Dec)" ${expense.day === 'Day 6 - Friday (26 Dec)' ? 'selected' : ''}>Day 6 - Friday (26 Dec)</option>
                    <option value="Day 7 - Saturday (27 Dec)" ${expense.day === 'Day 7 - Saturday (27 Dec)' ? 'selected' : ''}>Day 7 - Saturday (27 Dec)</option>
                    <option value="Day 8 - Sunday (28 Dec)" ${expense.day === 'Day 8 - Sunday (28 Dec)' ? 'selected' : ''}>Day 8 - Sunday (28 Dec)</option>
                    <option value="Day 9 - Monday (29 Dec)" ${expense.day === 'Day 9 - Monday (29 Dec)' ? 'selected' : ''}>Day 9 - Monday (29 Dec)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="editSpendAmount">Amount (₹)</label>
                <input type="number" id="editSpendAmount" value="${expense.amount}" step="0.01" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="editSpendPerson">Person</label>
                <select id="editSpendPerson" required>
                    <option value="Sahil" ${expense.person === 'Sahil' ? 'selected' : ''}>Sahil</option>
                    <option value="Akhil" ${expense.person === 'Akhil' ? 'selected' : ''}>Akhil</option>
                    <option value="Abhinav" ${expense.person === 'Abhinav' ? 'selected' : ''}>Abhinav</option>
                    <option value="Ansh" ${expense.person === 'Ansh' ? 'selected' : ''}>Ansh</option>
                    <option value="Ankith" ${expense.person === 'Ankith' ? 'selected' : ''}>Ankith</option>
                    <option value="Jitender" ${expense.person === 'Jitender' ? 'selected' : ''}>Jitender</option>
                </select>
            </div>
            <div class="form-group">
                <label for="editSpendNotes">Notes</label>
                <input type="text" id="editSpendNotes" value="${expense.notes || ""}">
            </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button type="button" class="btn btn-primary" onclick="saveSpendingEdit(${id})">Save</button>
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        </div>
    `

  modal.classList.remove("hidden")
}

function saveSpendingEdit(id) {
  const expense = {
    day: document.getElementById("editSpendDay").value,
    amount: Number.parseFloat(document.getElementById("editSpendAmount").value),
    person: document.getElementById("editSpendPerson").value,
    notes: document.getElementById("editSpendNotes").value,
    timestamp: new Date().toLocaleString()
  }

  dataManager.updateSpending(id, expense)
  closeModal()
  renderSpending()
}

// Itinerary Management
document.getElementById("itineraryForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const plan = {
    day: document.getElementById("planDay").value,
    place: document.getElementById("planPlace").value,
    description: document.getElementById("planDescription").value,
    timing: document.getElementById("planTiming").value,
  }

  dataManager.addItinerary(plan)
  document.getElementById("itineraryForm").reset()
  renderItinerary()
})

function renderItinerary() {
  const list = document.getElementById("itineraryList")
  list.innerHTML = ""

  dataManager.itinerary.forEach((plan) => {
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
            <h4>${plan.day}</h4>
            <p><strong>📍 Place:</strong> ${plan.place}</p>
            ${plan.description ? `<p><strong>📝 Description:</strong> ${plan.description}</p>` : ""}
            ${plan.timing ? `<p><strong>🕐 Timing:</strong> ${plan.timing}</p>` : ""}
            <div class="card-actions">
                <button class="btn btn-secondary btn-small" onclick="editItinerary(${plan.id})">✏️ Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteItineraryItem(${plan.id})">🗑️ Delete</button>
            </div>
        `
    list.appendChild(card)
  })
}

function deleteItineraryItem(id) {
  if (confirm("Are you sure you want to delete this plan?")) {
    dataManager.deleteItinerary(id)
    renderItinerary()
  }
}

function editItinerary(id) {
  const plan = dataManager.itinerary.find((p) => p.id === id)
  if (!plan) return

  const modal = document.getElementById("editModal")
  const form = document.getElementById("editForm")

  form.innerHTML = `
        <div class="form-group">
            <label for="editPlanDay">Day / Date</label>
            <input type="text" id="editPlanDay" value="${plan.day}" required>
        </div>
        <div class="form-group">
            <label for="editPlanPlace">Place to Visit</label>
            <input type="text" id="editPlanPlace" value="${plan.place}" required>
        </div>
        <div class="form-group">
            <label for="editPlanDescription">Description / Notes</label>
            <textarea id="editPlanDescription" rows="3">${plan.description || ""}</textarea>
        </div>
        <div class="form-group">
            <label for="editPlanTiming">Timing</label>
            <input type="text" id="editPlanTiming" value="${plan.timing || ""}">
        </div>
        <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button type="button" class="btn btn-primary" onclick="saveItineraryEdit(${id})">Save</button>
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        </div>
    `

  modal.classList.remove("hidden")
}

function saveItineraryEdit(id) {
  const plan = {
    day: document.getElementById("editPlanDay").value,
    place: document.getElementById("editPlanPlace").value,
    description: document.getElementById("editPlanDescription").value,
    timing: document.getElementById("editPlanTiming").value,
  }

  dataManager.updateItinerary(id, plan)
  closeModal()
  renderItinerary()
}

// Modal handling
function closeModal() {
  document.getElementById("editModal").classList.add("hidden")
}

document.querySelector(".modal-close").addEventListener("click", closeModal)
window.addEventListener("click", (e) => {
  const modal = document.getElementById("editModal")
  if (e.target === modal) {
    modal.classList.add("hidden")
  }
})

// Initialize tab switching
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switchTab(e.target.dataset.tab)
  })
})

// Checklist Management
document.getElementById("checklistForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const item = {
    text: document.getElementById("checklistItem").value,
    category: document.getElementById("checklistCategory").value,
    priority: document.getElementById("checklistPriority").value,
  }

  dataManager.addChecklistItem(item)
  document.getElementById("checklistForm").reset()
  renderChecklist()
})

function renderChecklist() {
  const list = document.getElementById("checklistList")
  list.innerHTML = ""

  // Update stats
  const stats = dataManager.getChecklistStats()
  document.getElementById("totalItems").textContent = stats.total
  document.getElementById("completedItems").textContent = stats.completed
  document.getElementById("progressPercent").textContent = `${stats.progress}%`

  // Sort by priority and completion status
  const sortedItems = [...dataManager.checklist].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  sortedItems.forEach((item) => {
    const itemElement = document.createElement("div")
    itemElement.className = `checklist-item ${item.completed ? 'completed' : ''}`
    
    const categoryEmojis = {
      documents: '📄',
      clothing: '👕',
      electronics: '📱',
      toiletries: '🧴',
      misc: '📦',
      tasks: '✅'
    }
    
    const priorityEmojis = {
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    }

    itemElement.innerHTML = `
      <div class="checklist-checkbox ${item.completed ? 'checked' : ''}" onclick="toggleChecklistItem(${item.id})">
        ${item.completed ? '✓' : ''}
      </div>
      <div class="checklist-content">
        <div class="checklist-text">${item.text}</div>
        <div class="checklist-meta">
          <span class="checklist-category">${categoryEmojis[item.category]} ${item.category}</span>
          <span class="checklist-priority ${item.priority}">${priorityEmojis[item.priority]} ${item.priority}</span>
        </div>
      </div>
      <div class="checklist-actions">
        <button class="btn btn-danger btn-small" onclick="deleteChecklistItem(${item.id})">🗑️</button>
      </div>
    `
    list.appendChild(itemElement)
  })
}

function toggleChecklistItem(id) {
  dataManager.toggleChecklistItem(id)
  renderChecklist()
}

function deleteChecklistItem(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    dataManager.deleteChecklistItem(id)
    renderChecklist()
  }
}

// Gallery Management
let currentFilter = 'all'

document.getElementById("galleryForm").addEventListener("submit", (e) => {
  e.preventDefault()
  
  const files = document.getElementById("photoInput").files
  const category = document.getElementById("photoCategory").value
  
  if (files.length === 0) {
    alert("Please select at least one photo.")
    return
  }
  
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = function(e) {
        const photo = {
          file: e.target.result,
          name: file.name,
          category: category,
          date: new Date().toLocaleDateString()
        }
        dataManager.addGalleryPhoto(photo)
        renderGallery()
      }
      reader.readAsDataURL(file)
    }
  })
  
  document.getElementById("galleryForm").reset()
})

// File input drag and drop
document.querySelector('.file-input-label').addEventListener('click', () => {
  document.getElementById('photoInput').click()
})

document.querySelector('.file-input-label').addEventListener('dragover', (e) => {
  e.preventDefault()
  e.currentTarget.style.background = 'var(--primary-light)'
  e.currentTarget.style.color = 'white'
})

document.querySelector('.file-input-label').addEventListener('dragleave', (e) => {
  e.currentTarget.style.background = 'var(--neutral-100)'
  e.currentTarget.style.color = 'var(--primary)'
})

document.querySelector('.file-input-label').addEventListener('drop', (e) => {
  e.preventDefault()
  e.currentTarget.style.background = 'var(--neutral-100)'
  e.currentTarget.style.color = 'var(--primary)'
  
  const files = e.dataTransfer.files
  document.getElementById('photoInput').files = files
})

function renderGallery() {
  const grid = document.getElementById("galleryGrid")
  grid.innerHTML = ""
  
  // Update stats
  const stats = dataManager.getGalleryStats()
  document.getElementById("totalPhotos").textContent = stats.total
  document.getElementById("sceneryCount").textContent = stats.scenery
  document.getElementById("foodCount").textContent = stats.food
  
  // Filter photos
  const filteredPhotos = currentFilter === 'all' 
    ? dataManager.gallery 
    : dataManager.gallery.filter(photo => photo.category === currentFilter)
  
  filteredPhotos.forEach((photo) => {
    const photoElement = document.createElement("div")
    photoElement.className = "gallery-item"
    photoElement.innerHTML = `
      <img src="${photo.file}" alt="${photo.name}" loading="lazy">
      <div class="gallery-item-info">
        <div class="gallery-item-category">${getCategoryEmoji(photo.category)} ${photo.category}</div>
        <div class="gallery-item-date">📅 ${photo.date}</div>
        <div class="gallery-item-actions">
          <button class="btn btn-view btn-small" onclick="viewPhoto('${photo.file}')">👁️ View</button>
          <button class="btn btn-delete btn-small" onclick="deletePhoto(${photo.id})">🗑️ Delete</button>
        </div>
      </div>
    `
    grid.appendChild(photoElement)
  })
}

function getCategoryEmoji(category) {
  const emojis = {
    scenery: '🏔️',
    food: '🍽️',
    activities: '🎯',
    people: '👥',
    accommodation: '🏨',
    transport: '🚗'
  }
  return emojis[category] || '📷'
}

function viewPhoto(src) {
  const modal = document.createElement('div')
  modal.className = 'photo-modal'
  modal.innerHTML = `
    <div class="photo-modal-content">
      <span class="photo-modal-close">&times;</span>
      <img src="${src}" alt="Photo">
    </div>
  `
  document.body.appendChild(modal)
  
  modal.style.display = 'flex'
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('photo-modal-close')) {
      document.body.removeChild(modal)
    }
  })
}

function deletePhoto(id) {
  if (confirm("Are you sure you want to delete this photo?")) {
    dataManager.deleteGalleryPhoto(id)
    renderGallery()
  }
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
    e.target.classList.add('active')
    currentFilter = e.target.dataset.filter
    renderGallery()
  })
})

// Export functionality
function exportTripData() {
  const exportData = {
    tripName: "Manali Trip",
    exportDate: new Date().toLocaleDateString(),
    exportTime: new Date().toLocaleTimeString(),
    summary: {
      totalHotels: dataManager.hotels.length,
      totalSpending: dataManager.spending.reduce((sum, item) => sum + parseFloat(item.amount), 0),
      totalItineraryDays: dataManager.itinerary.length,
      totalChecklistItems: dataManager.checklist.length,
      completedChecklistItems: dataManager.checklist.filter(item => item.completed).length
    },
    hotels: dataManager.hotels,
    spending: dataManager.spending,
    itinerary: dataManager.itinerary,
    checklist: dataManager.checklist
  }

  // Create formatted text content
  let textContent = `🎒 MANALI TRIP SUMMARY 🎒\n\n`
  textContent += `Export Date: ${exportData.exportDate} at ${exportData.exportTime}\n\n`
  
  textContent += `📊 TRIP OVERVIEW 📊\n`
  textContent += `• Hotels Booked: ${exportData.summary.totalHotels}\n`
  textContent += `• Total Spending: ₹${exportData.summary.totalSpending.toFixed(2)}\n`
  textContent += `• Itinerary Days: ${exportData.summary.totalItineraryDays}\n`
  textContent += `• Checklist Progress: ${exportData.summary.completedChecklistItems}/${exportData.summary.totalChecklistItems} items\n\n`
  
  if (exportData.hotels.length > 0) {
    textContent += `🏨 HOTEL BOOKINGS 🏨\n`
    exportData.hotels.forEach((hotel, index) => {
      textContent += `${index + 1}. ${hotel.name} (${hotel.checkIn} to ${hotel.checkOut})\n`
    })
    textContent += `\n`
  }
  
  if (exportData.spending.length > 0) {
    textContent += `💰 SPENDING TRACKER 💰\n`
    const spendingByCategory = {}
    exportData.spending.forEach(item => {
      if (!spendingByCategory[item.category]) {
        spendingByCategory[item.category] = 0
      }
      spendingByCategory[item.category] += parseFloat(item.amount)
    })
    Object.entries(spendingByCategory).forEach(([category, amount]) => {
      textContent += `• ${category}: ₹${amount.toFixed(2)}\n`
    })
    textContent += `\n`
  }
  
  if (exportData.itinerary.length > 0) {
    textContent += `📅 ITINERARY 📅\n`
    exportData.itinerary.forEach((day, index) => {
      textContent += `Day ${index + 1}: ${day.plan}\n`
    })
    textContent += `\n`
  }
  
  if (exportData.checklist.length > 0) {
    textContent += `✅ CHECKLIST ✅\n`
    const completedItems = exportData.checklist.filter(item => item.completed)
    const pendingItems = exportData.checklist.filter(item => !item.completed)
    
    if (completedItems.length > 0) {
      textContent += `Completed:\n`
      completedItems.forEach(item => {
        textContent += `✓ ${item.text} (${item.category})\n`
      })
    }
    
    if (pendingItems.length > 0) {
      textContent += `Pending:\n`
      pendingItems.forEach(item => {
        textContent += `○ ${item.text} (${item.category})\n`
      })
    }
  }

  // Create and download file
  const blob = new Blob([textContent], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Manali-Trip-Summary-${exportData.exportDate.replace(/\//g, '-')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  // Show success message
  alert('📊 Trip data exported successfully! Check your downloads folder.')
}
