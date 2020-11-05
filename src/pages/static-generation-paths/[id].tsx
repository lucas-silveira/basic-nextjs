import { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { Title } from '@/styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`)
  const data: IProduct[] = await response.json()
  const paths = data.map(product => ({
    params: { id: product.id.toString() }
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`${process.env.API_URL}/recommended/${params.id}`)
  const product: IProduct = await response.json()
  
  return {
    props: { product },
    revalidate: 10, // In seconds
  }
}

export default function Home({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }
  
  return (
    <div>
      <section>
        <Title>Products</Title>

        <h1>{product.title}</h1>
      </section>
    </div>
  )
}
