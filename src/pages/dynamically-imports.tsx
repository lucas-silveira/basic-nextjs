import { Title } from '../styles/pages/Home'

export default function Home() {
  async function handleSum() {
    const math = (await import('../lib/math')).default
    alert(math.sum(1, 1))
  }

  return (
    <div>
      <button onClick={handleSum}>Somar 1 + 1</button>
    </div>
  )
}
