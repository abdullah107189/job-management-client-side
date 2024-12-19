import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState, } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { useLoaderData, useNavigate } from 'react-router-dom'

const UpdateJob = () => {

  const loadAddedJob = useLoaderData()
  const { _id, job_title, deadline, category, min_price, max_price, description, authorEmail } = loadAddedJob || {}
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = format(startDate, 'dd/MM/yyyy');
  useEffect(() => {
    if (deadline) {
      const [day, month, year] = deadline.split("/");
      const parsedDate = new Date(`${year}-${month}-${day}`);
      setStartDate(parsedDate);
    }
  }, [deadline]);
  const handleUpdateJob = (e) => {
    e.preventDefault()
    const getFormData = new FormData(e.target)
    const formDataEntries = Object.fromEntries(getFormData.entries())
    formDataEntries.deadline = formattedDate;

    const fetchAllJobs = async () => {
      try {
        const { data } = await axios.put(`http://localhost:5000/jobs/${_id}`, formDataEntries)
        console.log(data);
        if (data.modifiedCount) {
          toast.success('Update successful')
          navigate('/my-posted-jobs')
        }
      }
      catch (error) {
        console.log(error.messageF);
      }
    }
    fetchAllJobs();
  }
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Update a Job
        </h2>

        <form onSubmit={handleUpdateJob}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                defaultValue={job_title}
                name='job_title'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                readOnly
                defaultValue={authorEmail}
                id='emailAddress'
                type='email'
                name='email'
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              <DatePicker
                className='border p-2 rounded-md'
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700 ' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                defaultValue={category}
                id='category'
                className='border p-2 rounded-md'
              >
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                defaultValue={min_price}
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                defaultValue={max_price}
                id='max_price'
                name='max_price'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 ' htmlFor='description'>
              Description
            </label>
            <textarea
              defaultValue={description}
              className='block w-full min-h-[120px] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              cols='60'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button type='submit' className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob
