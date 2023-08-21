import OpenAI from 'openai'

export const sendUserResponse = async (req, res) => {
    try {
        const { userMessage } = req.body
        const openai = new OpenAI({
            apiKey: process.env.API_KEY,
        })

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0613',
            messages: [{ role: 'user', content: userMessage }],
            n: 2,
            temperature: 0.7
        })

        res.json(response)
    } catch (err) {
        res.json({ error: err })
    }
}
