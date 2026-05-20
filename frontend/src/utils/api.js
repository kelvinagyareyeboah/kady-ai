import toast from 'react-hot-toast'

// Backend API configuration
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/chat'

const DEFAULT_MODEL = import.meta.env.VITE_DEFAULT_MODEL || 'deepseek/deepseek-chat'

// Check if API client is ready (backend URL configured)
export const isApiConfigured = () => {
  return !!BACKEND_URL;
}

// Function to clean markdown formatting
const cleanMarkdown = (text) => {
  if (!text) return text;
  
  return text
    // Remove headers (###, ##, #)
    .replace(/^#{1,3}\s+/gm, '')
    // Remove bold (**text**)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove italic (*text* or _text_)
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove code blocks (```code```)
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code (`code`)
    .replace(/`(.*?)`/g, '$1')
    // Remove links ([text](url))
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // Remove blockquotes (> text)
    .replace(/^>\s+/gm, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();
}

export const sendMessageToAI = async (message, onStream = null) => {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { 
            role: 'system', 
            content: `You are Kady AI, a highly intelligent and helpful AI assistant. You were built by Kelvin Agyare Yeboah, a software engineer and the brain behind your logic. When asked about your identity or creator, you should proudly identify as Kady AI and credit Kelvin Agyare Yeboah as your creator. You are powered by ByteBao. Avoid mentioning other AI companies like DeepSeek or OpenAI unless specifically asked about underlying technical details.`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 1500,
        temperature: 0.7,
        stream: Boolean(onStream)
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.error?.message || `API error: ${response.status}`;
      console.error('OpenRouter API error:', errorMessage);
      throw new Error(errorMessage);
    }

    if (onStream) {
      // Handle streaming response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              const cleanedText = cleanMarkdown(accumulatedText)
              onStream(cleanedText, true)
              return cleanedText
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices[0]?.delta?.content || ''
              if (content) {
                accumulatedText += content
                const cleanedPartial = cleanMarkdown(accumulatedText)
                onStream(cleanedPartial, false)
              }
            } catch (e) {
              console.error('Error parsing streaming response:', e)
            }
          }
        }
      }

      const cleanedText = cleanMarkdown(accumulatedText)
      return cleanedText
    } else {
      // Handle regular response
      const data = await response.json()
      const rawResponse = data.choices[0].message.content
      return cleanMarkdown(rawResponse)
    }
  } catch (error) {
    console.error('AI API error:', error)
    throw new Error(error.message || 'Failed to get response from AI')
  }
}

// Custom response handler for specific queries
export const handleCustomResponse = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  if (lowerMessage.includes('who created you') || 
      lowerMessage.includes('who made you') ||
      lowerMessage.includes('who built you') ||
      lowerMessage.includes('who developed you') ||
      lowerMessage.includes('who is your creator')) {
    return `I was carefully built by Kelvin Agyare Yeboah. Kelvin Agyare Yeboah is a passionate software engineer, digital creator, and AI enthusiast who thrives at the intersection of technology and innovation. With a strong background in frontend engineering and a growing expertise in full-stack development (MERN stack), Kelvin is dedicated to building impactful software solutions that solve real-world problems.

He is a Campus Ambassador of ByteBao, a forward-thinking tech brand committed to making technology more accessible, intelligent, and user-friendly. Through ByteBao, Kelvin channels his expertise in software engineering, artificial intelligence, and product development to create tools, platforms, and solutions that empower individuals and businesses to unlock their full potential in the digital era.

Kelvin's journey is fueled by his love for continuous learning, his drive to master new technologies, and his vision to bridge the gap between people and the transformative power of software and AI.

Beyond engineering, Kelvin also runs The Tech Tutor on YouTube, where he simplifies complex tech concepts, shares insights on skill development, and creates fun, globally relevant content to inspire the next generation of tech enthusiasts.

With ByteBao as his innovation hub and his expertise as a software engineer, Kelvin is building not just projects — but a future where technology becomes more intuitive, impactful, and accessible to everyone`;
  }
  
  return null; // Let the AI handle normal responses
}

// Modified sendMessageToAI with custom response handling
export const sendMessageWithCustomResponse = async (message, onStream = null) => {
  // Check for custom responses first
  const customResponse = handleCustomResponse(message);
  if (customResponse) {
    if (onStream) {
      // Simulate streaming for custom response
      const words = customResponse.split(' ');
      let accumulated = '';
      
      for (let i = 0; i < words.length; i++) {
        accumulated += words[i] + ' ';
        onStream(accumulated, i === words.length - 1);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return customResponse;
    } else {
      return customResponse;
    }
  }
  
  // Proceed with normal AI response
  return sendMessageToAI(message, onStream);
}

// Helper function to get available models
export const getAvailableModels = () => {
  return [
    {
      id: 'kady-chat',
      name: 'Kady AI',
      provider: 'Kady AI',
      model: 'deepseek/deepseek-chat',
      description: 'The standard Kady AI for general assistance'
    },
    {
      id: 'kady-coder',
      name: 'Kady AI Coder', 
      provider: 'Kady AI',
      model: 'deepseek/deepseek-coder',
      description: 'Specialized for expert code assistance'
    }
  ]
}