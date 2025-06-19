import airlineApi from '@/apis/apis/airline.api'
import SearchFlightComponent from '@/components/SearchFlightComponent'
import { useQuery } from '@tanstack/react-query'
import { Button, Collapse, CollapseProps, Input, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useMemo } from 'react'

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
    'You can book flight tickets online on our website or contact us via phone number 085 7311 444 for support.'
  const ans2: string = 'We support payments via: credit card, ATM card, bank transfer, and e-wallets.'
  const ans3: string =
    'Refund policies depend on the airline and the type of ticket you purchased. Please contact us for detailed advice.'

  const Q_AItems: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Text className='!font-semibold !text-slate-700 !text-base'>Question 1: How do I book a flight ticket?</Text>
      ),
      children: <p className='pl-6 text-slate-600 text-sm leading-relaxed'>{ans1}</p>,
      className:
        '!bg-white !mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 !border-0 !overflow-hidden'
    },
    {
      key: '2',
      label: (
        <Text className='!font-semibold !text-slate-700 !text-base'>Question 2: What payment methods can I use?</Text>
      ),
      children: <p className='pl-6 text-slate-600 text-sm leading-relaxed'>{ans2}</p>,
      className:
        '!bg-white !mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 !border-0 !overflow-hidden'
    },
    {
      key: '3',
      label: <Text className='!font-semibold !text-slate-700 !text-base'>Question 3: Can I get a refund?</Text>,
      children: <p className='pl-6 text-slate-600 text-sm leading-relaxed'>{ans3}</p>,
      className:
        '!bg-white !mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 !border-0 !overflow-hidden'
    }
  ]

  if (airlineOptions)
    return (
      <div className='flex flex-col bg-slate-50'>
        <div
          className='relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 md:p-6'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1504253163759-c23fccaebb55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' // New hero image
          }}
        >
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='relative z-10 text-center space-y-5 md:space-y-6 flex flex-col items-center justify-center max-w-3xl mx-auto'>
            <Title level={1} className='!text-white !text-4xl md:!text-5xl !font-bold drop-shadow-md text-shadow-lg'>
              Find Cheap Flights with FlyTime
            </Title>
            <Text className='!text-lg md:!text-xl !text-gray-500 drop-shadow-xl max-w-xl'>
              Discover the best deals just for you! Safe, convenient, and reliable.
            </Text>

            <SearchFlightComponent />
          </div>
        </div>

        <div className='py-16 md:py-20 px-6 md:px-12 bg-slate-100'>
          <div className='max-w-6xl mx-auto'>
            <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
              Trusted Airline Partners
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
            Customer Reviews
          </Title>
          <div
            style={{
              width: 'calc(300 * 5)',
              willChange: 'transform',
              msOverflowStyle: 'none', // IE and Edge
              scrollbarWidth: 'none' // Firefox
            }}
            className='flex animate-scroll gap-3 scrollbar-hide'
          >
            <div className='bg-slate-50 rounded-xl p-6 w-[320px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200'>
              <div className='mb-3'>
                <Text strong className='!block !text-slate-800 !text-lg'>
                  Nguyen Van A
                </Text>
                <Text type='secondary' className='!block !text-sm !text-slate-500'>
                  Hanoi
                </Text>
              </div>
              <p className='text-slate-600 text-sm mt-3 leading-relaxed'>
                "I am very satisfied with the company's service. The staff is enthusiastic, thoughtful, and always ready
                to assist me at all times. Will definitely come back!"
              </p>
            </div>
            <div className='bg-slate-50 rounded-xl p-6 w-[320px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200'>
              <div className='mb-3'>
                <Text strong className='!block !text-slate-800 !text-lg'>
                  Tran Thi B
                </Text>
                <Text type='secondary' className='!block !text-sm !text-slate-500'>
                  Da Nang
                </Text>
              </div>
              <p className='text-slate-600 text-sm mt-3 leading-relaxed'>
                "Quick and convenient booking, just a few steps. Prices are very competitive compared to other places.
                Highly recommended!"
              </p>
            </div>
            <div className='bg-slate-50 rounded-xl p-6 w-[320px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200'>
              <div className='mb-3'>
                <Text strong className='!block !text-slate-800 !text-lg'>
                  Le Huu C
                </Text>
                <Text type='secondary' className='!block !text-sm !text-slate-500'>
                  Ho Chi Minh City
                </Text>
              </div>
              <p className='text-slate-600 text-sm mt-3 leading-relaxed'>
                "Excellent experience from start to finish. Professional customer service. I will continue to use the
                company's service in the future."
              </p>
            </div>
          </div>
        </div>

        <div className='py-16 md:py-20 px-6 md:px-12 bg-slate-50'>
          <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
            Frequently Asked Questions
          </Title>
          <div className='max-w-3xl mx-auto'>
            <Collapse bordered={false} items={Q_AItems} className='bg-transparent' expandIconPosition='end' accordion />
          </div>
          <div className='mt-16 md:mt-20'>
            <Title level={2} className='!text-3xl !font-bold !text-slate-800 !mb-10 md:!mb-12 !text-center'>
              Popular Destinations
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
                    Hanoi
                  </Text>
                  <Text type='secondary' className='!block !text-sm !text-slate-500'>
                    The thousand-year-old capital of culture
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
                  <Text strong className='!block !text-lg !text-slate-800'>
                    Ho Chi Minh City
                  </Text>
                  <Text type='secondary' className='!block !text-sm !text-slate-500'>
                    The city that never sleeps
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
                  <Text strong className='!block !text-lg !text-slate-800'>
                    Da Nang
                  </Text>
                  <Text type='secondary' className='!block !text-sm !text-slate-500'>
                    The livable city
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
              Contact FlyTime
            </Title>
            <div className='space-y-5'>
              <Input
                size='large'
                type='text'
                placeholder='Your Name'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <Input
                size='large'
                type='text'
                placeholder='Phone Number'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <Input
                size='large'
                type='email'
                placeholder='Email Address'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <TextArea
                rows={4}
                placeholder='Your message for FlyTime'
                className='!rounded-md !border-slate-300 focus:!border-red-500 focus:!ring-1 focus:!ring-red-500 !text-slate-700'
              />
              <Button
                type='primary'
                className='w-full !bg-red-600 hover:!bg-red-700 !text-white !font-semibold !text-base !py-3 !h-auto !rounded-md !shadow-md hover:!shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'
                size='large'
              >
                Send Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HomePage
