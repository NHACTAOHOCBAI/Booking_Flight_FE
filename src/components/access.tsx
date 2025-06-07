import { useContext, useEffect, useState } from 'react'
import { Result } from 'antd'
import { AppContext } from '@/context/app.context'
interface IProps {
  hideChildren?: boolean
  children: React.ReactNode
  permission: { id?: string; name?: string; method?: string; apiPath?: string; model?: string }
}

const Access = (props: IProps) => {
  //set default: hideChildren = false => vẫn render children
  // hideChildren = true => ko render children, ví dụ hide button (button này check quyền)
  const { permission, hideChildren = false } = props
  const [allow, setAllow] = useState<boolean>(true)

  const userPermissions = useContext(AppContext).profile?.role?.permissions
  useEffect(() => {
    if (userPermissions?.length) {
      const check = userPermissions.find((item) => {
        if (typeof item === 'string') return false
        return (
          item.apiPath === permission.apiPath && item.method === permission.method && item.model === permission.model
        )
      })
      if (check) {
        setAllow(true)
      } else setAllow(false)
    }
  }, [permission.apiPath, permission.method, permission.model, userPermissions])

  return (
    <>
      {allow === true || import.meta.env.VITE_ACL_ENABLE === 'false' ? (
        <>{props.children}</>
      ) : (
        <>
          {hideChildren === false ? (
            <Result status='403' title='Access denied' subTitle='Sorry, you are not authorized to access this page.' />
          ) : (
            <>{/* render nothing */}</>
          )}
        </>
      )}
    </>
  )
}

export default Access
