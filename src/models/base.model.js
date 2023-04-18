const getColumnsValuesSQL = (obj) => {
  const columns = Object.keys(obj);
  const values = Object.values(obj).map((value) => "'"+value+"'");
  return [columns, values];
};

module.exports = {
  getColumnsValuesSQL
};