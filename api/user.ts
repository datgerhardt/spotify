import { VercelRequest, VercelResponse } from "@vercel/node"
import { spotifyApi } from "../spotify-api.config"

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const token = req.headers.authorization.split(" ")[1]

  if (!token) return res.status(401).end()

  spotifyApi.setAccessToken(token)
  const { body } = await spotifyApi.getMe()

  res.json({
    id: body.id,
    name: body.display_name,
    href: body.href,
    images: body.images
  })
}

export default handler
