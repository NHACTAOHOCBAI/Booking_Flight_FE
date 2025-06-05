import airlineApi from '@/apis/apis/airline.api'
import SearchFlightComponent from '@/components/SearchFlightComponent'
import { useQuery } from '@tanstack/react-query'
import { Button, Collapse, CollapseProps, Input, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useMemo } from 'react'

// const { Option } = SelectO

// // Simple SearchFlightComponent directly included for self-containment
// // const SearchFlightComponent: React.FC = () => {
// //   return (
// //     <div className='space-y-4'>
// //       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// //         <Input
// //           size='large'
// //           placeholder='Điểm đi'
// //           className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500'
// //         />
// //         <Input
// //           size='large'
// //           placeholder='Điểm đến'
// //           className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500'
// //         />
// //       </div>
// //       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// //         <DatePicker
// //           size='large'
// //           placeholder='Ngày đi'
// //           className='w-full !rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500'
// //         />
// //         <DatePicker
// //           size='large'
// //           placeholder='Ngày về (Không bắt buộc)'
// //           className='w-full !rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500'
// //         />
// //       </div>
// //       <Select
// //         size='large'
// //         placeholder='Số hành khách'
// //         className='w-full [&>div]:!rounded-md [&>div]:!border-slate-300 [&>div]:focus:!border-red-500 [&>div]:focus:!ring-1 [&>div]:focus:!ring-red-500'
// //       >
// //         <Option value='1'>1 người</Option>
// //         <Option value='2'>2 người</Option>
// //         <Option value='3'>3 người</Option>
// //       </Select>
// //       <Button
// //         type='primary'
// //         size='large'
// //         className='w-full !bg-red-500 hover:!bg-red-600 !text-white !font-semibold !text-base !py-3 !h-auto !rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5'
// //       >
// //         Tìm chuyến bay
// //       </Button>
// //     </div>
// //   )
// // }

// // Định nghĩa kiểu cho dữ liệu hãng hàng không
interface AirlineData {
  value: string
  label: string
}

// Mock data cho các hãng hàng không
const airlineData: AirlineData[] = [
  { value: 'VJ', label: 'Vietjet Air' },
  { value: 'VN', label: 'Vietnam Airlines' },
  { value: 'QH', label: 'Bamboo Airways' },
  { value: 'BL', label: 'Pacific Airlines' },
  { value: 'VU', label: 'Vietravel Airlines' }
]
const { Title, Text } = Typography

const HomePage: React.FC = () => {
  const airlinesData = useQuery({
    queryKey: ['airlines'],
    queryFn: () => airlineApi.getAirlines({})
  })
  const airlineOptions = useMemo(
    () =>
      airlinesData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.airlineName,
          name: value.airlineName
        }
      }),
    [airlinesData]
  )
  const ans1: string =
    'Bạn có thể đặt vé máy bay trực tuyến trên website của chúng tôi hoặc liên hệ qua số điện thoại 085 7311 444 để được hỗ trợ.'
  const ans2: string =
    'Chúng tôi hỗ trợ thanh toán qua các hình thức: thẻ tín dụng, thẻ ATM, chuyển khoản ngân hàng, ví điện tử.'
  const ans3: string =
    'Chính sách hoàn vé phụ thuộc vào hãng hàng không và loại vé bạn đã mua. Vui lòng liên hệ để được tư vấn chi tiết.'

  const Q_AItems: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Text className='!font-semibold !text-slate-700 !text-base'>Câu hỏi 1: Làm thế nào để đặt vé máy bay?</Text>
      ),
      children: <p className='pl-6 text-slate-600 text-sm leading-relaxed'>{ans1}</p>,
      className:
        '!bg-white !mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 !border-0 !overflow-hidden'
    },
    {
      key: '2',
      label: (
        <Text className='!font-semibold !text-slate-700 !text-base'>
          Câu hỏi 2: Tôi có thể thanh toán bằng hình thức nào?
        </Text>
      ),
      children: <p className='pl-6 text-slate-600 text-sm leading-relaxed'>{ans2}</p>,
      className:
        '!bg-white !mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 !border-0 !overflow-hidden'
    },
    {
      key: '3',
      label: <Text className='!font-semibold !text-slate-700 !text-base'>Câu hỏi 3: Tôi có được hoàn vé không?</Text>,
      children: <p className='pl-6 text-slate-600 text-sm leading-relaxed'>{ans3}</p>,
      className:
        '!bg-white !mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 !border-0 !overflow-hidden'
    }
  ]

  if (airlineOptions)
    return (
      <div className='flex flex-col bg-slate-50'>
        {/* Base background for the page */}
        {/* Hero Section */}
        <div
          className='relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 md:p-6'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1504253163759-c23fccaebb55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' // New hero image
          }}
        >
          {/* Adjusted overlay to bg-black/10 for more light */}
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='relative z-10 text-center space-y-5 md:space-y-6 flex flex-col items-center justify-center max-w-3xl mx-auto'>
            {/* Added !text-shadow-lg for stronger shadow */}
            <Title level={1} className='!text-white !text-4xl md:!text-5xl !font-bold drop-shadow-md text-shadow-lg'>
              Săn vé máy bay giá rẻ cùng FlyTime
            </Title>
            {/* Added !text-shadow-md for stronger shadow */}
            <Text className='!text-lg md:!text-xl !text-gray-500 drop-shadow-xl max-w-xl'>
              Khám phá ngay những ưu đãi tốt nhất dành cho bạn! An toàn, tiện lợi và đáng tin cậy.
            </Text>
            {/* Booking Component Wrapper - Adjusted for cleaner look */}
            {/* <div className='w-full mt-6 md:mt-8 bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-gray-100'>
            <SearchFlightComponent />
          </div> */}
            <SearchFlightComponent />
          </div>
        </div>

        <div className='py-16 md:py-20 px-6 md:px-12 bg-slate-100'>
          <div className='max-w-6xl mx-auto'>
            <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
              Đối Tác Hàng Không Uy Tín
            </Title>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6'>
              {airlineOptions.map((airline) => (
                <div
                  key={airline.value}
                  className='bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center h-28 md:h-32 border border-slate-200'
                >
                  <img
                    src={`https://placehold.co/80x40/FF0000/FFFFFF?text=${airline.label}`}
                    alt='airline image'
                    className='h-10 mb-2'
                  />
                  <span className='text-sm md:text-base font-semibold text-slate-700'>{airline.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='py-16 md:py-20 px-6 md:px-12 bg-white'>
          <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
            Nhận xét của khách hàng
          </Title>
          <div
            style={{
              width: 'calc(300 * 5)',
              willChange: 'transform',
              msOverflowStyle: 'none', // IE và Edge
              scrollbarWidth: 'none' // Firefox
            }}
            className='flex animate-scroll gap-3 scrollbar-hide'
          >
            <div className='bg-slate-50 rounded-xl p-6 w-[320px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200'>
              <div className='mb-3'>
                <Text strong className='!block !text-slate-800 !text-lg'>
                  Nguyễn Văn A
                </Text>
                <Text type='secondary' className='!block !text-sm !text-slate-500'>
                  Hà Nội
                </Text>
              </div>
              <p className='text-slate-600 text-sm mt-3 leading-relaxed'>
                "Tôi rất hài lòng với dịch vụ của công ty. Nhân viên nhiệt tình, chu đáo và luôn sẵn sàng hỗ trợ tôi mọi
                lúc. Chắc chắn sẽ quay lại!"
              </p>
              {/* ... other review items ... */}
            </div>
            <div className='bg-slate-50 rounded-xl p-6 w-[320px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200'>
              <div className='mb-3'>
                <Text strong className='!block !text-slate-800 !text-lg'>
                  Trần Thị B
                </Text>
                <Text type='secondary' className='!block !text-sm !text-slate-500'>
                  Đà Nẵng
                </Text>
              </div>
              <p className='text-slate-600 text-sm mt-3 leading-relaxed'>
                "Đặt vé nhanh chóng, tiện lợi, chỉ vài thao tác là xong. Giá cả rất cạnh tranh so với các nơi khác. Rất
                khuyến khích!"
              </p>
            </div>
            <div className='bg-slate-50 rounded-xl p-6 w-[320px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200'>
              <div className='mb-3'>
                <Text strong className='!block !text-slate-800 !text-lg'>
                  Lê Hữu C
                </Text>
                <Text type='secondary' className='!block !text-sm !text-slate-500'>
                  TP.HCM
                </Text>
              </div>
              <p className='text-slate-600 text-sm mt-3 leading-relaxed'>
                "Trải nghiệm tuyệt vời từ đầu đến cuối. Dịch vụ khách hàng chuyên nghiệp. Tôi sẽ tiếp tục sử dụng dịch
                vụ của công ty trong tương lai."
              </p>
            </div>
          </div>
        </div>

        <div className='py-16 md:py-20 px-6 md:px-12 bg-slate-50'>
          <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
            Câu hỏi thường gặp
          </Title>
          <div className='max-w-3xl mx-auto'>
            <Collapse bordered={false} items={Q_AItems} className='bg-transparent' expandIconPosition='end' accordion />
          </div>
          <div className='mt-16 md:mt-20'>
            <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
              Điểm đến phổ biến
            </Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <img
                  src='https://placehold.co/600x400/FFD700/000000?text=Hanoi'
                  alt='Hanoi'
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <Text strong className='!text-lg !text-slate-800'>
                    Hà Nội
                  </Text>
                  <Text type='secondary' className='!block !text-sm !text-slate-500'>
                    Thủ đô ngàn năm văn hiến
                  </Text>
                </div>
              </div>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <img
                  src='https://placehold.co/600x400/87CEEB/000000?text=Ho+Chi+Minh'
                  alt='Ho Chi Minh City'
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <Text strong className='!text-lg !text-slate-800'>
                    TP. Hồ Chí Minh
                  </Text>
                  <Text type='secondary' className='!block !text-sm !text-slate-500'>
                    Thành phố không ngủ
                  </Text>
                </div>
              </div>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <img
                  src='https://placehold.co/600x400/90EE90/000000?text=Da+Nang'
                  alt='Da Nang'
                  className='w-full h-48 object-cover'
                />
                <div className='p-4'>
                  <Text strong className='!text-lg !text-slate-800'>
                    Đà Nẵng
                  </Text>
                  <Text type='secondary' className='!block !text-sm !text-slate-500'>
                    Thành phố đáng sống
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='py-16 md:py-20 px-6 md:px-12 text-white'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className='rounded-xl p-8 md:p-10 w-full max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl border border-slate-200'>
            <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-8 !text-center'>
              Liên hệ với FlyTime
            </Title>
            <div className='space-y-5'>
              <Input
                size='large'
                type='text'
                placeholder='Tên của bạn'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <Input
                size='large'
                type='text'
                placeholder='Số điện thoại'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <Input
                size='large'
                type='email'
                placeholder='Địa chỉ email'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <TextArea
                rows={4}
                placeholder='Lời nhắn cho FlyTime'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <Button
                type='primary'
                className='w-full !bg-red-600 hover:!bg-red-700 !text-white !font-semibold !text-base !py-3 !h-auto !rounded-md !shadow-md hover:!shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'
                size='large'
              >
                Gửi ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HomePage
