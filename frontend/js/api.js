// API Configurations
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
    ? 'http://localhost:8000' 
    : 'https://agrovision-ai-powered-farming-platform-4.onrender.com';

// Session Management
const SessionManager = {
    setCurrentUser(user) {
        localStorage.setItem('agro_user', JSON.stringify(user));
    },

    getCurrentUser() {
        try {
            const user = localStorage.getItem('agro_user');
            return user ? JSON.parse(user) : null;
        } catch (e) {
            console.error('Error parsing user session:', e);
            localStorage.removeItem('agro_user');
            return null;
        }
    },

    logout() {
        localStorage.removeItem('agro_user');
        window.location.href = 'login.html';
    },

    requireAuth() {
        let user = this.getCurrentUser();
        if (!user) {
            user = {
                id: 999,
                name: "Guest Farmer",
                phone_number: "9999999999",
                state: "Maharashtra",
                land_size_acres: 2.5,
                crop_types: "Wheat, Paddy"
            };
            this.setCurrentUser(user);
        }
        return user;
    }
};

// API Services
const ApiService = {
    async checkHealth() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                return data.status === 'healthy';
            }
        } catch (e) {
            console.error('Backend offline:', e);
        }
        return false;
    },

    async getAllSchemes() {
        try {
            const response = await fetch(`${API_BASE_URL}/schemes`);
            if (response.ok) return await response.json();
        } catch (e) {
            console.error('Error fetching schemes:', e);
        }
        return [];
    },

    async matchSchemes(profile) {
        const response = await fetch(`${API_BASE_URL}/eligibility/match`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async analyzeDocument(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/documents/analyze`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async sendChatMessage(messageText) {
        const currentLang = localStorage.getItem('agro_language') || 'English';
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: messageText, language: currentLang })
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async registerUser(profile) {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async getUserByPhone(phoneNumber) {
        const response = await fetch(`${API_BASE_URL}/users/phone/${phoneNumber}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(await response.text());
        }
        return await response.json();
    },

    async createApplication(userId, schemeName) {
        const payload = {
            user_id: parseInt(userId),
            scheme_name: schemeName,
            status: 'Pending',
            applied_date: new Date().toISOString().split('T')[0]
        };
        const response = await fetch(`${API_BASE_URL}/applications/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async getUserApplications(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/applications`);
            if (response.ok) return await response.json();
        } catch (e) {
            console.error('Error fetching applications:', e);
        }
        return [];
    },

    async predictBenefits(landSize, investment, crop) {
        const response = await fetch(`${API_BASE_URL}/predict/benefits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                land_size: parseFloat(landSize),
                investment: parseFloat(investment),
                crop: crop
            })
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async fetchWeatherData(lat, lon, city = null) {
        let url = `${API_BASE_URL}/weather/fetch?`;
        if (city) {
            url += `city=${encodeURIComponent(city)}`;
        } else {
            url += `lat=${lat}&lon=${lon}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async predictCrop(n, p, k, temp, hum, ph, rain, soil, water, season, landSize, prevCrop, weatherInfo, lang = "English") {
        const response = await fetch(`${API_BASE_URL}/predict/crop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nitrogen: parseInt(n),
                phosphorus: parseInt(p),
                potassium: parseInt(k),
                temperature: parseFloat(temp),
                humidity: parseFloat(hum),
                ph: parseFloat(ph),
                rainfall: parseInt(rain),
                soil_type: soil,
                water_availability: water,
                season: season,
                land_size: parseFloat(landSize),
                previous_crop: prevCrop,
                weather_info: weatherInfo,
                language: lang
            })
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    async getTTSAudioUrl(text, language) {
        const response = await fetch(`${API_BASE_URL}/speech/narrate?text=${encodeURIComponent(text)}&language=${encodeURIComponent(language)}`);
        if (!response.ok) throw new Error('Speech generation failed.');
        const audioBlob = await response.blob();
        return URL.createObjectURL(audioBlob);
    },

    async getSeasonalAlerts() {
        try {
            const response = await fetch(`${API_BASE_URL}/alerts/seasonal`);
            if (response.ok) return await response.json();
        } catch (e) {
            console.error('Error fetching alerts:', e);
        }
        return [];
    },

    async runAutomation(farmerData, schemes, cropRec = null, language = "English") {
        const payload = {
            farmer_data: farmerData,
            schemes: schemes,
            crop_recommendations: cropRec || {
                recommended_crop: 'Suggested based on profile',
                reasoning: 'Matching schemes found for your specific land and crop types.'
            },
            language: language || localStorage.getItem('agro_language') || "English"
        };
        const response = await fetch(`${API_BASE_URL}/automation/run-workflow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

    getReportDownloadUrl(filename) {
        return `${API_BASE_URL}/automation/download-report/${filename}`;
    }
};
