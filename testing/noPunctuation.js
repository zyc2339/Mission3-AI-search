function noPunctuation(e) {
  return e.replace(/[^a-zA-Z ]/g, " ");
}

module.exports = noPunctuation;
