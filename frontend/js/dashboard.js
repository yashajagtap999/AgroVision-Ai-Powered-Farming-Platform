// Authenticate Session
let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Require user authentication for dashboard pages
    currentUser = SessionManager.requireAuth();
    if (!currentUser) return;

    // Sync and save global language selector state across dashboard pages
    const savedLang = localStorage.getItem('agro_language') || 'English';
    document.querySelectorAll('#global-lang-select').forEach(select => {
        select.value = savedLang;
        select.addEventListener('change', (e) => {
            if (typeof window.setGlobalLanguage === 'function') {
                window.setGlobalLanguage(e.target.value);
            } else {
                localStorage.setItem('agro_language', e.target.value);
                applyDashboardTranslations(e.target.value);
            }
        });
    });

    window.addEventListener('agro_lang_change', (e) => {
        applyDashboardTranslations(e.detail.language);
        const recommendBtn = document.getElementById('soil-recommend-btn');
        const cardsContainer = document.getElementById('rec-cards-container');
        if (recommendBtn && cardsContainer && cardsContainer.children.length > 0) {
            recommendBtn.click();
        }
    });

    applyDashboardTranslations(savedLang);

    // Initialize Global UI Components
    initSidebar();
    updateSidebarUser();
    
    // Check if we need to auto-apply from landing page query
    const urlParams = new URLSearchParams(window.location.search);
    const applyScheme = urlParams.get('apply');

    // Page-specific initializations
    // 1. Crop Advisor Page (dashboard.html)
    if (document.getElementById('run-recommend-btn')) {
        initCropAdvisor();
    }

    // 2. Video Tutorials Page (videos.html)
    if (document.getElementById('narration-lang-select')) {
        initTutorials();
    }

    // 2. Profile & Document Vault (profile.html)
    if (document.getElementById('profile-form')) {
        initProfilePage();
        initDocumentVault();
    }

    // 3. Resume & Report Automation Page (resume.html)
    if (document.getElementById('resume-view-container')) {
        initResumePage();
    }

    // 4. Chatbot Page (chatbot.html)
    if (document.getElementById('chat-messages-box')) {
        initChatbotPage();
    }
});

function applyDashboardTranslations(lang) {
    const dict = {
        "English": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> Auto-Detect Live GPS / IP Weather',
            "search_city": '<i class="fas fa-search"></i> Search City',
            "get_rec": '<i class="fas fa-seedling"></i> Get Recommendation',
            "save_profile": '<i class="fas fa-save"></i> Save Profile Details & Match Schemes',
            "run_workflow": '<i class="fas fa-bolt"></i> Run Automation Workflow',
            "download_pdf": '<i class="fas fa-download"></i> Download Your Report (PDF)'
        },
        "हिंदी": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> लाइव मौसम स्वतः पहचानें (GPS / IP)',
            "search_city": '<i class="fas fa-search"></i> शहर खोजें',
            "get_rec": '<i class="fas fa-seedling"></i> सिफारिश प्राप्त करें',
            "save_profile": '<i class="fas fa-save"></i> प्रोफ़ाइल सहेजें और योजनाएं मिलाएं',
            "run_workflow": '<i class="fas fa-bolt"></i> स्वचालित रिपोर्ट तैयार करें',
            "download_pdf": '<i class="fas fa-download"></i> अपनी रिपोर्ट डाउनलोड करें (PDF)'
        },
        "मराठी": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> थेट हवामान आपोआप ओळखा (GPS / IP)',
            "search_city": '<i class="fas fa-search"></i> शहर शोधा',
            "get_rec": '<i class="fas fa-seedling"></i> शिफारस मिळवा',
            "save_profile": '<i class="fas fa-save"></i> प्रोफाइल जतन करा व योजना जुळवा',
            "run_workflow": '<i class="fas fa-bolt"></i> ऑटोमेशन अहवाल तयार करा',
            "download_pdf": '<i class="fas fa-download"></i> तुमचा अहवाल डाउनलोड करा (PDF)'
        },
        "తెలుగు": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> లైవ్ వాతావరణాన్ని గుర్తించండి (GPS / IP)',
            "search_city": '<i class="fas fa-search"></i> నగరాన్ని శోధించండి',
            "get_rec": '<i class="fas fa-seedling"></i> సిఫార్సు పొందండి',
            "save_profile": '<i class="fas fa-save"></i> ప్రొఫైల్‌ను సేవ్ చేయండి & పథకాలను జత చేయండి',
            "run_workflow": '<i class="fas fa-bolt"></i> ఆటోమేషన్ నివేదికను రూపొందించండి',
            "download_pdf": '<i class="fas fa-download"></i> మీ నివేదికను డౌన్‌లోడ్ చేయండి (PDF)'
        },
        "മലയാളം": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> തത്സമയ കാലാവസ്ഥ കണ്ടെത്തുക (GPS / IP)',
            "search_city": '<i class="fas fa-search"></i> നഗരം തിരയുക',
            "get_rec": '<i class="fas fa-seedling"></i> നിർദ്ദേശം നേടുക',
            "save_profile": '<i class="fas fa-save"></i> പ്രൊഫൈൽ സേവ് ചെയ്യുക & മാച്ച് കണ്ടെത്തുക',
            "run_workflow": '<i class="fas fa-bolt"></i> ഓട്ടോമേഷൻ റിപ്പോർട്ട് തയാറാക്കുക',
            "download_pdf": '<i class="fas fa-download"></i> റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക (PDF)'
        },
        "ਪੰਜਾਬੀ": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> ਲਾਈਵ ਮੌਸਮ ਦੀ ਪਛਾਣ ਕਰੋ (GPS / IP)',
            "search_city": '<i class="fas fa-search"></i> ਸ਼ਹਿਰ ਖੋਜੋ',
            "get_rec": '<i class="fas fa-seedling"></i> ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ',
            "save_profile": '<i class="fas fa-save"></i> ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ ਅਤੇ ਯੋਜਨਾਵਾਂ ਮਿਲਾਓ',
            "run_workflow": '<i class="fas fa-bolt"></i> ਆਟੋਮੇਸ਼ਨ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ',
            "download_pdf": '<i class="fas fa-download"></i> ਆਪਣੀ ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ (PDF)'
        },
        "ગુજરાતી": {
            "detect_weather": '<i class="fas fa-map-marker-alt"></i> લાઈવ હવામાન ઓળખો (GPS / IP)',
            "search_city": '<i class="fas fa-search"></i> શહેર શોધો',
            "get_rec": '<i class="fas fa-seedling"></i> ભલામણ મેળવો',
            "save_profile": '<i class="fas fa-save"></i> પ્રોફાઇલ સેવ કરો અને યોજનાઓ મેળવો',
            "run_workflow": '<i class="fas fa-bolt"></i> ઓટોમેશન રિપોર્ટ તૈયાર કરો',
            "download_pdf": '<i class="fas fa-download"></i> તમારો રિપોર્ટ ડાઉનલોડ કરો (PDF)'
        }
    };

    const t = dict[lang] || dict["English"];

    const detectBtn = document.getElementById('detect-weather-btn');
    if (detectBtn) detectBtn.innerHTML = t.detect_weather;

    const searchCityBtn = document.getElementById('search-city-btn');
    if (searchCityBtn) searchCityBtn.innerHTML = t.search_city;

    const recommendBtn = document.getElementById('run-recommend-btn');
    if (recommendBtn) recommendBtn.innerHTML = t.get_rec;

    const profileFormBtn = document.querySelector('#profile-form button[type="submit"]');
    if (profileFormBtn) profileFormBtn.innerHTML = t.save_profile;

    const workflowBtn = document.getElementById('run-workflow-btn');
    if (workflowBtn) workflowBtn.innerHTML = t.run_workflow;

    const dlBtn = document.getElementById('download-pdf-report-btn');
    if (dlBtn) dlBtn.innerHTML = t.download_pdf;

    if (typeof window.applyTranslations === 'function') {
        window.applyTranslations();
    }
}

// Update user details in the sidebar
function updateSidebarUser() {
    const avatar = document.querySelector('.user-avatar');
    const nameEl = document.querySelector('.user-name');
    const roleEl = document.querySelector('.user-role');
    
    if (avatar && currentUser.name) {
        avatar.textContent = currentUser.name.charAt(0).toUpperCase();
    }
    if (nameEl) nameEl.textContent = currentUser.name;
    if (roleEl) roleEl.textContent = `Farmer (${currentUser.state || 'India'})`;
}

// Sidebar open/collapse and mobile drawer
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-dashboard');
    const toggleBtn = document.getElementById('sidebar-collapse-btn');
    const mobileToggle = document.getElementById('mobile-hamburger-btn');
    const logoutBtn = document.getElementById('sidebar-logout-btn');

    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // Adjust charts size if any
            if (window.pieChartInstance) window.pieChartInstance.resize();
        });
    }

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
        });

        // Close sidebar clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            SessionManager.logout();
        });
    }
}

// ----------------- DASHBOARD OVERVIEW -----------------
async function initDashboardOverview() {
    // Set user metadata values
    const welcomeName = document.getElementById('welcome-farmer-name');
    if (welcomeName) welcomeName.textContent = currentUser.name;

    // Load active applications and alerts
    await refreshApplicationsTable();
    await loadQuickStats();
}

async function refreshApplicationsTable() {
    const tbody = document.getElementById('applications-tbody');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>`;

    const apps = await ApiService.getUserApplications(currentUser.id);
    tbody.innerHTML = '';

    if (apps.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; padding: 2rem; color: var(--text-secondary);">
                    <i class="fas fa-search-plus" style="font-size:2rem; margin-bottom:10px;"></i>
                    <p>No active applications. Find eligible schemes under the match section.</p>
                </td>
            </tr>
        `;
        return;
    }

    // Sort apps by date desc
    apps.sort((a,b) => b.id - a.id);

    apps.forEach(app => {
        const tr = document.createElement('tr');
        const statusClass = `app-status-${app.status.toLowerCase()}`;
        tr.innerHTML = `
            <td><strong>🌾 ${app.scheme_name}</strong></td>
            <td>${app.applied_date}</td>
            <td><span class="app-status-badge ${statusClass}"><i class="fas fa-circle" style="font-size:0.5rem;"></i> ${app.status}</span></td>
            <td>
                <button class="btn-premium btn-secondary-custom" style="padding:0.35rem 0.75rem; font-size:0.75rem;" onclick="viewAppReceipt('${app.scheme_name}', '${app.applied_date}', '${app.status}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewAppReceipt(schemeName, date, status) {
    alert(`Application Details:\n\nFarmer: ${currentUser.name}\nScheme: ${schemeName}\nDate Applied: ${date}\nStatus: ${status}\n\nOur officials are validating your documents.`);
}

async function loadQuickStats() {
    const schemesCountEl = document.getElementById('stat-available-schemes');
    const matchEl = document.getElementById('stat-match-score');
    const appsCountEl = document.getElementById('stat-active-apps');

    // 1. Schemes Count
    const schemes = await ApiService.getAllSchemes();
    if (schemesCountEl) {
        schemesCountEl.textContent = `${schemes.length}+`;
    }

    // 2. Applications count
    const apps = await ApiService.getUserApplications(currentUser.id);
    if (appsCountEl) {
        appsCountEl.textContent = apps.length;
    }

    // 3. Match score - simple percentage based on completeness of profile
    if (matchEl) {
        let score = 50; // base
        if (currentUser.land_size_acres) score += 15;
        if (currentUser.crop_types) score += 15;
        if (currentUser.state) score += 10;
        if (apps.length > 0) score += 5;
        matchEl.textContent = `${Math.min(score, 98)}%`;
    }
}

async function triggerDirectApply(schemeName) {
    try {
        const res = await ApiService.createApplication(currentUser.id, schemeName);
        if (res) {
            alert(`Success! You have applied for ${schemeName}. You can track it in your active applications.`);
            await refreshApplicationsTable();
            await loadQuickStats();
        }
    } catch (e) {
        alert('Application failed: ' + e.message);
    }
}

// ----------------- BENEFITS CALCULATOR -----------------
function initCalculator() {
    const calcBtn = document.getElementById('run-calc-btn');
    if (!calcBtn) return;

    // Load default values from profile
    const landIn = document.getElementById('calc-land-size');
    const investmentIn = document.getElementById('calc-investment');
    
    if (landIn && currentUser.land_size_acres) landIn.value = currentUser.land_size_acres;

    calcBtn.addEventListener('click', async () => {
        const landSize = parseFloat(landIn.value);
        const investment = parseFloat(investmentIn.value);
        const crop = document.getElementById('calc-crop-type').value;

        if (isNaN(landSize) || isNaN(investment)) {
            alert('Please enter valid numerical inputs.');
            return;
        }

        // Show spinner
        calcBtn.innerHTML = `<i class="spinner-loading"></i> Calculating...`;
        calcBtn.disabled = true;

        try {
            const result = await ApiService.predictBenefits(landSize, investment, crop);
            
            // Populate metric fields
            document.getElementById('metric-subsidy').textContent = `₹${result.estimated_subsidy.toLocaleString('en-IN')}`;
            document.getElementById('metric-roi').textContent = `${result.expected_roi}%`;
            document.getElementById('metric-timeline').textContent = `${result.timeline_days} Days`;
            document.getElementById('metric-yield').textContent = `₹${result.yield_estimate.toLocaleString('en-IN')}`;

            // Reveal calculator summary container
            document.getElementById('calculator-results-wrapper').style.display = 'block';

            // Draw ROI Chart.js pie chart
            const profit = Math.max(0, result.yield_estimate - investment - result.estimated_subsidy);
            ChartsManager.drawRoiChart(investment, result.estimated_subsidy, profit);
            
        } catch (e) {
            alert('Prediction error: ' + e.message);
        } finally {
            calcBtn.innerHTML = `<i class="fas fa-calculator"></i> Calculate Benefits`;
            calcBtn.disabled = false;
        }
    });
}

// ----------------- CROP ADVISOR -----------------
function initCropAdvisor() {
    const recommendBtn = document.getElementById('run-recommend-btn');
    const detectBtn = document.getElementById('detect-weather-btn');
    const statusBadge = document.getElementById('detected-status-badge');
    const statusInfo = document.getElementById('detected-info');
    
    if (!recommendBtn) return;

    let weatherInfo = {};

    const searchCityBtn = document.getElementById('search-city-btn');
    const cityInput = document.getElementById('manual-city-input');

    // Search by Manual City / District Name
    async function searchWeatherByCity() {
        if (!cityInput || !cityInput.value.trim()) {
            alert("Please enter a city or district name (e.g., Nashik, Nagpur, Satara).");
            return;
        }
        const cityName = cityInput.value.trim();
        if (searchCityBtn) {
            searchCityBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Searching...`;
            searchCityBtn.disabled = true;
        }
        if (statusBadge) {
            statusBadge.style.display = 'block';
            statusBadge.className = 'alert alert-info';
            statusInfo.textContent = `Fetching live weather for ${cityName}...`;
        }

        try {
            const weather = await ApiService.fetchWeatherData(null, null, cityName);
            applyWeatherData(weather, null, null, `${weather.current.city}, ${weather.current.country} (City Search)`);
        } catch (e) {
            alert(`Could not fetch weather for "${cityName}". ${e.message}`);
            if (statusBadge) statusBadge.style.display = 'none';
        } finally {
            if (searchCityBtn) {
                searchCityBtn.innerHTML = `<i class="fas fa-search"></i> Search City`;
                searchCityBtn.disabled = false;
            }
        }
    }

    if (searchCityBtn) {
        searchCityBtn.addEventListener('click', searchWeatherByCity);
    }
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchWeatherByCity();
            }
        });
    }

    // Auto-detect Geolocation & Weather
    if (detectBtn) {
        detectBtn.addEventListener('click', () => {
            detectBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Detecting weather...`;
            detectBtn.disabled = true;
            if (statusBadge) {
                statusBadge.style.display = 'block';
                statusBadge.className = 'alert alert-info';
                statusInfo.textContent = 'Acquiring GPS coordinates...';
            }

            if (!navigator.geolocation) {
                console.warn('Geolocation not supported, trying IP geolocation.');
                tryIpGeolocation('GPS not supported by browser');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    if (statusInfo) statusInfo.textContent = `GPS fixed. Fetching live weather for (${lat.toFixed(4)}, ${lon.toFixed(4)})...`;

                    try {
                        const weather = await ApiService.fetchWeatherData(lat, lon);
                        applyWeatherData(weather, lat, lon, `${weather.current.city}, ${weather.current.country} (GPS Fixed)`);
                    } catch (e) {
                        console.warn('GPS Weather API call failed. Trying IP Geolocation.', e);
                        await tryIpGeolocation('GPS Weather API error');
                    }
                },
                async (error) => {
                    console.warn('Geolocation query denied or failed. Trying IP Geolocation.', error);
                    let reason = 'GPS access denied';
                    if (error.code === error.POSITION_UNAVAILABLE) reason = 'Location unavailable';
                    if (error.code === error.TIMEOUT) reason = 'Request timed out';
                    await tryIpGeolocation(reason);
                },
                { timeout: 5000 }
            );
        });
    }

    async function tryIpGeolocation(reason) {
        if (statusInfo) statusInfo.textContent = `Trying IP-based location fallback (${reason})...`;
        try {
            const ipRes = await fetch('https://ipapi.co/json/');
            if (!ipRes.ok) throw new Error("IP geolocation service unavailable");
            const ipData = await ipRes.json();
            if (ipData.city) {
                const weather = await ApiService.fetchWeatherData(null, null, ipData.city);
                applyWeatherData(weather, ipData.latitude, ipData.longitude, `${ipData.city}, ${ipData.region_code || ipData.country_name} (Auto IP Location)`);
                return;
            }
            throw new Error("City not found from IP");
        } catch (e) {
            console.warn("IP Geolocation failed. Falling back to default Pune location.", e);
            await useFallbackWeather(reason);
        }
    }

    async function useFallbackWeather(reason) {
        const lat = 18.5204;
        const lon = 73.8567;
        if (statusInfo) statusInfo.textContent = `Fetching default climate data...`;
        
        try {
            const weather = await ApiService.fetchWeatherData(lat, lon);
            applyWeatherData(weather, lat, lon, `Pune, MH (${reason})`);
        } catch (e) {
            console.error('Fallback weather API fetch failed, using offline static values:', e);
            const mockWeather = {
                current: {
                    temp: 24.5,
                    humidity: 80,
                    rain: 2.5,
                    description: "scattered clouds",
                    city: "Pune",
                    country: "IN",
                    wind_speed: 3.2,
                    pressure: 1012
                },
                forecast: {
                    expected_rain_24h: 2.5,
                    daily_forecast: [
                        { day: "Today", temp_min: 21.0, temp_max: 28.5, humidity: 78, rain: 2.5, description: "scattered clouds" },
                        { day: "Sat, Jul 25", temp_min: 22.0, temp_max: 29.0, humidity: 82, rain: 5.0, description: "light rain" },
                        { day: "Sun, Jul 26", temp_min: 21.5, temp_max: 27.8, humidity: 85, rain: 12.0, description: "moderate rain" },
                        { day: "Mon, Jul 27", temp_min: 20.8, temp_max: 26.5, humidity: 80, rain: 4.2, description: "light rain" },
                        { day: "Tue, Jul 28", temp_min: 22.2, temp_max: 30.1, humidity: 75, rain: 0.5, description: "partly cloudy" }
                    ]
                }
            };
            applyWeatherData(mockWeather, lat, lon, `Pune, MH (offline fallback)`);
        }
    }

    function applyWeatherData(weather, lat, lon, label) {
        // Save weather info
        weatherInfo = {
            location: { latitude: lat, longitude: lon },
            current: weather.current,
            forecast: weather.forecast
        };

        // Auto-set sliders
        const tempVal = Math.round(weather.current.temp * 10) / 10;
        const humVal = Math.round(weather.current.humidity);
        const rainVal = Math.min(2500, Math.max(200, Math.round(weather.forecast.expected_rain_24h * 10) || Math.round(weather.current.rain * 10) || 1000));

        // Set Temperature Slider
        const tempSlider = document.getElementById('soil-temp');
        if (tempSlider) {
            tempSlider.value = tempVal;
            const out = tempSlider.nextElementSibling;
            if (out) out.value = `${tempVal} °C`;
        }

        // Set Humidity Slider
        const humSlider = document.getElementById('soil-hum');
        if (humSlider) {
            humSlider.value = humVal;
            const out = humSlider.nextElementSibling;
            if (out) out.value = `${humVal} %`;
        }

        // Set Rainfall Slider
        const rainSlider = document.getElementById('soil-rain');
        if (rainSlider) {
            rainSlider.value = rainVal;
            const out = rainSlider.nextElementSibling;
            if (out) out.value = `${rainVal} mm`;
        }

        // Update Status Badge with full detailed details
        if (statusBadge) statusBadge.className = 'alert alert-success';
        
        const rainText = weather.current.rain ? `${weather.current.rain} mm/h` : (weather.forecast.expected_rain_24h > 0 ? `${weather.forecast.expected_rain_24h.toFixed(1)} mm (expected)` : '0 mm');
        
        if (statusInfo) {
            statusInfo.innerHTML = `
                <strong><i class="fas fa-check-circle"></i> Weather Detected Successfully!</strong><br>
                <span style="font-size:0.9rem; margin-top:5px; display:inline-block;">
                    📍 <strong>Location:</strong> ${label}<br>
                    🌡️ <strong>Temp:</strong> ${tempVal}°C | 💧 <strong>Humidity:</strong> ${humVal}% | ☁️ <strong>Condition:</strong> ${weather.current.description}<br>
                    💨 <strong>Wind:</strong> ${weather.current.wind_speed} m/s | 📈 <strong>Pressure:</strong> ${weather.current.pressure} hPa | 🌧️ <strong>Rainfall:</strong> ${rainText}
                </span>
            `;
        }

        // Render 5-Day Forecast Grid
        const forecast5dayContainer = document.getElementById('weather-5day-container');
        const forecast5dayGrid = document.getElementById('weather-5day-grid');

        if (forecast5dayGrid && weather.forecast && weather.forecast.daily_forecast && weather.forecast.daily_forecast.length > 0) {
            forecast5dayGrid.innerHTML = '';
            weather.forecast.daily_forecast.forEach((dayItem, idx) => {
                const dayCard = document.createElement('div');
                dayCard.style.background = '#ffffff';
                dayCard.style.padding = '0.75rem 0.5rem';
                dayCard.style.borderRadius = '12px';
                dayCard.style.textAlign = 'center';
                dayCard.style.border = '1px solid rgba(0,0,0,0.06)';
                dayCard.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
                
                let iconEmoji = '🌤️';
                const descLower = (dayItem.description || '').toLowerCase();
                if (descLower.includes('rain') || descLower.includes('drizzle')) iconEmoji = '🌧️';
                else if (descLower.includes('thunder')) iconEmoji = '⛈️';
                else if (descLower.includes('cloud')) iconEmoji = '☁️';
                else if (descLower.includes('clear') || descLower.includes('sun')) iconEmoji = '☀️';

                dayCard.innerHTML = `
                    <div style="font-weight:700; font-size:0.8rem; color:#1e293b; margin-bottom:4px;">${idx === 0 ? 'Today' : dayItem.day}</div>
                    <div style="font-size:1.4rem; margin:2px 0;">${iconEmoji}</div>
                    <div style="font-size:0.82rem; font-weight:700; color:#0f172a;">${dayItem.temp_max}° / ${dayItem.temp_min}°C</div>
                    <div style="font-size:0.72rem; color:#64748b; margin-top:2px;">💧 ${dayItem.humidity}%</div>
                    <div style="font-size:0.72rem; color:#2563eb; font-weight:600;">🌧️ ${dayItem.rain}mm</div>
                `;
                forecast5dayGrid.appendChild(dayCard);
            });
            if (forecast5dayContainer) forecast5dayContainer.style.display = 'block';
        } else if (forecast5dayContainer) {
            forecast5dayContainer.style.display = 'none';
        }

        detectBtn.innerHTML = `<i class="fas fa-map-marker-alt"></i> Auto-Detect Location & Weather`;
        detectBtn.disabled = false;
    }

    // Submit Recommendation Form
    recommendBtn.addEventListener('click', async () => {
        const nEl = document.getElementById('soil-n');
        const pEl = document.getElementById('soil-p');
        const kEl = document.getElementById('soil-k');
        const landEl = document.getElementById('soil-land');
        
        // Remove validation error classes
        [nEl, pEl, kEl, landEl].forEach(el => {
            if (el) el.style.borderColor = '';
        });
        
        let isValid = true;
        if (!nEl || nEl.value.trim() === '' || isNaN(nEl.value) || parseFloat(nEl.value) < 0) {
            if (nEl) nEl.style.borderColor = '#ef4444';
            isValid = false;
        }
        if (!pEl || pEl.value.trim() === '' || isNaN(pEl.value) || parseFloat(pEl.value) < 0) {
            if (pEl) pEl.style.borderColor = '#ef4444';
            isValid = false;
        }
        if (!kEl || kEl.value.trim() === '' || isNaN(kEl.value) || parseFloat(kEl.value) < 0) {
            if (kEl) kEl.style.borderColor = '#ef4444';
            isValid = false;
        }
        if (!landEl || landEl.value.trim() === '' || isNaN(landEl.value) || parseFloat(landEl.value) <= 0) {
            if (landEl) landEl.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (!isValid) {
            alert('Please fill out all soil nutrient parameters and land size with valid positive numbers.');
            return;
        }

        const n = nEl.value;
        const p = pEl.value;
        const k = kEl.value;
        const temp = document.getElementById('soil-temp').value;
        const hum = document.getElementById('soil-hum').value;
        const ph = document.getElementById('soil-ph').value;
        const rain = document.getElementById('soil-rain').value;
        const soilType = document.getElementById('soil-type-select').value;
        const water = document.getElementById('soil-water-select').value;
        const season = document.getElementById('soil-season-select').value;
        const landSize = landEl.value;
        const prevCrop = document.getElementById('soil-prev-crop') ? document.getElementById('soil-prev-crop').value : 'None';
        const currentLang = document.getElementById('global-lang-select') ? document.getElementById('global-lang-select').value : (localStorage.getItem('user_lang') || 'English');

        recommendBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Generating AI Recommendation...`;
        recommendBtn.disabled = true;

        try {
            let res;
            try {
                res = await ApiService.predictCrop(n, p, k, temp, hum, ph, rain, soilType, water, season, landSize, prevCrop, weatherInfo, currentLang);
            } catch (backendError) {
                console.warn('Backend prediction failed, running client-side rule-based prediction fallback:', backendError);
                
                // Client-side rule engine (Top 3 recommendations)
                const cropsDb = [
                    {
                        name: "Paddy",
                        icon: "🌾",
                        suitable_soils: ["Alluvial", "Clay", "Loamy"],
                        suitable_seasons: ["Kharif"],
                        temp_min: 20, temp_max: 35,
                        hum_min: 70, hum_max: 95,
                        ph_min: 5.5, ph_max: 7.0,
                        rain_min: 1000, rain_max: 2500,
                        water_req: "High",
                        fertilizer: "Urea (Nitrogen-rich), DAP, and MOP",
                        expected_yield: "3.5 - 4.5 tons/hectare",
                        estimated_profit: `₹${(42000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(50000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Paddy (Rice) is highly suitable due to high water availability, hot and humid weather, and clay/loamy soil structures."
                    },
                    {
                        name: "Wheat",
                        icon: "🌾",
                        suitable_soils: ["Clay", "Loamy", "Alluvial"],
                        suitable_seasons: ["Rabi"],
                        temp_min: 10, temp_max: 25,
                        hum_min: 40, hum_max: 70,
                        ph_min: 6.0, ph_max: 7.5,
                        rain_min: 400, rain_max: 1000,
                        water_req: "Medium",
                        fertilizer: "Balanced NPK (4:2:1 ratio) + Superphosphate",
                        expected_yield: "3.0 - 4.0 tons/hectare",
                        estimated_profit: `₹${(28000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(38000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Wheat thrives in cooler winter seasons with moderate watering regimes and balanced loam soil structures."
                    },
                    {
                        name: "Cotton",
                        icon: "☁️",
                        suitable_soils: ["Black", "Alluvial", "Loamy"],
                        suitable_seasons: ["Kharif"],
                        temp_min: 22, temp_max: 38,
                        hum_min: 50, hum_max: 80,
                        ph_min: 6.0, ph_max: 8.0,
                        rain_min: 500, rain_max: 1200,
                        water_req: "Medium",
                        fertilizer: "Nitrogen and Potash NPK 120:60:60",
                        expected_yield: "1.5 - 2.5 tons/hectare",
                        estimated_profit: `₹${(45000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(62000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Cotton is highly recommended for black clayey soil which holds moisture well during the warm season."
                    },
                    {
                        name: "Sugarcane",
                        icon: "🎋",
                        suitable_soils: ["Loamy", "Clay", "Alluvial"],
                        suitable_seasons: ["Kharif"],
                        temp_min: 20, temp_max: 35,
                        hum_min: 60, hum_max: 85,
                        ph_min: 6.0, ph_max: 7.8,
                        rain_min: 1100, rain_max: 2000,
                        water_req: "High",
                        fertilizer: "High Nitrogen NPK 150:80:60",
                        expected_yield: "70 - 90 tons/hectare",
                        estimated_profit: `₹${(65000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(95000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Deep alluvial soils combined with high rainfall or heavy irrigation support optimal sugarcane growth."
                    },
                    {
                        name: "Maize",
                        icon: "🌽",
                        suitable_soils: ["Alluvial", "Red", "Loamy"],
                        suitable_seasons: ["Kharif", "Rabi"],
                        temp_min: 18, temp_max: 32,
                        hum_min: 50, hum_max: 80,
                        ph_min: 5.5, ph_max: 7.5,
                        rain_min: 500, rain_max: 1000,
                        water_req: "Medium",
                        fertilizer: "Balanced NPK 120:60:40",
                        expected_yield: "4.5 - 5.5 tons/hectare",
                        estimated_profit: `₹${(22000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(36000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Warm sunny days, loamy or red well-drained soils make Maize a highly efficient and safe choice."
                    },
                    {
                        name: "Groundnut",
                        icon: "🥜",
                        suitable_soils: ["Sandy", "Loamy", "Red"],
                        suitable_seasons: ["Kharif", "Summer"],
                        temp_min: 22, temp_max: 32,
                        hum_min: 50, hum_max: 75,
                        ph_min: 6.0, ph_max: 7.0,
                        rain_min: 400, rain_max: 800,
                        water_req: "Low",
                        fertilizer: "NPK 20:40:40 and Gypsum",
                        expected_yield: "2.0 - 3.0 tons/hectare",
                        estimated_profit: `₹${(32000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(47000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Groundnut grows exceptionally well in sandy loam soils that let pegs penetrate the soil easily."
                    },
                    {
                        name: "Pulses",
                        icon: "🌱",
                        suitable_soils: ["Loamy", "Sandy", "Red"],
                        suitable_seasons: ["Rabi", "Kharif"],
                        temp_min: 15, temp_max: 30,
                        hum_min: 45, hum_max: 70,
                        ph_min: 6.0, ph_max: 7.5,
                        rain_min: 300, rain_max: 600,
                        water_req: "Low",
                        fertilizer: "NPK 20:50:20 (Phosphorus rich)",
                        expected_yield: "1.0 - 1.8 tons/hectare",
                        estimated_profit: `₹${(19000 * parseFloat(landSize)).toLocaleString('en-IN')} - ₹${(32000 * parseFloat(landSize)).toLocaleString('en-IN')} total`,
                        reasoning: "Pulses have nitrogen-fixing properties, making them highly resilient on marginal sandy loam terrains."
                    }
                ];

                const scoredCrops = [];
                const tempNum = parseFloat(temp);
                const humNum = parseFloat(hum);
                const phNum = parseFloat(ph);
                const rainNum = parseFloat(rain);

                cropsDb.forEach(crop => {
                    let score = 0;
                    
                    if (crop.suitable_soils.includes(soilType)) score += 25;
                    else if (crop.suitable_soils.includes("Loamy") && soilType === "Alluvial") score += 15;
                    
                    if (crop.suitable_seasons.includes(season)) score += 20;
                    
                    if (tempNum >= crop.temp_min && tempNum <= crop.temp_max) score += 15;
                    else score += Math.max(0, 15 - Math.min(Math.abs(tempNum - crop.temp_min), Math.abs(tempNum - crop.temp_max)) * 2);
                    
                    if (humNum >= crop.hum_min && humNum <= crop.hum_max) score += 15;
                    else score += Math.max(0, 15 - Math.min(Math.abs(humNum - crop.hum_min), Math.abs(humNum - crop.hum_max)) * 0.5);
                    
                    if (rainNum >= crop.rain_min && rainNum <= crop.rain_max) score += 15;
                    else score += Math.max(0, 15 - Math.min(Math.abs(rainNum - crop.rain_min), Math.abs(rainNum - crop.rain_max)) * 0.02);
                    
                    if (phNum >= crop.ph_min && phNum <= crop.ph_max) score += 10;
                    else score += Math.max(0, 10 - Math.min(Math.abs(phNum - crop.ph_min), Math.abs(phNum - crop.ph_max)) * 5);
                    
                    let confidence = score / 100.0;
                    if (prevCrop !== "None" && crop.name.toLowerCase() !== prevCrop.toLowerCase()) {
                        confidence = Math.min(0.98, confidence + 0.03);
                    }
                    confidence = Math.min(0.98, Math.max(0.45, confidence));

                    scoredCrops.push({
                        recommended_crop: crop.name,
                        icon: crop.icon,
                        confidence: parseFloat(confidence.toFixed(2)),
                        reasoning: crop.reasoning,
                        suitable_soil: crop.suitable_soils.join(", "),
                        suitable_season: crop.suitable_seasons.join(", "),
                        water_req: crop.water_req,
                        fertilizer: crop.fertilizer,
                        expected_yield: crop.expected_yield,
                        estimated_profit: crop.estimated_profit
                    });
                });

                scoredCrops.sort((a, b) => b.confidence - a.confidence);
                
                res = {
                    recommendations: scoredCrops.slice(0, 3),
                    relevant_schemes: ["PM-KISAN", "Soil Health Card Scheme"]
                };
            }

            const cardsContainer = document.getElementById('rec-cards-container');
            if (cardsContainer && res.recommendations && res.recommendations.length > 0) {
                cardsContainer.innerHTML = '';
                const activeLang = document.getElementById('global-lang-select') ? document.getElementById('global-lang-select').value : (localStorage.getItem('user_lang') || 'English');

                const cardLabels = {
                    "English": { rec: "Recommendation", match: "Match", insight: "AI Insight", soil: "Suitable Soil", season: "Suitable Season", water: "Water Requirement", yield: "Expected Yield", fert: "Fertilizer Recommendation", profit: "Estimated Profit" },
                    "मराठी": { rec: "शिफारस", match: "जुळणी", insight: "एआय तज्ज्ञ सल्ला", soil: "योग्य मातीचा प्रकार", season: "योग्य हंगाम", water: "पाण्याची गरज", yield: "अपेक्षित उत्पादन", fert: "खत व्यवस्थापन शिफारस", profit: "अंदाजे नफा" },
                    "हिंदी": { rec: "सिफारिश", match: "मिलान", insight: "एआई विशेषज्ञ सलाह", soil: "उपयुक्त मिट्टी का प्रकार", season: "उपयुक्त मौसम", water: "पानी की आवश्यकता", yield: "अनुमानित उपज", fert: "उर्वरक/खाद सलाह", profit: "अनुमानित लाभ" },
                    "తెలుగు": { rec: "సిఫార్సు", match: "మ్యాచింగ్", insight: "AI నిపుణుల సలహా", soil: "అనుకూలమైన నేల", season: "అనుకూలమైన కాలం", water: "నీటి అవసరం", yield: "ఆశించిన దిగుబడి", fert: "ఎరువుల సిఫార్సు", profit: "అంచనా లాభం" },
                    "മലയാളം": { rec: "നിർദ്ദേശം", match: "മാച്ച്", insight: "AI വിദഗ്ദ്ധ ഉപദേശം", soil: "അനുയോജ്യമായ മണ്ണ്", season: "അനുയോജ്യമായ കാലം", water: "ജലാവശ്യം", yield: "പ്രതീക്ഷിക്കുന്ന വിളവ്", fert: "വളപ്രയോഗ നിർദ്ദേശം", profit: "പ്രതീക്ഷിക്കുന്ന ലാഭം" },
                    "ਪੰਜਾਬੀ": { rec: "ਸਿਫ਼ਾਰਸ਼", match: "ਮੈਚ", insight: "AI ਮਾਹਰ ਦੀ ਸਲਾਹ", soil: "ਢੁਕਵੀਂ ਮਿੱਟੀ", season: "ਢੁਕਵਾਂ ਮੌਸਮ", water: "ਪਾਣੀ ਦੀ ਲੋੜ", yield: "ਅਨੁਮਾਨਿਤ ਝਾੜ", fert: "ਖਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼", profit: "ਅਨੁਮਾਨਿਤ ਲਾਭ" },
                    "ગુજરાતી": { rec: "ભલામણ", match: "મેચ", insight: "AI નિષ્ણાત સલાહ", soil: "અનુકૂળ જમીન", season: "અનુકૂળ ઋતુ", water: "પાણીની જરૂરિયાત", yield: "અપેક્ષિત ઉત્પાદન", fert: "ખાતરની ભલામણ", profit: "અંદાજિત નફો" }
                };
                const lbl = cardLabels[activeLang] || cardLabels["English"];

                res.recommendations.forEach((rec, idx) => {
                    const card = document.createElement('div');
                    card.className = 'glass-panel hover-glow';
                    card.style.borderRadius = '20px';
                    card.style.padding = '1.5rem';
                    card.style.border = '1px solid var(--border-color)';
                    card.style.borderLeft = idx === 0 ? '6px solid #10b981' : (idx === 1 ? '6px solid #2563eb' : '6px solid #f59e0b');
                    card.style.position = 'relative';
                    card.style.background = '#ffffff';
                    
                    const scorePercentage = Math.round(rec.confidence * 100);
                    
                    card.innerHTML = `
                        <!-- Card Header -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem; flex-wrap:wrap; gap:10px;">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <span style="font-size:2.2rem; line-height:1;">${rec.icon}</span>
                                <div>
                                    <h4 style="margin:0; font-size:1.35rem; font-weight:800; color:#0f172a !important;">${rec.recommended_crop}</h4>
                                    <span style="font-size:0.78rem; font-weight:600; color:#475569 !important; text-transform:uppercase; letter-spacing:0.5px;">${lbl.rec} #${idx + 1}</span>
                                </div>
                            </div>
                            <span style="font-weight:800; font-size:0.85rem; color:${idx === 0 ? '#10b981' : (idx === 1 ? '#2563eb' : '#f59e0b')}; background:${idx === 0 ? 'rgba(16,185,129,0.08)' : (idx === 1 ? 'rgba(37,99,237,0.08)' : 'rgba(245,158,11,0.08)')}; padding:0.4rem 0.8rem; border-radius:50px; border:1px solid; border-color:inherit;">
                                ${scorePercentage}% ${lbl.match}
                            </span>
                        </div>
                        
                        <!-- Reasoning -->
                        <p style="font-size:0.92rem; color:#1e293b !important; background:rgba(0,0,0,0.02); padding:0.8rem 1rem; border-radius:10px; margin-bottom:1.25rem; line-height:1.5; border:1px solid rgba(0,0,0,0.04);">
                            <strong style="color:#0f172a !important;">${lbl.insight}:</strong> <em>${rec.reasoning}</em>
                        </p>
                        
                        <!-- Grid details -->
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; font-size:0.88rem; color:#475569 !important;">
                            <div>
                                <i class="fas fa-layer-group" style="width:18px; color:#475569 !important;"></i> <strong style="color:#475569 !important;">${lbl.soil}:</strong><br>
                                <span style="color:#0f172a !important; font-weight:500;">${rec.suitable_soil}</span>
                            </div>
                            <div>
                                <i class="fas fa-cloud-sun" style="width:18px; color:#475569 !important;"></i> <strong style="color:#475569 !important;">${lbl.season}:</strong><br>
                                <span style="color:#0f172a !important; font-weight:500;">${rec.suitable_season}</span>
                            </div>
                            <div>
                                <i class="fas fa-tint" style="width:18px; color:#475569 !important;"></i> <strong style="color:#475569 !important;">${lbl.water}:</strong><br>
                                <span style="color:#0f172a !important; font-weight:500;">${rec.water_req}</span>
                            </div>
                            <div>
                                <i class="fas fa-weight-hanging" style="width:18px; color:#475569 !important;"></i> <strong style="color:#475569 !important;">${lbl.yield}:</strong><br>
                                <span style="color:#0f172a !important; font-weight:500;">${rec.expected_yield}</span>
                            </div>
                            <div>
                                <i class="fas fa-flask" style="width:18px; color:#475569 !important;"></i> <strong style="color:#475569 !important;">${lbl.fert}:</strong><br>
                                <span style="color:#0f172a !important; font-weight:500;">${rec.fertilizer}</span>
                            </div>
                            <div>
                                <i class="fas fa-coins" style="width:18px; color:#475569 !important;"></i> <strong style="color:#475569 !important;">${lbl.profit}:</strong><br>
                                <span style="color:#10b981 !important; font-weight:700;">${rec.estimated_profit}</span>
                            </div>
                        </div>
                    `;
                    cardsContainer.appendChild(card);
                });
            }

            // List Linked Schemes
            const schemeListEl = document.getElementById('rec-linked-schemes-list');
            schemeListEl.innerHTML = '';
            if (res.relevant_schemes && res.relevant_schemes.length > 0) {
                res.relevant_schemes.forEach(scheme => {
                    const li = document.createElement('li');
                    li.style.marginBottom = '6px';
                    li.innerHTML = `<i class="fas fa-check-circle" style="color:#16a34a; margin-right:8px;"></i> <strong>${scheme}</strong>`;
                    schemeListEl.appendChild(li);
                });
            } else {
                schemeListEl.innerHTML = '<li>General income support schemes apply.</li>';
            }

            // Display wrapper & hide placeholder
            const placeholderEl = document.getElementById('recommendation-placeholder');
            if (placeholderEl) placeholderEl.style.display = 'none';
            
            const resultsWrapper = document.getElementById('recommendation-result-wrapper');
            if (resultsWrapper) {
                resultsWrapper.style.display = 'block';
                // Scroll smoothly to results
                resultsWrapper.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Save main crop recommendation in session to include in PDF
            if (res.recommendations && res.recommendations.length > 0) {
                currentUser.last_crop_rec = res.recommendations[0];
                SessionManager.setCurrentUser(currentUser);
            }

        } catch (e) {
            console.error('Recommendation failed:', e);
            alert('Unable to generate AI Recommendation. Please try again.');
        } finally {
            recommendBtn.innerHTML = `<i class="fas fa-seedling"></i> Get Recommendation`;
            recommendBtn.disabled = false;
        }
    });
}

// ----------------- ALERTS PAGE -----------------
async function initAlertsPage() {
    const alertsContainer = document.getElementById('seasonal-alerts-container');
    if (!alertsContainer) return;

    alertsContainer.innerHTML = `<div style="padding:2rem; text-align:center;"><i class="fas fa-spinner fa-spin"></i> Fetching alerts...</div>`;

    const alerts = await ApiService.getSeasonalAlerts();
    alertsContainer.innerHTML = '';

    if (alerts.length === 0) {
        alertsContainer.innerHTML = `<p style="color:var(--text-secondary); text-align:center; padding:1rem;">No seasonal alerts for this period.</p>`;
        return;
    }

    alerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = 'alert-item';
        
        let priorityClass = 'alert-low';
        let priorityIcon = 'fa-info-circle';
        if (alert.priority === 'High') {
            priorityClass = 'alert-high';
            priorityIcon = 'fa-exclamation-circle';
        } else if (alert.priority === 'Medium') {
            priorityClass = 'alert-medium';
            priorityIcon = 'fa-bell';
        }

        item.innerHTML = `
            <div class="alert-icon-wrapper ${priorityClass}">
                <i class="fas ${priorityIcon}"></i>
            </div>
            <div class="alert-body" style="flex:1;">
                <span class="alert-title">${alert.title}</span>
                <span class="alert-desc">${alert.message}</span>
                <span class="alert-deadline"><i class="far fa-calendar-alt"></i> Deadline: <strong>${alert.deadline}</strong></span>
            </div>
            <div>
                <button class="btn-premium btn-secondary-custom" style="padding:0.4rem 0.8rem; font-size:0.75rem;" onclick="setReminder('${alert.title}')">
                    <i class="far fa-bell"></i> Remind Me
                </button>
            </div>
        `;
        alertsContainer.appendChild(item);
    });
}

function setReminder(alertTitle) {
    alert(`Reminder Set!\n\nWe will notify you via SMS/WhatsApp before the deadline for "${alertTitle}".`);
}

// ----------------- REGIONAL TUTORIALS & TTS -----------------
function initTutorials() {
    const playButtons = document.querySelectorAll('.play-narration-btn');
    const langSelect = document.getElementById('narration-lang-select');

    playButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const desc = btn.getAttribute('data-desc');
            const lang = langSelect ? langSelect.value : 'English';

            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Playing...`;
            btn.disabled = true;

            try {
                const audioUrl = await ApiService.getTTSAudioUrl(desc, lang);
                let audioObj = new Audio(audioUrl);
                audioObj.play();
                
                audioObj.onended = () => {
                    btn.innerHTML = `<i class="fas fa-volume-up"></i> Listen`;
                    btn.disabled = false;
                };
            } catch (e) {
                alert('Audio failure: ' + e.message);
                btn.innerHTML = `<i class="fas fa-volume-up"></i> Listen`;
                btn.disabled = false;
            }
        });
    });
}

// ----------------- PROFILE & DOCUMENT AI -----------------
function initProfilePage() {
    const profileForm = document.getElementById('profile-form');
    if (!profileForm) return;

    // Fill form with session data
    document.getElementById('profile-name').value = currentUser.name || '';
    document.getElementById('profile-phone').value = currentUser.phone_number || '';
    document.getElementById('profile-state').value = currentUser.state || 'Maharashtra';
    document.getElementById('profile-land').value = currentUser.land_size_acres || '1.5';
    document.getElementById('profile-land-type').value = currentUser.land_type || 'Arable';
    document.getElementById('profile-irrigation').value = currentUser.irrigation_status || 'Rainfed';
    document.getElementById('profile-crops').value = currentUser.crop_types || '';

    // Handle form save
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const saveBtn = profileForm.querySelector('button[type="submit"]');
        saveBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Saving...`;
        saveBtn.disabled = true;

        const updatedProfile = {
            name: document.getElementById('profile-name').value,
            phone_number: document.getElementById('profile-phone').value,
            state: document.getElementById('profile-state').value,
            land_size_acres: parseFloat(document.getElementById('profile-land').value),
            land_type: document.getElementById('profile-land-type').value,
            irrigation_status: document.getElementById('profile-irrigation').value,
            crop_types: document.getElementById('profile-crops').value
        };

        try {
            // Update database and save full profile to session
            const dbUser = await ApiService.registerUser(updatedProfile);
            currentUser = { ...updatedProfile, ...dbUser };
            SessionManager.setCurrentUser(currentUser);
            updateSidebarUser();
            
            // Show check mark
            saveBtn.innerHTML = `<i class="checkmark-draw"></i> Saved Successfully`;
            
            // Match schemes instantly
            await matchProfileSchemes(updatedProfile);

        } catch (err) {
            alert('Error updating profile: ' + err.message);
            saveBtn.innerHTML = `<i class="fas fa-save"></i> Save Profile`;
            saveBtn.disabled = false;
        }
    });

    // Match on page load if values exist
    if (currentUser.crop_types) {
        matchProfileSchemes(currentUser);
    }
}

async function matchProfileSchemes(profile) {
    const matchedContainer = document.getElementById('profile-matched-schemes-wrapper');
    const listEl = document.getElementById('profile-matched-schemes-list');
    if (!matchedContainer || !listEl) return;

    listEl.innerHTML = `<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Searching best matching schemes...</div>`;
    matchedContainer.style.display = 'block';

    try {
        const matches = await ApiService.matchSchemes(profile);
        listEl.innerHTML = '';
        
        // Save matching schemes to session to generate PDF report
        currentUser.last_matches = matches;
        SessionManager.setCurrentUser(currentUser);

        if (matches.length === 0) {
            listEl.innerHTML = `<p style="padding:1rem; color:var(--text-secondary);">No direct matches found. Try adjusting land size or state.</p>`;
            return;
        }

        matches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'glass-panel hover-glow';
            card.style.borderRadius = '16px';
            card.style.padding = '1.5rem';
            card.style.marginBottom = '1rem';
            
            const reasonsList = (match.reasons && match.reasons.length > 0)
                ? match.reasons.map(r => `<li style="margin-bottom:3px;"><i class="fas fa-check-circle" style="color:#2563eb; margin-right:5px;"></i> ${r}</li>`).join('')
                : '<li>Matches your farm profile requirements.</li>';
            
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.5rem; flex-wrap:wrap; gap:10px;">
                    <h4 style="margin:0; font-size:1.15rem; color:var(--text-primary);">🌾 ${match.scheme_name}</h4>
                    <span style="font-weight:700; color:#16a34a; background:rgba(34,197,94,0.08); padding:0.25rem 0.6rem; border-radius:50px; font-size:0.82rem; border: 1px solid rgba(34,197,94,0.2);">
                        ${match.match_score}% Match
                    </span>
                </div>
                <div style="background:rgba(37,99,235,0.04); border-left:3px solid #2563eb; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.85rem; color: #1e3a8a; margin-bottom: 0.75rem;">
                    <strong style="display:block; margin-bottom:4px; color:#1d4ed8;"><i class="fas fa-sparkles"></i> AI Matching Insights:</strong>
                    <ul style="margin:0; padding-left:0; list-style:none;">
                        ${reasonsList}
                    </ul>
                </div>
                <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:0.4rem;"><strong>Benefits:</strong> ${match.benefits}</p>
                <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1rem;"><strong>Required Docs:</strong> ${match.documents_required.join(', ')}</p>
                <button class="btn-premium btn-primary-custom" style="padding:0.45rem 1.25rem; font-size:0.8rem; width:100%;" onclick="applyDirect('${match.scheme_name}')">
                    Start Application
                </button>
            `;
            listEl.appendChild(card);
        });
    } catch (e) {
        listEl.innerHTML = `<p style="color:#ef4444; padding:1rem;">Error: ${e.message}</p>`;
    }
}

// Speech TTS Reader for AI Matched Schemes
window.speakMatchedSchemes = function() {
    const matches = (currentUser && currentUser.last_matches) ? currentUser.last_matches : [];
    if (!matches || matches.length === 0) {
        alert('No matched schemes available to play audio. Please save profile details first.');
        return;
    }

    const currentLang = localStorage.getItem('agro_language') || 'Hindi';
    let schemeSpeechParts = [];

    if (currentLang === 'हिंदी' || currentLang === 'Hindi') {
        schemeSpeechParts.push('आपकी प्रोफ़ाइल के आधार पर पात्र योजनाएं हैं:');
        matches.forEach(m => {
            schemeSpeechParts.push(`${m.scheme_name} ${m.match_score} प्रतिशत मेल।`);
        });
    } else if (currentLang === 'मराठी') {
        schemeSpeechParts.push('तुमच्या प्रोफाईलनुसार पात्र योजना आहेत:');
        matches.forEach(m => {
            schemeSpeechParts.push(`${m.scheme_name} ${m.match_score} टक्के जुळणी.`);
        });
    } else if (currentLang === 'తెలుగు') {
        schemeSpeechParts.push('మీ ప్రొఫైల్ ఆధారంగా అనుకూలమైన పథకాలు:');
        matches.forEach(m => {
            schemeSpeechParts.push(`${m.scheme_name} ${m.match_score} శాతం మ్యాచింగ్.`);
        });
    } else {
        schemeSpeechParts.push('Based on your profile, the eligible matched schemes are:');
        matches.forEach(m => {
            schemeSpeechParts.push(`${m.scheme_name} with ${m.match_score} percent match.`);
        });
    }

    const textToSpeak = schemeSpeechParts.join(' ');
    if (typeof window.speakText === 'function') {
        window.speakText(textToSpeak, currentLang);
    }
};

function initDocumentVault() {
    const dropzone = document.getElementById('vault-upload-zone');
    const fileInput = document.getElementById('vault-file-input');
    const vaultList = document.getElementById('vault-list-container');
    if (!dropzone || !fileInput) return;

    // Dropzone drag-drop handlers
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleOcrUpload(files[0]);
        }
    });

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleOcrUpload(e.target.files[0]);
        }
    });

    async function handleOcrUpload(file) {
        const statusEl = document.getElementById('ocr-progress-status');
        if (statusEl) {
            statusEl.style.display = 'block';
            statusEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Running Layout Analysis and OCR extraction...`;
        }

        try {
            const data = await ApiService.analyzeDocument(file);
            
            if (statusEl) {
                statusEl.innerHTML = `<span style="color:#16a34a;"><i class="fas fa-check-circle"></i> Successfully scanned ${data.doc_type}! Auto-filling fields.</span>`;
            }

            // Auto fill profile inputs based on OCR fields
            if (data.fields) {
                if (data.fields.Name && document.getElementById('profile-name')) {
                    document.getElementById('profile-name').value = data.fields.Name;
                }
                if (data.fields['Total Area'] && document.getElementById('profile-land')) {
                    // Extract float from "2.5 Hectares" or similar
                    const size = parseFloat(data.fields['Total Area']);
                    if (!isNaN(size)) {
                        // 1 Hectare = 2.47 Acres
                        const sizeAcres = Math.round(size * 2.47 * 10) / 10;
                        document.getElementById('profile-land').value = sizeAcres;
                    }
                }
            }

            // Insert file card into vault interface list
            if (vaultList) {
                const vaultCard = document.createElement('div');
                vaultCard.className = 'glass-panel';
                vaultCard.style.padding = '1.25rem';
                vaultCard.style.borderRadius = '16px';
                vaultCard.style.textAlign = 'center';
                vaultCard.style.flex = '1';
                vaultCard.style.minWidth = '200px';
                vaultCard.innerHTML = `
                    <h1 style="font-size: 2.5rem; margin:0;">📄</h1>
                    <h4 style="margin:10px 0 5px 0; font-size:1rem;">${data.doc_type}</h4>
                    <span style="color: #16a34a; font-size:0.8rem; font-weight:600;"><i class="fas fa-check"></i> Verified ✅</span>
                `;
                
                // Remove empty state if any
                const empty = vaultList.querySelector('.empty-vault-state');
                if (empty) empty.style.display = 'none';
                
                vaultList.appendChild(vaultCard);
            }

        } catch (e) {
            if (statusEl) {
                statusEl.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-exclamation-triangle"></i> OCR failed: ${e.message}</span>`;
            }
        }
    }
}

// ----------------- PROFILE RESUME & REPORT AUTOMATION -----------------
function initResumePage() {
    const resumeContainer = document.getElementById('resume-view-container');
    if (!resumeContainer) return;

    // Render HTML preview of the farmer profile resume
    const cropsText = currentUser.crop_types ? currentUser.crop_types : 'None listed';
    const matchesCount = currentUser.last_matches ? currentUser.last_matches.length : 0;
    
    resumeContainer.innerHTML = `
        <div class="glass-panel" style="padding: 2.5rem; border-radius: 20px; box-shadow: var(--card-shadow); background:#ffffff;">
            <!-- Resume Header -->
            <div style="border-bottom: 2px solid var(--border-color); padding-bottom: 1.5rem; margin-bottom: 2rem; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h2 style="font-size:2rem; margin-bottom:5px; color:#2563eb;">${currentUser.name}</h2>
                    <p style="color:var(--text-secondary); margin:0;"><i class="fas fa-phone-alt"></i> Mobile: ${currentUser.phone_number} | <i class="fas fa-map-marker-alt"></i> Location: ${currentUser.state}, India</p>
                </div>
                <div style="text-align:right;">
                    <span style="font-weight:700; color:#2563eb; border:1px solid rgba(37,99,235,0.2); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem; background:rgba(37,99,235,0.04);">
                        Farmer Profile Credentials
                    </span>
                </div>
            </div>

            <!-- Grid details -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom: 2rem;">
                <div>
                    <h3 style="font-size:1.2rem; border-left:3px solid #2563eb; padding-left:10px; margin-bottom:1rem;">🚜 Land Holding Details</h3>
                    <p style="margin-bottom:6px;"><strong>Total Area:</strong> ${currentUser.land_size_acres} Acres</p>
                    <p style="margin-bottom:6px;"><strong>Soil Type:</strong> ${currentUser.land_type || 'Arable'}</p>
                    <p style="margin-bottom:6px;"><strong>Irrigation Setup:</strong> ${currentUser.irrigation_status || 'Rainfed'}</p>
                </div>
                <div>
                    <h3 style="font-size:1.2rem; border-left:3px solid #2563eb; padding-left:10px; margin-bottom:1rem;">🌾 Crops Cultivated</h3>
                    <p style="margin-bottom:6px;"><strong>Current Season:</strong> ${cropsText}</p>
                    <p style="margin-bottom:6px;"><strong>Linked Subsidies Found:</strong> ${matchesCount} Eligible Schemes</p>
                </div>
            </div>

            <!-- Recommendation Detail -->
            ${currentUser.last_crop_rec ? `
                <div style="background:rgba(34,197,94,0.03); border:1px solid rgba(34,197,94,0.15); padding:1.25rem; border-radius:12px; margin-bottom:2rem;">
                    <h4 style="color:#16a34a; margin-top:0; margin-bottom:6px;"><i class="fas fa-seedling"></i> AI Advisor Crop Recommendation</h4>
                    <p style="margin-bottom:4px; font-size:0.95rem;"><strong>Recommended Crop:</strong> ${currentUser.last_crop_rec.recommended_crop}</p>
                    <p style="margin:0; font-size:0.9rem; color:var(--text-secondary);">${currentUser.last_crop_rec.reasoning}</p>
                </div>
            ` : ''}

            <!-- Verification list -->
            <h3 style="font-size:1.2rem; border-left:3px solid #2563eb; padding-left:10px; margin-bottom:1rem;">📋 Document Verification status</h3>
            <div style="display:flex; gap:10px; margin-bottom:2rem; flex-wrap:wrap;">
                <span class="app-status-badge app-status-approved"><i class="fas fa-check"></i> Aadhaar ID Verified</span>
                <span class="app-status-badge app-status-approved"><i class="fas fa-check"></i> Land Records Verified</span>
            </div>
        </div>
    `;

    // Hook up Report Automation Button
    const runBtn = document.getElementById('run-workflow-btn');
    const workflowTimeline = document.getElementById('automation-timeline-wrapper');
    const dlBtn = document.getElementById('download-pdf-report-btn');

    if (runBtn) {
        runBtn.addEventListener('click', async () => {
            if (!currentUser.last_matches || currentUser.last_matches.length === 0) {
                alert('No matching schemes found. Please save your profile with land details first to find suitable matches.');
                return;
            }

            // Show timeline progress
            runBtn.disabled = true;
            runBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Triggering Workflow...`;
            if (workflowTimeline) workflowTimeline.style.display = 'block';

            // Custom Timeline stepping animations
            const steps = document.querySelectorAll('.timeline-step');
            
            // Step 1: Start
            steps[0].classList.add('active');
            
            try {
                const activeLang = localStorage.getItem('agro_language') || 'English';
                const result = await ApiService.runAutomation(currentUser, currentUser.last_matches, currentUser.last_crop_rec, activeLang);
                
                // Step 1 done
                steps[0].classList.remove('active');
                steps[0].classList.add('complete');
                
                // Step 2: PDF report done
                steps[1].classList.add('complete');
                
                // Step 3: Whatsapp notify
                steps[2].classList.add('active');
                setTimeout(() => {
                    steps[2].classList.remove('active');
                    steps[2].classList.add('complete');
                }, 1500);

                setTimeout(() => {
                    // Show download button
                    if (dlBtn) {
                        const downloadUrl = ApiService.getReportDownloadUrl(result.filename);
                        dlBtn.href = downloadUrl;
                        dlBtn.style.display = 'block';
                    }
                    
                    runBtn.innerHTML = `<i class="fas fa-check-circle"></i> Workflow Finished`;
                }, 2000);

            } catch (e) {
                alert('Workflow execution error: ' + e.message);
                runBtn.disabled = false;
                runBtn.innerHTML = `<i class="fas fa-bolt"></i> Run Automation Workflow`;
            }
        });
    }
}

// ----------------- ADVISOR CHATBOT -----------------
function initChatbotPage() {
    const chatBox = document.getElementById('chat-messages-box');
    const textInput = document.getElementById('chat-text-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const micBtn = document.getElementById('chat-mic-btn');
    const langSelect = document.getElementById('global-lang-select') || document.getElementById('chat-speech-lang-select');

    if (!chatBox || !textInput || !sendBtn) return;

    // Send Message Trigger
    sendBtn.addEventListener('click', () => handleUserSend());
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleUserSend();
        }
    });

    async function handleUserSend() {
        const text = textInput.value.trim();
        if (!text) return;

        // Clear input field
        textInput.value = '';

        // Append User bubble
        appendBubble(text, 'user');
        chatBox.scrollTop = chatBox.scrollHeight;

        // Typing placeholder
        const typingId = appendTypingIndicator();
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const res = await ApiService.sendChatMessage(text);
            removeTypingIndicator(typingId);

            // Append Advisor reply
            const botResponse = res.response;
            appendBubble(botResponse, 'bot');
            chatBox.scrollTop = chatBox.scrollHeight;

            // Trigger TTS narration for response if user prefers
            const speechLang = langSelect ? langSelect.value : 'English';
            playBotSpeech(botResponse, speechLang);

        } catch (e) {
            removeTypingIndicator(typingId);
            appendBubble('I apologize, but my connection is offline right now. Details: ' + e.message, 'bot');
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    function appendBubble(content, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble chat-bubble-${sender}`;
        
        if (sender === 'bot') {
            bubble.innerHTML = `<strong>🤖 AI Advisor:</strong><br>${content}`;
            
            // Add custom mini TTS button inside the bubble
            const ttsBtn = document.createElement('button');
            ttsBtn.style.background = 'none';
            ttsBtn.style.border = 'none';
            ttsBtn.style.color = '#7c3aed';
            ttsBtn.style.cursor = 'pointer';
            ttsBtn.style.fontSize = '0.8rem';
            ttsBtn.style.marginTop = '6px';
            ttsBtn.style.display = 'block';
            ttsBtn.innerHTML = `<i class="fas fa-volume-up"></i> Repeat Audio`;
            ttsBtn.addEventListener('click', () => {
                const speechLang = langSelect ? langSelect.value : 'English';
                playBotSpeech(content, speechLang);
            });
            bubble.appendChild(ttsBtn);
        } else {
            bubble.textContent = content;
        }
        
        chatBox.appendChild(bubble);
    }

    function appendTypingIndicator() {
        const id = 'typing-' + Date.now();
        const indicator = document.createElement('div');
        indicator.id = id;
        indicator.className = 'chat-bubble chat-bubble-bot';
        indicator.innerHTML = `<strong>🤖 Advisor:</strong><br><i class="fas fa-circle-notch fa-spin"></i> Analyzing query...`;
        chatBox.appendChild(indicator);
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function playBotSpeech(text, lang) {
        try {
            // Clean markdown bold syntax, bullet points, emojis
            const cleanText = text.replace(/[*#_`~]|🌾|🤖|🌱|💰/g, '').trim();
            const targetLang = lang || (langSelect ? langSelect.value : null) || localStorage.getItem('agro_language') || 'Hindi';
            if (typeof window.speakText === 'function') {
                window.speakText(cleanText, targetLang);
            }
        } catch (e) {
            console.error('Speech narration error:', e);
        }
    }

    // Voice recognition for chatbot
    if (micBtn) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            micBtn.style.display = 'none';
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let isRecording = false;

        const VOICE_GREETINGS = {
            'English': 'How can I help you with your agricultural query?',
            'Hindi': 'मैं आपकी कृषि संबंधी प्रश्नों में कैसे मदद कर सकता हूं?',
            'हिंदी': 'मैं आपकी कृषि संबंधी प्रश्नों में कैसे मदद कर सकता हूं?',
            'Marathi': 'मी तुम्हाला शेतीविषयक प्रश्नांमध्ये कशी मदत करू शकतो?',
            'मराठी': 'मी तुम्हाला शेतीविषयक प्रश्नांमध्ये कशी मदत करू शकतो?',
            'Telugu': 'వ్యవసాయ సంబంధిత ప్రశ్నలలో నేను మీకు ఎలా సహాయపడగలను?',
            'తెలుగు': 'వ్యవసాయ సంబంధిత ప్రశ్నలలో నేను మీకు ఎలా సహాయపడగలను?',
            'Malayalam': 'കാർഷിക സംശയങ്ങളിൽ ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
            'മലയാളം': 'കാർഷിക സംശയങ്ങളിൽ ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
            'Punjabi': 'ਮੈਂ ਖੇਤੀਬਾੜੀ ਸਬੰਧੀ ਪ੍ਰਸ਼ਨਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
            'ਪੰਜਾਬੀ': 'ਮੈਂ ਖੇਤੀਬਾੜੀ ਸਬੰਧੀ ਪ੍ਰਸ਼ਨਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
            'Gujarati': 'હું તમને ખેતી સંબંધિત પ્રશ્નોમાં કેવી રીતે મદદ કરી શકું?',
            'ગુજરાતી': 'હું તમને ખેતી સંબંધિત પ્રશ્નોમાં કેવી રીતે મદદ કરી શકું?'
        };

        const REC_LANG_CODES = {
            'English': 'en-IN',
            'Hindi': 'hi-IN', 'हिंदी': 'hi-IN',
            'Marathi': 'mr-IN', 'मराठी': 'mr-IN',
            'Telugu': 'te-IN', 'తెలుగు': 'te-IN',
            'Malayalam': 'ml-IN', 'മലയാളം': 'ml-IN',
            'Punjabi': 'pa-IN', 'ਪੰਜਾਬੀ': 'pa-IN',
            'Gujarati': 'gu-IN', 'ગુજરાતી': 'gu-IN'
        };

        micBtn.addEventListener('click', () => {
            if (isRecording) {
                if (window.currentAudioObj) { try { window.currentAudioObj.pause(); } catch(e) {} }
                if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch(e) {} }
                try { recognition.stop(); } catch(e) {}
                isRecording = false;
                micBtn.classList.remove('recording');
                micBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
                textInput.placeholder = "Type your question here...";
                return;
            }

            // Stop any ongoing speech narration so mic isn't confused
            if (window.currentAudioObj) { try { window.currentAudioObj.pause(); window.currentAudioObj = null; } catch(e) {} }
            if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch(e) {} }

            const activeLang = (langSelect ? langSelect.value : null) || localStorage.getItem('agro_language') || 'Hindi';
            const langCode = REC_LANG_CODES[activeLang] || 'hi-IN';
            
            recognition.lang = langCode;
            isRecording = true;
            micBtn.classList.add('recording');
            micBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            textInput.placeholder = "🎤 Listening... Speak your question now!";

            try {
                recognition.start();
            } catch(err) {
                console.warn('Recognition start error:', err);
                isRecording = false;
                micBtn.classList.remove('recording');
                micBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
                textInput.placeholder = "Type your question here...";
            }
        });

        recognition.onstart = () => {
            isRecording = true;
            micBtn.classList.add('recording');
            micBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            textInput.placeholder = "🎤 Listening... Speak your question now!";
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0] && e.results[0][0].transcript ? e.results[0][0].transcript.trim() : '';
            if (transcript.length > 2) {
                textInput.value = transcript;
                handleUserSend();
            }
        };

        recognition.onend = () => {
            isRecording = false;
            micBtn.classList.remove('recording');
            micBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
            textInput.placeholder = "Type your question here...";
        };

        recognition.onerror = (err) => {
            console.error('Bot voice error:', err.error);
            isRecording = false;
            micBtn.classList.remove('recording');
            micBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        };
    }
}
