import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Card, Spin, message } from 'antd'
import { FaPlane, FaSearch, FaUser, FaHashtag, FaMapMarkerAlt } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'
import { useGetAllTickets } from '@/hooks/useTicket'
import { MyProfileTicketRes } from '@/globalType/myProfile.type'

interface ISearchParams {
  email: string
  name: string
  flightCode: string
  idCard: string
}

const TicketSearchPage: React.FC = () => {
  const [form] = Form.useForm()
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    email: '',
    name: '',
    flightCode: '',
    idCard: ''
  })
  const [searchResults, setSearchResults] = useState<MyProfileTicketRes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [filterTicket, setFilterTicket] = useState('')
  const { data, refetch } = useGetAllTickets({ filter: filterTicket }, false)
  const [shouldFetch, setShouldFetch] = useState(false)
  useEffect(() => {
    if (shouldFetch) {
      refetch().then((res) => {
        const results = res.data?.data.result ?? []
        setSearchResults(results)
        setIsLoading(false)

        if (results.length === 0) {
          message.info('No tickets found matching your criteria.')
        } else {
          message.success(`${results.length} ticket(s) found.`)
        }

        setShouldFetch(false)
      })
    }
  }, [filterTicket, shouldFetch, refetch])

  // const handleSearch = (values: ISearchParams) => {
  //   setIsLoading(true)
  //   setHasSearched(true)
  //   message.destroy()

  //   const { email, name, flightCode, idCard } = values
  //   const conditions: string[] = []
  //   // `ticketStatus:'BOOKED'`

  //   if (email) {
  //     conditions.push(`passengerEmail~'${email}'`)
  //   }
  //   if (name) {
  //     conditions.push(`passengerName~'${name}'`)
  //   }
  //   if (idCard) {
  //     conditions.push(`passengerIDCard~'${idCard}'`)
  //   }
  //   if (flightCode) {
  //     conditions.push(`flight.flightCode~'${flightCode}'`)
  //   }

  //   const filter = conditions.join(' and ')

  //   setFilterTicket(filter)
  //   setShouldFetch(true)
  // }
  const handleSearch = (values: ISearchParams) => {
    const { email, name, flightCode, idCard } = values

    // Nếu tất cả đều rỗng
    if (!email && !name && !flightCode && !idCard) {
      message.error('Please enter at least one search field.')
      return
    }

    setIsLoading(true)
    setHasSearched(true)
    message.destroy()

    const conditions: string[] = [`passengerName!''`]

    if (email) conditions.push(`passengerEmail~'${email}'`)
    if (name) conditions.push(`passengerName~'${name}'`)
    if (idCard) conditions.push(`passengerIDCard~'${idCard}'`)
    if (flightCode) conditions.push(`flight.flightCode~'${flightCode}'`)

    const filter = conditions.join(' and ')
    setFilterTicket(filter)
    setShouldFetch(true)
  }

  const handleReset = () => {
    form.resetFields()
    setSearchParams({ email: '', name: '', flightCode: '', idCard: '' })
    setSearchResults([])
    setHasSearched(false)
    message.destroy()
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Card
          className='rounded-2xl shadow-xl p-4 mb-8'
          title={
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>Find Your Flight Ticket</h2>
              <p className='text-gray-600'>Search for your booking using email, name, flight code, or ID card</p>
            </div>
          }
        >
          <Form
            form={form}
            name='flight_search'
            layout='vertical'
            onFinish={handleSearch}
            initialValues={searchParams}
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            <Form.Item
              name='email'
              label={
                <span className='block text-sm font-medium text-gray-700'>
                  <MdMail className='inline h-4 w-4 mr-2' />
                  Email Address
                </span>
              }
              rules={[{ type: 'email', message: 'The input is not a valid E-mail!' }]}
            >
              <Input
                placeholder='Enter your email'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              name='name'
              label={
                <span className='block text-sm font-medium text-gray-700'>
                  <FaUser className='inline h-4 w-4 mr-2' />
                  Passenger Name
                </span>
              }
            >
              <Input
                placeholder='Enter passenger name'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              name='flightCode'
              label={
                <span className='block text-sm font-medium text-gray-700'>
                  <FaHashtag className='inline h-4 w-4 mr-2' />
                  Flight Code
                </span>
              }
            >
              <Input
                placeholder='Enter flight code'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              name='idCard'
              label={
                <span className='block text-sm font-medium text-gray-700'>
                  <FaUser className='inline h-4 w-4 mr-2' />
                  ID Card Number
                </span>
              }
            >
              <Input
                placeholder='Enter ID card number'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item className='col-span-1 md:col-span-2 flex justify-end py-2'>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
                className='items-center px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                size='large'
              >
                <FaSearch className='h-3 w-3 mr-2' />
                {isLoading ? 'Searching...' : 'Search Tickets'}
              </Button>
              <Button
                type='primary'
                onClick={handleReset}
                className='items-center px-8 mx-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
                size='large'
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {isLoading && (
          <Card className='rounded-2xl shadow-xl p-8 text-center'>
            <Spin size='large' className='mb-4' />
            <p className='text-gray-600'>Searching for your tickets...</p>
          </Card>
        )}

        {!isLoading && hasSearched && (
          <Card
            className='rounded-2xl shadow-xl p-4'
            title={
              <h3 className='text-2xl font-bold text-gray-900'>
                Search Results ({searchResults.length} {searchResults.length === 1 ? 'ticket' : 'tickets'} found)
              </h3>
            }
          >
            {searchResults.length === 0 ? (
              <div className='text-center py-12'>
                <div className='mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <FaSearch className='h-12 w-12 text-gray-400' />
                </div>
                <h4 className='text-lg font-medium text-gray-900 mb-2'>No tickets found</h4>
                <p className='text-gray-600'>Please check your search criteria and try again.</p>
              </div>
            ) : (
              <div className='space-y-6'>
                {searchResults.map((ticket) => (
                  <Card key={ticket.id} className='border border-gray-200 rounded-xl hover:shadow-lg transition-shadow'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                      <div className='lg:col-span-2'>
                        <div className='flex items-center justify-between mb-4'>
                          <div className='flex items-center space-x-3'>
                            <div className='p-2 bg-blue-100 rounded-lg'>
                              <FaPlane className='h-5 w-5 text-blue-600' />
                            </div>
                            <div>
                              <h4 className='text-lg font-semibold text-gray-900'>{ticket.flight.flightCode}</h4>
                              <p className='text-sm text-gray-600'>{ticket.passengerName}</p>
                            </div>
                          </div>
                          <div className='text-right'>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                ticket.ticketStatus === 'Confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {ticket.ticketStatus}
                            </span>
                          </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='flex items-center space-x-3'>
                            <FaMapMarkerAlt className='h-4 w-4 text-gray-400' />
                            <div>
                              <p className='text-sm font-medium text-gray-900'>From</p>
                              <p className='text-sm text-gray-600'>{ticket.flight.departureAirport!.airportName}</p>
                            </div>
                          </div>
                          <div className='flex items-center space-x-3'>
                            <FaMapMarkerAlt className='h-4 w-4 text-gray-400' />
                            <div>
                              <p className='text-sm font-medium text-gray-900'>To</p>
                              <p className='text-sm text-gray-600'>{ticket.flight.arrivalAirport!.airportName}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='bg-gray-50 rounded-lg p-4'>
                        <h5 className='font-medium text-gray-900 mb-3'>Ticket Details</h5>
                        <div className='space-y-2 text-sm'>
                          {/* <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>Date:</span>
                            <span className='font-medium'>{ticket.flight.departureTime}</span>
                          </div> */}
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>Departure:</span>
                            <span className='font-medium'>{ticket.flight.departureTime}</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>Arrival:</span>
                            <span className='font-medium'>{ticket.flight.arrivalTime}</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>Seat:</span>
                            <span className='font-medium'>{ticket.seatNumber}</span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>Ticket image:</span>
                            <a
                              href={ticket.urlImage}
                              download='ticket-image.jpg'
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Download image
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

export default TicketSearchPage
