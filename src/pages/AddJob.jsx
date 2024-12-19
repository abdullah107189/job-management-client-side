import { useContext, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from "date-fns";
import 'react-datepicker/dist/react-datepicker.css'
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const { user } = useContext(AuthContext)
  const [startDate, setStartDate] = useState(new Date())
  const formattedDate = format(startDate, 'dd/MM/yyyy');
  const navigate = useNavigate()
  const handleAddJob = (e) => {
    e.preventDefault()
    const getFormData = new FormData(e.target)
    const formDataEntries = Object.fromEntries(getFormData.entries())
    formDataEntries.deadline = formattedDate;

    const fetchAllJobs = async () => {
      try {
        const { data } = await axios.post('http://localhost:5000/jobs', formDataEntries)
        if (data.insertedId) {
          toast.success('Added successful')
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
    <div className='flex  justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md md:w-1/2'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Post a Job
        </h2>

        <form onSubmit={handleAddJob} className=''>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                required
                id='job_title'
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
                defaultValue={user?.email}
                id='emailAddress'
                type='email'
                name='authorEmail'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                dateFormat="dd/MM/yyyy"
                className='border p-2 rounded-md'
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
                required
                name='min_price'
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                required
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
              required
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob
