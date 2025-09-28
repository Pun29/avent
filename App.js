import React, { useState, useEffect, useMemo } from 'react';

// --- MOCK EVENT DATA & THEMES ---
// Comment: Colors for different student clubs are defined here.
const clubColors = {
    'default': { primary: '#D92E34', secondary: '#2C3A5A', accent: '#FCCA3C', textOnPrimary: '#FFFFFF' }, // Theme from Avent Logo
    'Sun Devil Athletics': { primary: '#8C1D40', secondary: '#000000', accent: '#FFC627', textOnPrimary: '#FFFFFF' },
    'School of ECEE': { primary: '#00A8C5', secondary: '#333333', accent: '#C0E100', textOnPrimary: '#FFFFFF' },
    'ASU Entrepreneurship': { primary: '#FF7F32', secondary: '#4A4A4A', accent: '#FFFFFF', textOnPrimary: '#000000' },
    'GreenLight ASU': { primary: '#2E8540', secondary: '#FFFFFF', accent: '#8C1D40', textOnPrimary: '#FFFFFF' },
    'Devils in Training': { primary: '#00F5A0', secondary: '#1D1D1D', accent: '#00D68F', textOnPrimary: '#000000' },
    'Music & Arts Club': { primary: '#F02FC2', secondary: '#2C003E', accent: '#FFEE00', textOnPrimary: '#FFFFFF' },
    'Women in Computer Science': { primary: '#6f42c1', secondary: '#212529', accent: '#e83e8c', textOnPrimary: '#FFFFFF' },
    'Indian Students Association': { primary: '#FF9933', secondary: '#138808', accent: '#FFFFFF', textOnPrimary: '#000000' },
    'Google DSC ASU': { primary: '#4285F4', secondary: '#34A853', accent: '#FBBC05', textOnPrimary: '#FFFFFF' },
    'International Students and Scholars Center': { primary: '#8C1D40', secondary: '#000000', accent: '#FFC627', textOnPrimary: '#FFFFFF' },
    'Programming and Activities Board': { primary: '#00A3E0', secondary: '#2B2B2B', accent: '#FFD100', textOnPrimary: '#FFFFFF' },
    'Barrett, The Honors College': { primary: '#8C1D40', secondary: '#FFC627', accent: '#000000', textOnPrimary: '#FFFFFF' },
    'ASU Gaming Club': { primary: '#7D26CD', secondary: '#1A1A1A', accent: '#39FF14', textOnPrimary: '#FFFFFF' },
    'Cinephile Society': { primary: '#000000', secondary: '#333333', accent: '#D4AF37', textOnPrimary: '#FFFFFF' },
    'Robotics Club': { primary: '#007BFF', secondary: '#454545', accent: '#C0C0C0', textOnPrimary: '#FFFFFF' },
    'Future Business Leaders': { primary: '#001f3f', secondary: '#F5F5F5', accent: '#0074D9', textOnPrimary: '#FFFFFF' },
    'Cultural Exchange Club': { primary: '#20B2AA', secondary: '#FF8C00', accent: '#FFFFFF', textOnPrimary: '#000000' },
};

// Comment: This is a list of different events happening on campus.
const mockEvents = [
    { id: 'evt1', title: 'ECEE Career Fair', date: 'OCT 05, 2025', location: 'Memorial Union (MU)', organizer: 'School of ECEE', description: 'Meet employers in the Electrical, Computer, and Energy Engineering fields.' },
    { id: 'evt2', title: 'ASU Football vs. Wildcats', date: 'OCT 11, 2025', location: 'Sun Devil Stadium', organizer: 'Sun Devil Athletics', description: 'Cheer on the Sun Devils in the classic territorial cup rivalry game.' },
    { id: 'evt3', title: 'Startup Summit 2025', date: 'OCT 18, 2025', location: 'SkySong Innovation Center', organizer: 'ASU Entrepreneurship', description: 'A full day of panels and networking with local entrepreneurs and venture capitalists.' },
    { id: 'evt4', title: 'Outdoor Movie Night: Sci-Fi Classics', date: 'OCT 22, 2025', location: 'Hayden Lawn', organizer: 'Programming and Activities Board', description: 'Enjoy a free movie screening under the stars with fellow students.' },
    { id: 'evt5', title: 'Tech Talk & Networking Night', date: 'NOV 02, 2025', location: 'Brickyard', organizer: 'Women in Computer Science', description: 'Connect with female leaders in tech and learn about their journey in the industry.' },
    { id: 'evt6', title: 'Diwali Night 2025', date: 'NOV 08, 2025', location: 'Student Pavilion', organizer: 'Indian Students Association', description: 'Celebrate the festival of lights with cultural performances, music, and delicious Indian food.' },
    { id: 'evt7', title: 'Cloud Study Jam with Google DSC', date: 'NOV 15, 2025', location: 'ISTB1', organizer: 'Google DSC ASU', description: 'Get hands-on experience with Google Cloud Platform in this interactive workshop.' },
    { id: 'evt8', title: 'Finals Breakfast', date: 'DEC 05, 2025', location: 'Barrett Dining Hall', organizer: 'Barrett, The Honors College', description: 'Fuel up for your final exams with a free pancake breakfast served by faculty.' },
    { id: 'evt9', title: 'Python Coding Challenge', date: 'OCT 29, 2025', location: 'BAC 116', organizer: 'Devils in Training', description: 'Test your Python skills and win prizes in our annual coding competition.' },
    { id: 'evt10', title: 'Guest Speaker: Solar Innovation', date: 'NOV 12, 2025', location: 'Wrigley Hall', organizer: 'GreenLight ASU', description: 'Join us for a talk from a leading innovator in solar power technology and policy.' },
    { id: 'evt11', title: 'Global Friends Meetup', date: 'OCT 10, 2025', location: 'Student Services Lawn', organizer: 'International Students and Scholars Center', description: 'A casual get-together for international and domestic students to make new friends.' },
    { id: 'evt12', title: 'Annual Hackathon: AI for Good', date: 'NOV 22, 2025', location: 'Tooker House', organizer: 'Robotics Club', description: 'A 24-hour challenge to build innovative robotics and AI solutions for social problems.' },
    { id: 'evt13', title: 'Fall Film Festival Showcase', date: 'OCT 25, 2025', location: 'ASU Gammage', organizer: 'Cinephile Society', description: 'A showcase of short films created by talented ASU students. Red carpet event!' },
    { id: 'evt14', title: 'Esports Tournament: Valorant', date: 'NOV 01, 2025', location: 'Sun Devil Fitness Complex', organizer: 'ASU Gaming Club', description: 'Compete with the best Valorant players on campus for glory and prizes.' },
    { id: 'evt15', title: 'International Food Fair', date: 'NOV 05, 2025', location: 'Hayden Lawn', organizer: 'Cultural Exchange Club', description: 'Taste authentic dishes from around the world, prepared by our international student community.' },
    { id: 'evt16', title: 'Business Case Competition', date: 'OCT 15, 2025', location: 'W. P. Carey School of Business', organizer: 'Future Business Leaders', description: 'Solve a real-world business problem and present your solution to a panel of industry judges.' },
];


// --- MAIN APP COMPONENT ---
export default function App() {
    // --- STATE MANAGEMENT ---
    const [phase, setPhase] = useState('discovery'); // 'discovery', 'learning', 'personalized'
    const [selectedEvents, setSelectedEvents] = useState({});
    const [userProfile, setUserProfile] = useState('');
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentTheme, setCurrentTheme] = useState(clubColors.default);
    const [icebreakers, setIcebreakers] = useState({});
    const [isGeneratingIcebreakers, setIsGeneratingIcebreakers] = useState(null);
    const [dayPlan, setDayPlan] = useState('');
    const [isPlanningDay, setIsPlanningDay] = useState(false);

    const selectedCount = useMemo(() => Object.keys(selectedEvents).length, [selectedEvents]);

    // NEW: Effect to update CSS variables for dynamic theme
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', currentTheme.primary);
        root.style.setProperty('--secondary-color', currentTheme.secondary);
        root.style.setProperty('--accent-color', currentTheme.accent);
    }, [currentTheme]);


    // --- HELPER FUNCTIONS ---
    const toggleEventSelection = (eventId) => {
        setSelectedEvents(prev => {
            const newSelection = { ...prev };
            if (newSelection[eventId]) {
                delete newSelection[eventId];
            } else {
                newSelection[eventId] = true;
            }
            return newSelection;
        });
    };
    
    // --- AI LOGIC (GEMINI API CALLS) ---
    const handlePreferenceAnalysis = async () => {
        if (selectedCount < 2) {
            setError('Please select at least 2 events to help us learn your preferences.');
            return;
        }
        setError('');
        setIsLoading(true);
        setPhase('learning');

        const chosenEvents = mockEvents.filter(event => selectedEvents[event.id]);
        
        const organizerCounts = chosenEvents.reduce((acc, event) => {
            acc[event.organizer] = (acc[event.organizer] || 0) + 1;
            return acc;
        }, {});
        const dominantOrganizer = Object.keys(organizerCounts).reduce((a, b) => organizerCounts[a] > organizerCounts[b] ? a : b, '');
        setCurrentTheme(clubColors[dominantOrganizer] || clubColors.default);

        const eventDescriptions = chosenEvents.map(e => `- ${e.title} (hosted by ${e.organizer}): ${e.description}`).join('\n');
        
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        try {
            const profilePrompt = `An ASU student has shown interest in the following events:\n${eventDescriptions}\n\nBased on this, create a very short, single-sentence profile describing their interests. Example: "This student enjoys technology, career networking, and social events."`;
            
            const profilePayload = { contents: [{ parts: [{ text: profilePrompt }] }] };
            const profileResponse = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profilePayload) });
            if (!profileResponse.ok) throw new Error(`API Error: ${profileResponse.statusText}`);
            const profileResult = await profileResponse.json();
            const generatedProfile = profileResult.candidates?.[0]?.content?.parts?.[0]?.text || "No profile generated.";
            setUserProfile(generatedProfile);

            const allEventTitles = JSON.stringify(mockEvents.map(e => ({id: e.id, title: e.title, description: e.description, organizer: e.organizer})));
            const recommendationPrompt = `Given a student with the interest profile: "${generatedProfile}"\n\nAnd a list of available events: ${allEventTitles}\n\nReturn a JSON array of event IDs that this student would most likely be interested in. Do not include events they have already selected. Only return the JSON array.`;
            
            const recoPayload = { contents: [{ parts: [{ text: recommendationPrompt }] }], generationConfig: { responseMimeType: "application/json" } };
            const recoResponse = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recoPayload) });
            if (!recoResponse.ok) throw new Error(`API Error: ${recoResponse.statusText}`);
            const recoResult = await recoResponse.json();
            const recommendedIdsText = recoResult.candidates?.[0]?.content?.parts?.[0]?.text;

            if (recommendedIdsText) {
                const recommendedIds = JSON.parse(recommendedIdsText);
                 // ERROR FIX: Ensure the parsed response is an array before using it
                if (Array.isArray(recommendedIds)) {
                    const filteredEvents = mockEvents.filter(event => recommendedIds.includes(event.id) && !selectedEvents[event.id]);
                    setRecommendedEvents(filteredEvents);
                } else {
                     console.error("API did not return an array for recommendations:", recommendedIds);
                     setError('AI generated an invalid response for recommendations.');
                }
            }
            
            setPhase('personalized');

        } catch (err) {
            console.error(err);
            setError('Could not analyze preferences. Please try again.');
            setPhase('discovery');
            setCurrentTheme(clubColors.default);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateIcebreakers = async (eventId) => {
        setIsGeneratingIcebreakers(eventId);
        setError('');
        const event = mockEvents.find(e => e.id === eventId);
        if (!event) return;
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        try {
            const prompt = `A student with the interest profile "${userProfile}" is attending the following event: "${event.title} - ${event.description}". Generate 3 short, fun, and relevant conversation starters for this student to use to meet new people at the event. Return the result as a JSON array of strings. Example: ["What's the coolest project you've seen here?", "Did you hear the opening speaker? What did you think?"]`;
            const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            const result = await response.json();
            const icebreakersText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (icebreakersText) {
                const generatedIcebreakers = JSON.parse(icebreakersText);
                // ERROR FIX: Ensure the parsed response is an array before setting state
                if(Array.isArray(generatedIcebreakers)) {
                    setIcebreakers(prev => ({ ...prev, [eventId]: generatedIcebreakers }));
                } else {
                    console.error("API did not return an array for icebreakers:", generatedIcebreakers);
                    setError('AI generated an invalid response for icebreakers.');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Could not generate icebreakers. Please try again.');
        } finally {
            setIsGeneratingIcebreakers(null);
        }
    };

    const handlePlanMyDay = async () => {
        setIsPlanningDay(true);
        setDayPlan('');
        setError('');
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        try {
            const recommendedEventsText = recommendedEvents.map(e => `- ${e.title} at ${e.location}`).join('\n');
            const prompt = `I am an ASU student with this interest profile: "${userProfile}". My recommended events are:\n${recommendedEventsText}\n\nPlease create a fun, realistic, and brief daily schedule for me. Pick one of the recommended events and build the schedule around it. Include suggestions for on-campus study spots (like Hayden Library or Noble Library) and places to eat (like the Memorial Union or a local spot on Mill Avenue). Format the response as a simple timeline. Example: "Morning: Grab a coffee and study at Hayden Library...\nAfternoon: Head to the Memorial Union for lunch...\nEvening: Attend the [Event Name]..."`;
            
            const payload = { contents: [{ parts: [{ text: prompt }] }] };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            const result = await response.json();
            const plan = result.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate a plan. Please try again.";
            setDayPlan(plan);
        } catch (err) {
            console.error(err);
            setError('Could not generate a daily plan. Please try again.');
        } finally {
            setIsPlanningDay(false);
        }
    };

    // --- UI COMPONENTS ---
    const EventCard = ({ event, isSelected, onSelect, onGenerateIcebreakers, generatedIcebreakers, isGeneratingIcebreakers }) => (
        <div className={`bg-[var(--secondary-color)]/80 text-white backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col justify-between border-2 ${isSelected ? 'scale-105' : ''}`} style={{ borderColor: isSelected ? 'var(--accent-color)' : 'transparent', boxShadow: `0 10px 15px -3px ${currentTheme.secondary}33` }}>
            <div className="p-6">
                 <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xs font-bold uppercase text-white inline-block px-2 py-1 rounded-full mb-2" style={{backgroundColor: currentTheme.primary}}>{event.organizer}</div>
                        <div className="uppercase tracking-wide text-sm font-semibold mt-1" style={{color: currentTheme.primary}}>{event.date}</div>
                        <h3 className="block mt-1 text-lg leading-tight font-bold text-white">{event.title}</h3>
                        <p className="mt-2 text-gray-300 text-sm">{event.location}</p>
                    </div>
                    <div style={{ color: currentTheme.accent }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                </div>
                <p className="mt-4 text-gray-400">{event.description}</p>
                {onGenerateIcebreakers && (
                    <div className="mt-4 pt-4 border-t border-gray-200/20">
                        {isGeneratingIcebreakers ? (
                            <div className="text-center p-2"><div className="animate-spin rounded-full h-6 w-6 border-b-2" style={{borderColor: currentTheme.primary}}></div></div>
                        ) : !generatedIcebreakers ? (
                             <button onClick={() => onGenerateIcebreakers(event.id)} className="w-full text-sm font-bold py-2 px-4 rounded-lg transition-colors" style={{ backgroundColor: currentTheme.primary, color: currentTheme.textOnPrimary }}>✨ Generate Icebreakers</button>
                        ) : (
                            <div className="space-y-2 text-left">
                                <h4 className="font-bold text-sm" style={{color: 'var(--accent-color)'}}>Conversation Starters:</h4>
                                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                                    {generatedIcebreakers.map((ib, index) => <li key={index}>{ib}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {onSelect && (
                <div className="p-6 pt-0">
                    <button onClick={() => onSelect(event.id)} className={`w-full font-bold py-2 px-4 rounded-lg transition-colors`} style={{ backgroundColor: isSelected ? currentTheme.accent : 'rgba(0,0,0,0.2)', color: isSelected ? (currentTheme.primary === '#FFFFFF' ? '#000000' : currentTheme.secondary) : 'white' }}>
                        {isSelected ? 'Selected!' : 'I\'m Interested'}
                    </button>
                </div>
            )}
        </div>
    );

    const Header = () => (
        <header className="p-6 transition-colors duration-500 relative overflow-hidden" style={{ backgroundColor: 'var(--secondary-color)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10 flex justify-center items-center gap-4 mb-4">
                <img src="asparky.jpg" alt="Avent Logo" className="h-20 w-auto rounded-full logo-glow" />
                <h1 className="text-5xl font-bold attractive-heading">Avent</h1>
            </div>
            {phase === 'discovery' && <p className="relative z-10 mt-2 text-lg text-gray-300 text-center">Welcome! Select a few events you're interested in to get personalized recommendations.</p>}
            {phase === 'personalized' && (
                <div className="text-center relative z-10">
                    <p className="mt-2 text-lg text-center" style={{color: 'var(--accent-color)'}}>Here are events recommended just for you.</p>
                    <button onClick={handlePlanMyDay} disabled={isPlanningDay || recommendedEvents.length === 0} className="mt-4 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100" style={{ backgroundColor: 'var(--primary-color)', color: currentTheme.textOnPrimary }}>
                        {isPlanningDay ? 'Planning...' : '✨ Plan My Day with AI'}
                    </button>
                </div>
            )}
        </header>
    );

    // --- RENDER LOGIC ---
    return (
        <>
            <style>{`
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient-bg {
                    background: linear-gradient(-45deg, var(--primary-color), var(--secondary-color), var(--accent-color));
                    background-size: 400% 400%;
                    animation: gradient-animation 15s ease infinite;
                    transition: background 0.5s ease;
                }
                .attractive-heading {
                    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
                }
                .logo-glow {
                    filter: drop-shadow(0 0 10px var(--accent-color));
                    transition: filter 0.3s ease-in-out;
                }
                .logo-glow:hover {
                    filter: drop-shadow(0 0 20px var(--accent-color));
                }
            `}</style>
            <div className="min-h-screen font-sans animated-gradient-bg">
                <div className="bg-black/30 backdrop-blur-sm min-h-screen">
                    <Header />
                    <main className="container mx-auto p-4 md:p-8">
                        {error && <div className="bg-red-800/80 border border-red-500 text-white px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</div>}
                        {isLoading && (
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto" style={{borderColor: currentTheme.primary}}></div>
                                <p className="mt-4 text-xl font-semibold text-white">The AI is learning your preferences...</p>
                            </div>
                        )}
                        {phase === 'discovery' && !isLoading && (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mockEvents.map(event => (<EventCard key={event.id} event={event} isSelected={!!selectedEvents[event.id]} onSelect={toggleEventSelection} />))}
                                </div>
                                <div className="mt-8 text-center">
                                    <button onClick={handlePreferenceAnalysis} disabled={selectedCount < 2} className="text-white font-bold text-xl py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100" style={{ backgroundColor: 'var(--primary-color)', color: currentTheme.textOnPrimary }}>
                                        Analyze My Preferences ({selectedCount})
                                    </button>
                                </div>
                            </>
                        )}
                        {phase === 'personalized' && !isLoading && (
                            <div className="space-y-8">
                                {dayPlan && (
                                    <div className="bg-[var(--secondary-color)]/70 backdrop-blur-md p-6 rounded-xl shadow-lg" style={{borderLeft: `5px solid var(--primary-color)`}}>
                                        <h2 className="text-2xl font-bold text-white">✨ Your AI-Powered Daily Plan:</h2>
                                        <p className="mt-2 text-gray-300 whitespace-pre-wrap">{dayPlan}</p>
                                </div>
                                )}
                                <div className="bg-[var(--secondary-color)]/70 backdrop-blur-md p-6 rounded-xl shadow-lg" style={{borderLeft: `5px solid var(--primary-color)`}}>
                                    <h2 className="text-2xl font-bold text-white">Your AI-Generated Profile:</h2>
                                    <p className="mt-2 text-lg text-gray-300 italic">"{userProfile}"</p>
                                </div>
                                <div className="p-4 rounded-xl shadow-lg flex items-center" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--accent-color)'}}>
                                    <span className="text-2xl">💡</span>
                                    <p className="ml-4 font-semibold"><strong>Tired of checking Instagram?</strong> This app will send you notifications for recommended events, so you never miss out.</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-4 text-white" style={{textShadow: `2px 2px 4px ${currentTheme.secondary}`}}>{'✨ Recommended For You'}</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {recommendedEvents.length > 0 ? recommendedEvents.map(event => (
                                            <EventCard key={event.id} event={event} onGenerateIcebreakers={handleGenerateIcebreakers} generatedIcebreakers={icebreakers[event.id]} isGeneratingIcebreakers={isGeneratingIcebreakers === event.id} />
                                        )) : <p className="text-white bg-[var(--secondary-color)]/70 p-4 rounded-lg col-span-full">No new recommendations right now. Check back later!</p>}
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/30">
                                    <h3 className="text-3xl font-bold mb-4 text-white" style={{textShadow: `2px 2px 4px ${currentTheme.secondary}`}}>All Other Events</h3>
                                    <div className="grid md:grid-cols-2 lg-grid-cols-3 gap-6">
                                        {mockEvents.filter(e => !recommendedEvents.find(re => re.id === e.id)).map(event => (
                                            <EventCard key={event.id} event={event} isSelected={!!selectedEvents[event.id]} onSelect={toggleEventSelection} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}

