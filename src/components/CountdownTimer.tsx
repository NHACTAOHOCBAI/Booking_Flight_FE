export const CountdownTimer: React.FC<{ seconds: number | null }> = ({ seconds }) => {
  if (!seconds) seconds = 0
  return (
    <div className='text-sm text-red-600 font-medium mt-2'>
      ⏳ Vui lòng hoàn tất trong {Math.floor(seconds / 60)} phút {seconds % 60} giây
    </div>
  )
}
