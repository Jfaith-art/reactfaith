// The motor part categories. "value" is the search words we send to Pixabay.
const CATEGORIES = [
  { label: 'All Parts', value: 'motorcycle parts' },
  { label: 'Engine', value: 'motorcycle engine' },
  { label: 'Brakes', value: 'motorcycle brake' },
  { label: 'Tires & Wheels', value: 'motorcycle wheel' },
  { label: 'Exhaust', value: 'motorcycle exhaust' },
  { label: 'Chain & Sprocket', value: 'motorcycle chain' },
  { label: 'Headlight', value: 'motorcycle headlight' },
  { label: 'Speedometer', value: 'motorcycle speedometer' },
  { label: 'Spark Plug', value: 'spark plug' },
]

function Filters({ category, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="filters">
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="default">Sort: Best match</option>
        <option value="likes">Most liked</option>
        <option value="downloads">Most downloaded</option>
        <option value="views">Most viewed</option>
      </select>
    </div>
  )
}

export default Filters
