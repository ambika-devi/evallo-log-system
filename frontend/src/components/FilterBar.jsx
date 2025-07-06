import React from 'react';

const FilterBar = ({ onChange }) => (
  <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
    <input name="message" placeholder="Search Message" onChange={onChange} />
    <select name="level" onChange={onChange}>
      <option value="">All Levels</option>
      <option value="info">Info</option>
      <option value="warn">Warn</option>
      <option value="error">Error</option>
    </select>
    <input name="resourceId" placeholder="Resource ID" onChange={onChange} />
    <input type="datetime-local" name="timestamp_start" onChange={onChange} />
    <input type="datetime-local" name="timestamp_end" onChange={onChange} />
  </div>
);

export default FilterBar;
