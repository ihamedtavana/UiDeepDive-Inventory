import { useRef, useState } from 'react'
import { Avatar } from './Avatar'
import { Button } from './Button'
import user from '../assets/auth/7850-7213.svg'
import uploadIcon from '../assets/auth/photo-upload.svg'
import removeIcon from '../assets/auth/photo-remove.svg'
export function AuthProfilePhoto({ photo, onChange }: { photo?: string; onChange: (photo?: string) => void }) {
  const file = useRef<HTMLInputElement>(null)
  const url = useRef<string | undefined>(undefined)
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const remove = () => { if (url.current) URL.revokeObjectURL(url.current); url.current = undefined; onChange(undefined); setError('') }
  return <><div className="auth-profile-photo">{photo ? <Avatar src={photo} alt="Your profile" /> : <span className="auth-avatar-fallback"><img src={user} alt="" /></span>}<div><strong>Profile photo</strong><small>{isUploading ? 'Uploading your photo…' : photo ? 'From your company directory' : 'Optional · PNG or JPG, up to 5 MB'}</small><div className="auth-photo-actions"><Button disabled={isUploading} onClick={() => file.current?.click()}><img className="icon" src={uploadIcon} alt="" />{photo ? 'Replace photo' : 'Upload photo'}</Button>{photo && <Button appearance="ghost" onClick={remove}><img className="icon" src={removeIcon} alt="" />Remove</Button>}</div></div><input hidden ref={file} type="file" accept="image/png,image/jpeg" onChange={e => { const selected = e.target.files?.[0]; e.target.value = ''; if (!selected) return; if (!['image/png', 'image/jpeg'].includes(selected.type) || selected.size > 5 * 1024 * 1024) { setError('Choose a PNG or JPG image up to 5 MB.'); return } setIsUploading(true); const next = URL.createObjectURL(selected); const image = new Image(); image.onload = () => { if (url.current) URL.revokeObjectURL(url.current); url.current = next; onChange(next); setError(''); setIsUploading(false) }; image.onerror = () => { URL.revokeObjectURL(next); setError('We couldn’t read this image. Try another photo.'); setIsUploading(false) }; image.src = next }} /></div>{error && <div className="auth-callout is-error" role="alert"><strong>Photo not uploaded</strong><p>{error}</p><Button onClick={() => file.current?.click()}>Try again</Button><Button appearance="ghost" onClick={remove}>Use default avatar</Button></div>}</>
}
