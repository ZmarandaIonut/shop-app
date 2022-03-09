import React from 'react'

export default function PagesPanel({setSortOptions,sortOptions,setFilterOptions, filterOption, sectionTitle}) {
    return (
        <div className="pages-panel-container">
                <h2 className="pages-panel-title">{sectionTitle}</h2>
                <div className="pages-panel-options">
                   <div className="page-panel-sort-option">
                   <label>Sort by:</label>
                   <select value={sortOptions} className="page-panel-options-container" onChange={(e) => setSortOptions(e.target.value)}>
                       <option>None</option>
                       <option>Low Price</option>
                       <option>High Price</option>
                   </select>
                   </div>
                   <div className="page-panel-filter-option">
                   <label>Filter:</label>
                   <select value={filterOption} className="page-panel-options-container" onChange={(e) => setFilterOptions(e.target.value)}>
                       <option>None</option>
                       <option>Min-Max</option>
                   </select>
                   </div>
                </div>
            </div>
    )
}
