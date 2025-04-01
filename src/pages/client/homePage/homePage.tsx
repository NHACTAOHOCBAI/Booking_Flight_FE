import BookingComponent from '@/components/SearchFlightComponent'
import { airlineData } from '@/globalType'
import { Input, Button, CollapseProps, Collapse } from 'antd'
import TextArea from 'antd/es/input/TextArea'

export default function HomePage() {
  const ans1 =
    'Bạn có thể đặt vé máy bay trực tuyến trên website của chúng tôi hoặc liên hệ qua số điện thoại 085 7311 444 để được hỗ trợ.'
  const ans2 =
    'Chúng tôi hỗ trợ thanh toán qua các hình thức: thẻ tín dụng, thẻ ATM, chuyển khoản ngân hàng, ví điện tử.'
  const ans3 =
    'Chính sách hoàn vé phụ thuộc vào hãng hàng không và loại vé bạn đã mua. Vui lòng liên hệ để được tư vấn chi tiết.'

  const Q_AItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Câu hỏi 1: Làm thế nào để đặt vé máy bay?',
      children: <p className='pl-5 text-base'>{ans1}</p>,
      className: 'text-lg'
    },
    {
      key: '2',
      label: 'Câu hỏi 2: Tôi có thể thanh toán bằng hình thức nào?',
      children: <p className='pl-5 text-base'>{ans2}</p>,
      className: 'text-lg'
    },
    {
      key: '3',
      label: 'Câu hỏi 3: Tôi có được hoàn vé không?',
      children: <p className='pl-5 text-base'>{ans3}</p>,
      className: 'text-lg'
    }
  ]

  return (
    <div className='flex flex-col '>
      <div
        className='min-h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat '
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1605216663789-a86dbd5e59a5?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' // Thay đổi URL ảnh nền
        }}
      >
        <div className='bg-black/40 min-h-screen flex flex-col'>
          <main className='flex-grow flex items-center justify-center p-4'>
            <div className='text-center space-y-4 md:space-y-6'>
              <h2 className='text-3xl md:text-5xl font-bold text-white'>Săn vé máy bay giá rẻ cùng FlyTime</h2>
              <p className='text-lg md:text-xl text-gray-200'>Khám phá ngay những ưu đãi tốt nhất dành cho bạn!</p>

              <BookingComponent />
            </div>
          </main>
        </div>
      </div>

      <div
        className='min-h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' // Thay thế bằng URL ảnh của bạn
        }}
      >
        <div className='py-10 px-6 md:px-12'>
          <h2 className='text-2xl font-bold text-white mb-6 text-center [text-shadow:_0_0_3px_#000,_0_0_8px_#fff]'>
            Các hãng hàng không Việt Nam
          </h2>
          <div className='flex flex-wrap justify-center gap-6'>
            {airlineData.map((airline, _) => (
              <div
                key={airline.airlineCode}
                className='bg-black/50 rounded-lg p-4 text-white border border-gray-700 flex items-center justify-center w-32 h-20' // Kích thước cố định
              >
                {/* */}
                <span className='text-sm font-semibold'>{airline.airlineName}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=' min-h-screen flex flex-col gap-10'>
          <div className=' px-2 overflow-hidden'>
            <h2 className='text-2xl font-bold text-white mb-6 text-center [text-shadow:_0_0_3px_#000,_0_0_8px_#fff]'>
              Nhận xét của khách hàng
            </h2>
            <div
              style={{
                width: 'calc(300 * 5)',
                willChange: 'transform',
                msOverflowStyle: 'none', // IE và Edge
                scrollbarWidth: 'none' // Firefox
              }}
              className='flex animate-scroll gap-3 scrollbar-hide'
            >
              <div className='bg-black/50 rounded-lg p-4 text-wrap text-white border border-gray-700 w-[300px] flex-shrink-0'>
                <div>
                  <h4 className='font-semibold'>Nguyễn Văn A</h4>
                  <p className='text-sm text-white'>Hà Nội</p>
                </div>

                <p className='text-sm'>"Tôi rất hài lòng với dịch vụ của công ty. Nhân viên nhiệt tình, chu đáo."</p>
              </div>

              <div className='bg-black/50 rounded-lg p-4 text-wrap text-white border border-gray-700 w-[300px] flex-shrink-0'>
                <div>
                  <h4 className='font-semibold'>Trần Thị B</h4>
                  <p className='text-sm text-white'>Đà Nẵng</p>
                </div>
                <p className='text-sm'>"Đặt vé nhanh chóng, tiện lợi. Giá cả cạnh tranh."</p>
              </div>
              <div className='bg-black/50 rounded-lg p-4 text-wrap text-white border border-gray-700 w-[300px] flex-shrink-0'>
                <div>
                  <h4 className='font-semibold'>Lê Hữu C</h4>
                  <p className='text-sm text-white'>TP.HCM</p>
                </div>
                <p className='text-sm'>"Tôi sẽ tiếp tục sử dụng dịch vụ của công ty trong tương lai."</p>
              </div>
              <div className='bg-black/50 rounded-lg p-4 text-wrap text-white border border-gray-700 w-[300px] flex-shrink-0'>
                <div>
                  <h4 className='font-semibold'>Đinh Thị D</h4>
                  <p className='text-sm text-white'>Cần Thơ</p>
                </div>
                <p className='text-sm'>"Dịch vụ tuyệt vời, nhân viên hỗ trợ nhiệt tình, chu đáo"</p>
              </div>
              <div className='bg-black/50 rounded-lg p-4 text-wrap text-white border border-gray-700 w-[300px] flex-shrink-0'>
                <div>
                  <h4 className='font-semibold'>Võ Văn E</h4>
                  <p className='text-sm text-white'>Huế</p>
                </div>
                <p className='text-sm'>"Tôi rất ấn tượng với sự chuyên nghiệp của công ty."</p>
              </div>
            </div>
          </div>
          <div className=' px-6 md:px-12'>
            <h2 className='text-2xl font-bold text-white mb-4 text-center [text-shadow:_0_0_3px_#000,_0_0_8px_#fff]'>
              Câu hỏi thường gặp
            </h2>
            <Collapse bordered={false} items={Q_AItems} className='bg-white' />
          </div>

          <form className='flex-grow flex items-center justify-start px-4'>
            <div className=' rounded-xl px-6 pb-10 md:px-8 md:pb-10 w-full max-w-2xl  '>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Liên hệ</h2>
              <div className='space-y-4'>
                <Input
                  type='text'
                  placeholder='Tên của bạn'
                  className='w-full bg-white/100 text-black border-gray-700 placeholder:text-black'
                />
                <Input
                  type='text'
                  placeholder='Số điện thoại'
                  className='w-full bg-white/100 text-black border-gray-700 placeholder:text-black'
                />
                <Input
                  type='text'
                  placeholder='Địa chỉ email'
                  className='w-full bg-white/100 text-black border-gray-700 placeholder:text-black'
                />
                <TextArea
                  placeholder='Lời nhắn cho FlyTime'
                  className='w-full bg-white/100 text-black border-gray-700 placeholder:text-black min-h-[100px]'
                />
                <Button className='w-full bg-transparent/65 text-white font-bold' size='large'>
                  Gửi ngay
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
