import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/recommended')
  const data: IProduct[] = await response.json()
  
  return {
    props: { data },
  }
}

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
