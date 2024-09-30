export default {
  escapeIfNeeded(value) {
    
    // Check if the value starts with one of the specified characters and prepend a double quote if it does.
    if (/^[=@\-+]/.test(value)) {
      // Prepend each instance of a double-quote in the cell with another double-quote (“).
      let escapedValue = value.replace(/"/g, '""');

      // Prepend a single-quote (‘) to the entire cell.
      let prepend_append = `'${escapedValue}`

      // Wrap the entire content of a cell with double-quotes (“”).
      return `"${prepend_append}"`;
    }

    return value;
  }
};