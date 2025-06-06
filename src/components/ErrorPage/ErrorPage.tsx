import { Result, Button } from 'antd'

import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Result
      style={{ marginTop: 50 }}
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  )
}

export default ErrorPage
