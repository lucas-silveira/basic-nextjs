import { useEffect, useState } from 'react'
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
      .then(response => response.json())
      .then(data => setRecommendedProducts(data))
  },[])

  return (
    <div>
      <SEO
        title="DevCommerce, your top ecommerce"
        image="boost.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(product => {
            return (
              <li key={product.id}>
                {product.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
