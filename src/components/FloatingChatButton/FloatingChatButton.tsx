import React, { useState } from 'react'
import { Button } from 'antd'
import { MessageOutlined } from '@ant-design/icons'
import Chatbot from '../Chatbot'

interface FloatingChatButtonProps {
  currentUserId?: string
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ currentUserId }) => {
  const [chatVisible, setChatVisible] = useState(false)

  const handleToggleChat = () => {
    setChatVisible(!chatVisible)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MessageOutlined />}
          onClick={handleToggleChat}
          className="!w-14 !h-14 !bg-blue-500 hover:!bg-blue-600 !border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 floating-chat-btn"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>

      {/* Chatbot Drawer */}
      <Chatbot
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        currentUserId={currentUserId}
      />
    </>
  )
}

export default FloatingChatButton
