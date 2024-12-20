/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const JobCard = ({ allJob }) => {
  const { _id, job_title, deadline, category, min_price, max_price, description, total_bids } = allJob || {}
  return (
    <Link
      to={`/job/${_id}`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          Deadline: {deadline}
        </span>
        <span className={`${category === 'Web Development' ? 'text-blue-500 bg-blue-100/60' : category === 'Graphics Design' ? 'text-orange-500 bg-orange-100/60' : 'text-green-500 bg-green-100/60'} px-3 py-1 text-[8px]  uppercase rounded-full `}>
          {category}
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {job_title}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          {description?.slice(0, 100)}...
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: ${min_price} - ${max_price}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>Total Bids: {total_bids || 0}</p>
      </div>
    </Link>
  )
}

export default JobCard
