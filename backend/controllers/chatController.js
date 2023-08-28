import OpenAI from 'openai'

export const sendUserResponse = async (req, res) => {
    try {
        const { userMessage, n, temperature, topP } = req.body
        const openai = new OpenAI({
            apiKey: process.env.API_KEY,
        })

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0613',
            messages: [{ role: 'user', content: userMessage }],
            n,
            temperature,
            top_p: topP
        })

        res.json(response)
    } catch (err) {
        res.json({ error: err })
    }
}
