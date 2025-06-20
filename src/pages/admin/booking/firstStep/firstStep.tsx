import TicketInformation from './ticketInformation/ticketInformation'
import DetailPrice from './detailPrice/detailPrice'
import DetailFlight from './detailFlight/detailFlight'

interface IProp {
  openNotification: (check?: number) => void
}

const FirstStep = ({ openNotification }: IProp) => {
  return (
    <div className='flex flex-col lg:flex-row gap-4 p-2'>
      {/* Left side: Ticket information */}
      <div className='lg:w-3/4 w-full'>
        <div className='grid grid-cols-1 gap-4'>
          <TicketInformation openNotification={openNotification} />
        </div>
      </div>

      {/* Right side: Detail flight and price */}
      <div className='lg:w-1/4 w-full flex flex-col gap-4'>
        <DetailFlight />
        <DetailPrice />
      </div>
    </div>
  )
}

export default FirstStep
