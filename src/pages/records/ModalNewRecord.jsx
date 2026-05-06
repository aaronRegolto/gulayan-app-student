import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

const initialFormState = {
  name: '',
  variety: '',
  notes: '',
  date_planted: '',
  seedling_count: '',
  batch_name: '',
  starting_fund: '',
  supplier: ''
}

function ModalNewRecord({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormState)
  const plantVarieties = [
    "Vegetables",
    "Leafy Greens",
    "Root Crops",
    "Herbs",
    "Fruits",
    "Legumes",
    "Spices",
    "Mushrooms",
    "Ornamentals",
    "Medicinal Plants",
    "Vines",
    "Fruit Trees",
    "Other",
    "Unknown",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const requiredFields = [
      'name',
      'variety',
      'batch_name',
      'seedling_count',
      'supplier',
      'starting_fund',
      'date_planted'
    ]

    const isValid = requiredFields.every((field) => formData[field]?.toString().trim())
    if (!isValid) {
      return
    }

    onSubmit(formData)
    setFormData(initialFormState)
  }

  const handleClose = () => {
    setFormData(initialFormState)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Plant</h2>
            <p className="text-sm text-gray-500 mt-1">Fill out the form to add a new plant record.</p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Plant name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Variety <span className="text-red-500">*</span></span>
                <select
                  id="variety"
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="" disabled>Select variety</option>
                  {plantVarieties.map((variety) => (
                    <option key={variety} value={variety}>{variety}</option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Batch Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  id="batch_name"
                  name="batch_name"
                  value={formData.batch_name}
                  onChange={handleChange}
                  placeholder="Batch-001"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Seedling Count <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  id="seedling_count"
                  name="seedling_count"
                  inputMode="numeric"
                  value={formData.seedling_count}
                  onChange={handleChange}
                  placeholder="100"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Seedling Source <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Local farm"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Starting Fund <span className="text-red-500">*</span></span>
                <InputPriceField
                  id="starting_fund"
                  name="starting_fund"
                  placeholder="₱0"
                  formData={formData}
                  setFormData={setFormData}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Date Planted <span className="text-red-500">*</span></span>
                <input
                  type="date"
                  id="date_planted"
                  name="date_planted"
                  value={formData.date_planted}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Notes</span>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add optional notes about this plant"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalNewRecord
