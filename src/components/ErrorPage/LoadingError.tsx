import { Spin } from 'antd'

export default function LoadingError() {
  return (
    <section style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size='large' />
    </section>
  )
}
