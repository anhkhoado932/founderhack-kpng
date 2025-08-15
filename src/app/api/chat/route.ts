import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Build messages array with conversation history
    const messages: any[] = [
      {
        role: "system",
        content: "You are a helpful parenting assistant specializing in early childhood development, sleep training, feeding, and general parenting advice. Provide practical, evidence-based advice in a warm and supportive tone. Format your responses with clear structure using numbered lists and bold headings. For example: '1. **Sleep Training**: [content] 2. **Feeding**: [content]' etc. Keep responses concise but informative. Remember the context of the conversation and build upon previous responses. If the user asks for 'more detail' or similar follow-up questions, provide additional information based on what was discussed previously."
      }
    ]

    // Add conversation history (limit to last 10 messages to avoid token limits)
    const recentHistory = conversationHistory.slice(-10)
    recentHistory.forEach((msg: any) => {
      messages.push({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      })
    })

    // Add current message
    messages.push({
      role: "user",
      content: message
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response at this time.'

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
} 