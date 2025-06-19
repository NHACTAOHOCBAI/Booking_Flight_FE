import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface UploadImageProps {
  fileList: UploadFile[]
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>
  isPending?: boolean
  circle?: boolean
  children?: React.ReactNode
  disabled?: boolean
}

const UploadImage: React.FC<UploadImageProps> = ({
  fileList,
  setFileList,
  isPending = false,
  circle = false,
  children,
  disabled = false
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  return (
    <>
      <Upload
        disabled={isPending || disabled}
        beforeUpload={() => false}
        listType={circle ? 'picture-circle' : 'picture-card'}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept='image/*'
        maxCount={1}
        showUploadList={false}
      >
        {fileList.length > 0 ? (
          <img
            src={
              fileList[0].url ||
              (fileList[0].preview as string) ||
              (fileList[0].originFileObj && URL.createObjectURL(fileList[0].originFileObj))
            }
            alt='preview'
            style={{
              width: circle ? 96 : 104,
              height: circle ? 96 : 104,
              borderRadius: circle ? '50%' : 4,
              objectFit: 'cover',
              cursor: 'pointer',
              border: '4px solid #a0c4ff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
            onClick={() => handlePreview(fileList[0])}
          />
        ) : (
          (children ?? uploadButton)
        )}
      </Upload>

      {previewImage && (
        <Image
          style={{ width: 520, height: 520 }}
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default UploadImage
