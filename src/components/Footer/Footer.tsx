import { Typography } from 'antd'

export default function Footer() {
  const { Text } = Typography
  return (
    <footer className='bg-neutral-100 py-5 text-center'>
      <Text type='secondary' className='text-[1rem]'>
        &copy; {new Date().getFullYear()} FlyTime. For demonstration purposes only.
      </Text>
    </footer>
  )
}
