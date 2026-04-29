import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

function ModalEditRecord({ isOpen, onClose, onSubmit, data }) {
  const [formData, setFormData] = useState(data)
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
    onSubmit(formData)
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
  }
  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
    onClose()
  }

  useEffect( () => {
    setFormData(data);
  }, [data])

  if (!isOpen) return null

  const handleValidation = () => {
    if (!formData?.name || !formData?.variety) {
      return false
    }
    return true
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Plant Record</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plant Name */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_name" className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="edit_name"
                type="text"
                name="name"
                value={formData?.name || ''}
                onChange={handleChange}
                placeholder="Enter plant name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Variety */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_variety" className="block text-sm font-medium text-gray-700 mb-2">
                Variety <span className="text-red-500">*</span>
              </label>
              <select
                id="edit_variety"
                name="variety"
                value={formData?.variety || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Select variety</option>
                {plantVarieties.map((variety) => (
                  <option key={variety} value={variety}>
                    {variety}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Name */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_batch_name" className="block text-sm font-medium text-gray-700 mb-2">
                Batch Name
              </label>
              <input
                id="edit_batch_name"
                type="text"
                name="batch_name"
                value={formData?.batch_name || ''}
                onChange={handleChange}
                placeholder="Enter batch name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Seedling Count */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_seedling_count" className="block text-sm font-medium text-gray-700 mb-2">
                Seedling Count
              </label>
              <input
                id="edit_seedling_count"
                type="number"
                name="seedling_count"
                value={formData?.seedling_count || ''}
                onChange={handleChange}
                placeholder="Enter seedling count"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Supplier/Seedling Source */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_supplier" className="block text-sm font-medium text-gray-700 mb-2">
                Seedling Source
              </label>
              <input
                id="edit_supplier"
                type="text"
                name="supplier"
                value={formData?.supplier || ''}
                onChange={handleChange}
                placeholder="Enter seedling source"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Starting Fund */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_starting_fund" className="block text-sm font-medium text-gray-700 mb-2">
                Starting Fund
              </label>
              <InputPriceField
                id="edit_starting_fund"
                name="starting_fund"
                placeholder="0.00"
                formData={formData || {}}
                setFormData={setFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Date Planted */}
            <div className="col-span-1 md:col-span-1">
              <label htmlFor="edit_date_planted" className="block text-sm font-medium text-gray-700 mb-2">
                Date Planted
              </label>
              <input
                id="edit_date_planted"
                type="date"
                name="date_planted"
                value={formData?.date_planted || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label htmlFor="edit_notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                id="edit_notes"
                name="notes"
                value={formData?.notes || ''}
                onChange={handleChange}
                placeholder="Enter any additional notes"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!handleValidation()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEditRecord;
