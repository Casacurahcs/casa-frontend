import Header from './components/Header'
import PatientForm from './components/PatientForm'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <PatientForm />
      </main>
    </div>
  )
}
