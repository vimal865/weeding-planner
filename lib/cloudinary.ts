import { v2 as cloudinary } from 'cloudinary'

// ── SDK config (runs once, server-side only) ─────────────────────────────────
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
})

export { cloudinary }

// ── Upload a Buffer/stream directly from the API route ───────────────────────
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder:     string
    public_id?: string
    resource_type?: 'image' | 'video' | 'raw' | 'auto'
    transformation?: object[]
  }
): Promise<{ url: string; public_id: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder:         options.folder,
        public_id:      options.public_id,
        resource_type:  options.resource_type ?? 'image',
        transformation: options.transformation,
        // Auto quality + format for best performance/size tradeoff
        quality:        'auto',
        fetch_format:   'auto',
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Upload failed'))
        resolve({
          url:        result.secure_url,
          public_id:  result.public_id,
          width:      result.width,
          height:     result.height,
        })
      }
    )
    stream.end(buffer)
  })
}

// ── Delete an asset by public_id ─────────────────────────────────────────────
export async function deleteFromCloudinary(public_id: string) {
  return cloudinary.uploader.destroy(public_id)
}

// ── Generate optimised variant URLs (no upload, CDN transform) ───────────────
export function cloudinaryUrl(
  public_id: string,
  opts: { width?: number; height?: number; crop?: string; quality?: string | number } = {}
): string {
  return cloudinary.url(public_id, {
    secure:      true,
    width:       opts.width,
    height:      opts.height,
    crop:        opts.crop  ?? 'fill',
    quality:     opts.quality ?? 'auto',
    fetch_format: 'auto',
  })
}

// ── Signed upload params for direct browser→Cloudinary uploads ───────────────
export function generateUploadSignature(folder: string) {
  const timestamp  = Math.round(new Date().getTime() / 1000)
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`
  const signature  = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    process.env.CLOUDINARY_API_SECRET!
  )
  return {
    signature,
    timestamp,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey:    process.env.CLOUDINARY_API_KEY,
  }
}
