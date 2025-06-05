import { clearLocalStorage } from '@/apis/auth.api'
import { AppContext } from '@/context/app.context'
import { useLogout } from '@/hooks/useAuth'
import { MenuProps, Dropdown, Space, Modal, message } from 'antd'
import _ from 'lodash'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { TbExclamationCircleFilled } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const UserHeader = () => {
  const { confirm } = Modal
  const logoutMutation = useLogout()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [messageApi, contextHolder] = message.useMessage()
  const showConfirm = () => {
    confirm({
      title: 'Confirm logout',
      icon: <TbExclamationCircleFilled />,
      content: 'Do you want to logout?',
      onOk() {
        let body: void
        logoutMutation.mutate(body, {
          onSuccess() {
            clearLocalStorage()
            setIsAuthenticated(false)
            setProfile(null)
            messageApi.open({
              type: 'success',
              content: 'Logout success'
            })
          }
        })
      },
      onCancel() {}
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to='/myProfile'> My profile</Link>
    },
    {
      key: '2',
      label: (
        <Link to='/' onClick={showConfirm}>
          Logout
        </Link>
      )
    }
  ]

  const [isScroll, setIsScroll] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const { profile } = useContext(AppContext)

  const menuStyle: React.CSSProperties = {
    padding: '8px 15px',
    cursor: 'pointer'
  }
  return (
    <>
      {contextHolder}
      <div className={`pb-2 pt-2  fixed w-full z-50 ${isScroll ? 'bg-white' : 'bg-transparent'}`}>
        <div className='container'>
          <div className='flex justify-between'>
            <Link to='/' className='h-14 w-64 flex items-center justify-center'>
              <img src='/logo4.png' alt='Logo' className='h-48 w-auto' />
            </Link>

            <div className='flex justify-end items-center'>
              <div className='flex item-center py-1 mr-1 cursor-pointer'>
                {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                <path d='M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z' />
                <path
                  fillRule='evenodd'
                  d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z'
                  clipRule='evenodd'
                />
              </svg> */}
                <span className='ml-1 text-lg font-bold hover:text-gray-300'>vi</span>
                <span className='ml-[0.5rem] text-lg font-bold hover:text-gray-300'>| en</span>
              </div>

              <div className='flex items-center mx-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30px'
                  height='30px'
                  fill='none'
                  viewBox='0 0 30 30'
                  className=''
                >
                  <path
                    fill='currentColor'
                    d='M24 18.911v3.929a1.11 1.11 0 0 1-1.033 1.109c-.486.033-.883.051-1.19.051C11.96 24 4 16.041 4 6.222c0-.306.017-.703.051-1.189A1.111 1.111 0 0 1 5.16 4h3.929a.556.556 0 0 1 .553.5c.026.256.05.459.071.613.221 1.541.674 3.04 1.343 4.446a.506.506 0 0 1-.164.63l-2.398 1.713a14.497 14.497 0 0 0 7.605 7.605l1.71-2.394a.514.514 0 0 1 .638-.165 15.448 15.448 0 0 0 4.444 1.339c.155.022.358.046.611.07a.555.555 0 0 1 .499.554H24Z'
                  ></path>
                </svg>
                <div className='flex flex-col items-start hover:text-gray-300 cursor-pointer mx-2'>
                  <div className='text-sm '>Contact</div>
                  <div className='text-sm font-bold'>0857311444</div>
                </div>
                {profile ? (
                  <Dropdown
                    menu={{ items }}
                    dropdownRender={(menu) => (
                      <div className='bg-transparent'>
                        {React.cloneElement(
                          menu as React.ReactElement<{
                            style: React.CSSProperties
                          }>,
                          { style: menuStyle }
                        )}
                      </div>
                    )}
                  >
                    <span className='cursor-pointer'>
                      <Space>{profile.fullName}</Space>
                    </span>
                  </Dropdown>
                ) : (
                  <Link to='/login'>login</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserHeader
