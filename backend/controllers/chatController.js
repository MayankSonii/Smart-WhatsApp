import OpenAI from 'openai'

export const sendUserResponse = async (req, res) => {
    try {
        //getting the required parameters from body
        const { userMessage, n, temperature, topP } = req.body
        const openai = new OpenAI({
            apiKey: process.env.API_KEY,
        })

        //sending request to chat completions API
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0613',
            messages: [{ role: 'user', content: userMessage }],
            n,
            temperature,
            top_p: topP
        })

        //sending the response back
        res.json(response)
    } catch (err) {
        res.json({ error: err })
    }
}
