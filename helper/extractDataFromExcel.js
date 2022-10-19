const reader = require("xlsx");
const path = require("path");

module.exports = async function getDataFromExcel(path) {
  const file = reader.readFile(path);
  let data = [];
  let sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = await reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]]
    );
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data;
};
