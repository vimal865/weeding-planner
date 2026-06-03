import { NextRequest }            from 'next/server'
import { uploadToCloudinary, generateUploadSignature } from '@/lib/cloudinary'
import { ok, err, serverError, requireAuth } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const formData = await req.formData()
    const file     = formData.get('file') as File | null
    const folder   = (formData.get('folder') as string) || 'wedding-marketplace/misc'
    const type     = (formData.get('type') as string) || 'image'

    if (!file) return err('No file provided')

    // 10 MB max
    if (file.size > 10 * 1024 * 1024) return err('File too large — max 10 MB')

    const allowed = ['image/jpeg','image/jpg','image/png','image/webp','video/mp4','video/quicktime']
    if (!allowed.includes(file.type)) return err(`File type ${file.type} not allowed`)

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadToCloudinary(buffer, {
      folder,
      resource_type: type === 'video' ? 'video' : 'image',
      transformation: type === 'image'
        ? [{ width: 1920, height: 1080, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
        : undefined,
    })

    return ok({ url: result.url, public_id: result.public_id, width: result.width, height: result.height })
  } catch (e) { return serverError(e) }
}

// GET — return signed upload params for direct browser-to-Cloudinary upload
export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const folder = req.nextUrl.searchParams.get('folder') ?? 'wedding-marketplace/vendors'
    const sig    = generateUploadSignature(folder)
    return ok(sig)
  } catch (e) { return serverError(e) }
}
