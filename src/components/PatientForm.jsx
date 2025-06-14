import { useState } from 'react'
import axios from 'axios'

export default function PatientForm() {
  const [formData, setFormData] = useState({
    patient_id: '',
    date: '',
    service: '',
    progress: '',
    goals: ''
  })

  const [status, setStatus] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('Submitting...')

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_NOCODB_URL}/tables/mi089wq8x4fgf01/records`,
        {
          fields: formData
        },
        {
          headers: {
            'xc-token': import.meta.env.VITE_NOCODB_TOKEN
          }
        }
      )
      setStatus('Submitted ✅')
      setFormData({
        patient_id: '',
        date: '',
        service: '',
        progress: '',
        goals: ''
      })
    } catch (err) {
      console.error(err)
      setStatus('Error ❌')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="patient_id" placeholder="Patient ID" value={formData.patient_id} onChange={handleChange} className="input" required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} className="input" required />
      <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} className="input" required />
      <textarea name="progress" placeholder="Progress Notes" value={formData.progress} onChange={handleChange} className="input" />
      <textarea name="goals" placeholder="Goals" value={formData.goals} onChange={handleChange} className="input" />
      <button type="submit" className="bg-nhsgreen text-white px-4 py-2 rounded">Submit</button>
      {status && <p>{status}</p>}
    </form>
  )
}
