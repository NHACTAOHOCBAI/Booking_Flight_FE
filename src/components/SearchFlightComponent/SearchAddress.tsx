import { useState, useEffect } from 'react'
import { Input, Popover, Tabs, List } from 'antd'
import { cityData } from '@/globalType'
import { toCity } from '@/utils/convert'

interface City {
  value: string
  label: string
}

interface TabData {
  key: string
  label: string
  list: City[]
}

interface OptionData {
  value: string
  label: string
  tab: TabData
}

const options: OptionData[] = [
  {
    value: 'vietnam',
    label: 'Việt Nam',
    tab: {
      key: 'vietnam-tab',
      label: 'Việt Nam',
      list: cityData.map((city) => {
        return {
          value: city.id!,
          label: `${city.cityName} (${city.cityCode}) `
        }
      })
      //    [
      //     { value: 'hanoi', label: 'Hà Nội (HAN)' },
      //     { value: 'hochiminh', label: 'Hồ Chí Minh (SGN)' },
      //     { value: 'danang', label: 'Đà Nẵng (DAD)' },
      //     { value: 'dienbienphu', label: 'Điện Biên Phủ (DIN)' },
      //     { value: 'haiphong', label: 'Hải Phòng (HPH)' },
      //     { value: 'thanhhoa', label: 'Thanh Hóa (THD)' },
      //     { value: 'vinh', label: 'Vinh (VII)' }
      //   ]
    }
  },
  {
    value: 'chaua',
    label: 'Châu Á',
    tab: {
      key: 'chaua-tab',
      label: 'Châu Á',
      list: [
        { value: 'quangnam', label: 'Quảng Nam (VCL)' },
        { value: 'hue', label: 'Huế (HUI)' },
        { value: 'pleiku', label: 'Pleiku (PXU)' },
        { value: 'phuyen', label: 'Phú Yên (TBB)' },
        { value: 'banmethuot', label: 'Ban Mê Thuột (BMV)' },
        { value: 'nhatrang', label: 'Nha Trang (CXR)' },
        { value: 'quinhon', label: 'Qui Nhơn (UIH)' }
      ]
    }
  },
  {
    value: 'chauau',
    label: 'Châu Âu',
    tab: {
      key: 'chauau-tab',
      label: 'Châu Âu',
      list: [
        { value: 'paris', label: 'Paris (CDG)' },
        { value: 'london', label: 'London (LHR)' }
      ]
    }
  },
  {
    value: 'hoakycanada',
    label: 'Hoa Kỳ - Canada',
    tab: {
      key: 'hoakycanada-tab',
      label: 'Hoa Kỳ - Canada',
      list: [
        { value: 'newyork', label: 'New York (JFK)' },
        { value: 'toronto', label: 'Toronto (YYZ)' }
      ]
    }
  },
  {
    value: 'chauucchauphi',
    label: 'Châu Úc - Châu Phi',
    tab: {
      key: 'chauucchauphi-tab',
      label: 'Châu Úc - Châu Phi',
      list: [
        { value: 'cantho', label: 'Cần Thơ (VCA)' },
        { value: 'kiengiang', label: 'Kiên Giang (VKG)' },
        { value: 'camau', label: 'Cà Mau (CAH)' },
        { value: 'phuquoc', label: 'Phú Quốc (PQC)' },
        { value: 'condao', label: 'Côn Đảo (VCS)' },
        { value: 'quangninh', label: 'Quảng Ninh (VDO)' }
      ]
    }
  }
]

interface InputWithPopoverProps {
  setValue: (value: string) => void
  placeholder?: string
  value: string
}

const SearchAddress: React.FC<InputWithPopoverProps> = ({ setValue, placeholder, value }) => {
  const [popoverContent, setPopoverContent] = useState<TabData[]>([])
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState<string>('')

  useEffect(() => {
    setPopoverContent(options.map((option) => option.tab))
    setActiveTabKey('vietnam-tab')
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value

    setValue(valueInput)
    setPopoverVisible(true)
    if (valueInput === '') {
      setPopoverContent(options.map((option) => option.tab))
      setActiveTabKey('vietnam-tab')
      return
    }
    // Filter options based on input
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(valueInput.toLowerCase()) ||
        option.tab.list.some((city) => city.label.toLowerCase().includes(valueInput.toLowerCase()))
    )

    const tabs = filteredOptions.map((option) => option.tab)
    if (tabs.length === 0) {
      const noContent: TabData[] = [
        {
          key: 'noContent',
          label: 'khong tim thay ket qua',
          list: []
        }
      ]
      setPopoverContent(noContent)
      setActiveTabKey(noContent[0].key)
      return
    }

    setPopoverContent(tabs)
    setActiveTabKey(tabs[0].key)
  }

  const handleCitySelect = (value: string, tabKey: string) => {
    setPopoverVisible(false)
    setActiveTabKey(tabKey)

    setValue(value)
  }

  const handlePopoverOpenChange = (visible: boolean) => {
    setPopoverVisible(visible)
    if (!visible) {
      // Reset content when closing
      setActiveTabKey('vietnam-tab')
      setPopoverContent(options.map((option) => option.tab))
    }
  }

  const getPopoverContent = () => {
    return (
      <div>
        <Tabs
          activeKey={activeTabKey}
          onChange={(key) => setActiveTabKey(key)}
          items={popoverContent.map((tab) => ({
            key: tab.key,
            label: tab.label,
            children: (
              <List
                dataSource={tab.list}
                renderItem={(item) => (
                  <List.Item
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                    onClick={() => handleCitySelect(item.value, tab.key)}
                  >
                    {item.label}
                  </List.Item>
                )}
              />
            )
          }))}
        />
      </div>
    )
  }

  return (
    <Popover
      placement='bottomLeft'
      arrow={false}
      content={getPopoverContent()}
      trigger='click'
      open={popoverVisible}
      onOpenChange={handlePopoverOpenChange}
    >
      <Input
        className='h-[50px]'
        placeholder={placeholder}
        value={toCity(value)?.cityName || value}
        onChange={(e) => {
          handleInputChange(e)
        }}
        allowClear
      />
    </Popover>
  )
}

export default SearchAddress
