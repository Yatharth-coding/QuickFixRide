const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Handle chat messages
// @route   POST /api/chat
// @access  Public (rate-limited in server.js)
exports.handleChat = async (req, res, next) => {
    try {
        const { message } = req.body;

        // Input validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        // Message length limit
        if (message.length > 1000) {
            return res.status(400).json({ success: false, error: 'Message too long. Maximum 1000 characters.' });
        }

        // Check if Gemini API key is configured
        if (!process.env.GEMINI_API_KEY) {
            console.warn('GEMINI_API_KEY not configured, using fallback responses');
            return res.status(200).json({ reply: getFallbackReply(message) });
        }

        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
            const model = genAI.getGenerativeModel({ model: modelName });

            const systemPrompt = 'You are a helpful AI assistant for a car servicing and ride-booking company named Car Care Connect. Be polite, keep answers concise (under 200 words), and only answer questions related to automotive services, ride booking, and vehicle maintenance. All prices are in Indian Rupees (₹). If asked about unrelated topics, politely redirect. User says: ';

            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('AI request timed out')), 350000)
            );

            const resultPromise = model.generateContent(systemPrompt + message);
            const result = await Promise.race([resultPromise, timeoutPromise]);
            const botReply = result.response.text() || "I couldn't process that.";

            res.status(200).json({ reply: botReply });
        } catch (apiError) {
            console.error('Gemini API Error:', apiError.message);
            // Return fallback with a clear indication that AI is unavailable
            res.status(200).json({
                reply: getFallbackReply(message),
                aiAvailable: false
            });
        }
    } catch (error) {
        next(error);
    }
};

function getFallbackReply(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || /\bhi\b/.test(lowerMessage)) {
        return 'Hello! How can I help you with your car care today?';
    } 
    
    // Booking
    else if (lowerMessage.includes('book')) {
        return 'You can book a ride, mechanic, or car wash from the Services menu at the top!';
    } 
    
    // Pricing general
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
        return 'Our pricing varies by service: Rides start at ₹50 base fare + ₹15/km, mechanic callouts are ₹499, and car wash packages start at ₹299.';
    } 
    
    // Car Wash
    else if (lowerMessage.includes('wash')) {
        return 'We offer three doorstep car wash packages: Basic (₹299), Premium (₹599), and Full Detailing (₹999). We bring the wash to your location!';
    } 
    
    // Ride Types (Economy vs Premium)
    else if (lowerMessage.includes('economy') || lowerMessage.includes('premium') || lowerMessage.includes('difference')) {
        return 'Our Economy rides offer budget-friendly travel in standard sedans or hatchbacks. Premium rides provide luxury vehicles with extra legroom, professional drivers, and complimentary water.';
    } 
    
    // Overheating
    else if (lowerMessage.includes('overheat') || lowerMessage.includes('hot engine') || lowerMessage.includes('smoke')) {
        return 'If your engine is overheating, please pull over safely immediately, turn off the engine, and DO NOT open the radiator cap while it is hot. You can book an emergency mechanic from our Services menu and we will dispatch someone right away.';
    } 
    
    // Battery
    else if (lowerMessage.includes('battery') || lowerMessage.includes('start') || lowerMessage.includes('jump')) {
        return 'Car won\'t start? It might be a dead battery. Our mechanics carry jump starters and replacement batteries. You can book a mechanic callout for ₹499 from the Services menu.';
    } 
    
    // Tires
    else if (lowerMessage.includes('tire') || lowerMessage.includes('tyre') || lowerMessage.includes('flat') || lowerMessage.includes('puncture')) {
        return 'Dealing with a flat tire? Our mechanics can help you put on your spare tire or repair a simple puncture. Just book a mechanic from our Services tab.';
    }
    
    // Brakes
    else if (lowerMessage.includes('brake') || lowerMessage.includes('squeak') || lowerMessage.includes('grind')) {
        return 'Brake issues are serious safety concerns. If you hear squeaking or grinding when braking, please book a mechanic to inspect your brake pads and rotors as soon as possible.';
    }

    // Default Fallback
    return 'I am an automated assistant for Car Care Connect. I can help with information about our car wash packages, ride options, mechanic services, or basic car troubleshooting. How can I help you today?';
}
