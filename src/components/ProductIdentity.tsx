type ProductIdentityProps = { name: string; category: string; image: string }
export function ProductIdentity({ name, category, image }: ProductIdentityProps) {
  return <div className="product-identity"><div className="product-image"><img src={image} alt="" /></div><div><strong>{name}</strong><span>{category}</span></div></div>
}
