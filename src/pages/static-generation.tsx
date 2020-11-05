import { InferGetStaticPropsType } from 'next'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`)
  const data: IProduct[] = await response.json()
  
  return {
    props: { data },
    revalidate: 10, // In seconds
  }
}

export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {data.map(product => {
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
