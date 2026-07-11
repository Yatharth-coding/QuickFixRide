const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Handle chat messages
// @route   POST /api/chat
// @access  Public
exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        try {
            const { GoogleGenerativeAI } = require('@google/generative-ai');
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            // Use the correct modern model
            const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
            
            const systemPrompt = "You are a helpful AI assistant for a car servicing and ride-booking company named QuickFixRide (3C). Be polite and keep answers concise. User says: ";
            const result = await model.generateContent(systemPrompt + message);
            const botReply = result.response.text() || "I couldn't process that.";
            
            res.status(200).json({ reply: botReply });
        } catch (apiError) {
            console.error('Gemini API Error details:', apiError.message);
            // Fallback mock responses if API key is invalid
            let fallbackReply = "I am an automated assistant. The AI service is currently unavailable, but I can help you with basic questions! You can book a ride or request nearby servicing.";
            if (message.toLowerCase().includes('hello') || message.toLowerCase().match(/\bhi\b/)) {
                fallbackReply = "Hello! How can I help you with your car care today?";
            } else if (message.toLowerCase().includes('book')) {
                fallbackReply = "You can book a ride or servicing from the Services menu at the top!";
            }
            res.status(200).json({ reply: fallbackReply });
        }
        
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Failed to process chat' });
    }
};
