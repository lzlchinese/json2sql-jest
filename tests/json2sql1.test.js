process.env.LOG_LEVEL = "DEBUG";

const Json2sql = require("../json2sql.js");
const fs = require("fs");
const path = require("path");
const writeFileSync = jest.spyOn(fs, "writeFileSync");
const folderPath = "sql";
const jsonEmptyPath = "jsonEmpty";

beforeAll(async () => {
  // generate sql folder under the path of tests/sql
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  // generate jsonEmpty folder under the path of tests/jsonEmpty
  fs.mkdir(jsonEmptyPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
});

describe("convert-json test", () => {
  [
    // {
    //   index: "0001",
    //   jsonDir: "json",
    //   sqlDir: "sql",
    //   expected: "",
    // },
    {
      index: "0002",
      jsonDir: undefined,
      sqlDir: "sql",
      expected: "[ERROR] please input json directory path",
    },
    {
      index: "0003",
      jsonDir: null,
      sqlDir: "sql",
      expected: "[ERROR] please input json directory path",
    },
    {
      index: "0004",
      jsonDir: "",
      sqlDir: "sql",
      expected: "[ERROR] please input json directory path",
    },
    {
      index: "0005",
      jsonDir: 123,
      sqlDir: "sql",
      expected: "[ERROR] please input json directory path",
    },
    {
      index: "0006",
      jsonDir: [],
      sqlDir: "sql",
      expected: "[ERROR] please input json directory path",
    },
    {
      index: "0007",
      jsonDir: {},
      sqlDir: "sql",
      expected: "[ERROR] please input json directory path",
    },
    {
      index: "0008",
      jsonDir: "json1",
      sqlDir: "sql",
      expected: "[ERROR] read json directory failed",
    },
    {
      index: "0009",
      jsonDir: "jsonEmpty",
      sqlDir: "sql",
      expected: "[WARN] jsonFiles not found in",
    },
  ].forEach(({ index, jsonDir, sqlDir, expected }) => {
    it(`「case indexは${index},参数是「${JSON.stringify(
      jsonDir
    )}、${JSON.stringify(sqlDir)}」的场合、期望是「${JSON.stringify(
      expected
    )}」`, async () => {
      const consoleSpy = jest.spyOn(console, "log");
      const calls = console.log.mock.calls;
      const exitSpy = jest.spyOn(process, "exit").mockImplementation((code) => {
        return code;
      });
      Json2sql.convert(jsonDir, sqlDir);
      if (!expected) {
        expect(writeFileSync).toHaveBeenCalled();
      } else if (expected === "[ERROR] read json directory failed") {
        expect(calls[1][0]).toEqual("[ERROR] read json directory failed");
      } else if (expected === `[WARN] jsonFiles not found in`) {
        expect(calls[2][0]).toEqual(`[WARN] jsonFiles not found in ${jsonDir}`);
      } else {
        expect(exitSpy).toHaveBeenCalled();
        expect(writeFileSync).not.toHaveBeenCalled();
        expect(calls[1][0]).toEqual(expected);
      }
      consoleSpy.mockRestore();
    });
  });
});

describe("convert-sql test", () => {
  [
    {
      index: "0010",
      jsonDir: "json",
      sqlDir: undefined,
      expected: "[ERROR] please input sql directory path",
    },
    {
      index: "0011",
      jsonDir: "json",
      sqlDir: null,
      expected: "[ERROR] please input sql directory path",
    },
    {
      index: "0012",
      jsonDir: "json",
      sqlDir: "",
      expected: "[ERROR] please input sql directory path",
    },
    {
      index: "0013",
      jsonDir: "json",
      sqlDir: 123,
      expected: "[ERROR] please input sql directory path",
    },
    {
      index: "0014",
      jsonDir: "json",
      sqlDir: [],
      expected: "[ERROR] please input sql directory path",
    },
    {
      index: "0015",
      jsonDir: "json",
      sqlDir: {},
      expected: "[ERROR] please input sql directory path",
    },
    {
      index: "0016",
      jsonDir: "json",
      sqlDir: "sql1",
      expected: "[ERROR] write sql file failed",
    },
  ].forEach(({ index, jsonDir, sqlDir, expected }) => {
    it(`「case indexは${index},参数是「${JSON.stringify(
      jsonDir
    )}、${JSON.stringify(sqlDir)}」的场合、「${JSON.stringify(
      expected
    )}」となること`, async () => {
      const consoleSpy = jest.spyOn(console, "log");
      const calls = console.log.mock.calls;
      const exitSpy = jest.spyOn(process, "exit").mockImplementation((code) => {
        return code;
      });
      await Json2sql.convert(jsonDir, sqlDir);
      if (!expected) {
        expect(writeFileSync).toHaveBeenCalled();
      } else if (expected === "[ERROR] write sql file failed") {
        console.log(consoleSpy.mock.calls);
        expect(calls[10][0]).toEqual("[ERROR] write sql file failed");
      } else {
        // expect(consoleSpy).toHaveBeenCalledWith();
        expect(exitSpy).toHaveBeenCalled();
        // expect(writeFileSync).not.toHaveBeenCalled();
        expect(calls[1][0]).toEqual(expected);
      }
      consoleSpy.mockRestore();
    });
  });
});

// describe("readAndWrite test", () => {
//   [
//     {
//       index: "0017",
//       jsonDir: "json",
//       sqlDir: "sql",
//       jsonFiles: ["03A.json", "03BC.json"],
//       expected: "",
//     },
//     {
//       index: "0018",
//       jsonDir: "json",
//       sqlDir: "sql",
//       jsonFiles: ["03Aundefined.json"],
//       expected: "[ERROR] [03Aundefined.json] parse json failed",
//     },
//     {
//       index: "0019",
//       jsonDir: "json",
//       sqlDir: "sql",
//       jsonFiles: ["03Anull.json"],
//       expected: "[ERROR] [03Anull.json] content is not array",
//     },
//     {
//       index: "0020",
//       jsonDir: "json",
//       sqlDir: "sql",
//       jsonFiles: ["03AEmptySting.json"],
//       expected: "[ERROR] [03AEmptySting.json] content is not array",
//     },
//     {
//       index: "0021",
//       jsonDir: "json",
//       sqlDir: "sql",
//       jsonFiles: ["03AEmptyObject.json"],
//       expected: "See the log file for more error information",
//     },
//   ].forEach(({ index, jsonDir, sqlDir, jsonFiles, expected }) => {
//     it(`「case indexは${index}, 参数是「${JSON.stringify(
//       jsonDir
//     )}、${JSON.stringify(sqlDir)}、${JSON.stringify(
//       jsonFiles
//     )}」的场合、「${JSON.stringify(expected)}」となること`, async () => {
//       const consoleSpy = jest.spyOn(console, "log");
//       const calls = console.log.mock.calls;
//       await Json2sql.readAndWrite(jsonDir, sqlDir, jsonFiles);
//       console.log(consoleSpy.mock.calls);
//       expect(calls[0][0]).toEqual(
//         "[INFO] Converting started and will be finished in 3 seconds..."
//       );
//       if (!expected) {
//         expect(writeFileSync).toHaveBeenCalled();
//       } else {
//         if (expected === "[ERROR] [03Aundefined.json] parse json failed") {
//           expect(calls[1][0]).toEqual(
//             "[ERROR] [03Aundefined.json] parse json failed"
//           );
//         } else if (expected === "[ERROR] [03Anull.json] content is not array") {
//           expect(calls[1][0]).toEqual(
//             "[ERROR] [03Anull.json] content is not array"
//           );
//         } else if (
//           expected === "[ERROR] [03AEmptySting.json] content is not array"
//         ) {
//           expect(calls[1][0]).toEqual(
//             "[ERROR] [03AEmptySting.json] content is not array"
//           );
//         } else if (expected === "See the log file for more error information") {
//           expect(calls[5][0]).toEqual(
//             "See the log file for more error information: sql/log.txt"
//           );
//         }
//         expect(calls[2][0]).toEqual("[WARN] write content is empty");
//         expect(calls[3][0]).toMatch("[INFO] Conversion completed.");
//       }
//     });
//   });
// });

afterAll(async () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return;
    }
    // Delete all files under path: 'sql'
    files.forEach((file) => {
      const filePath = `${folderPath}/${file}`;
      if (fs.statSync(filePath).isDirectory()) {
        fs.removeSync(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    // Delete sql folder
    fs.rmdirSync(folderPath);
    // Delete jsonEmpty folder
    fs.rmdirSync(jsonEmptyPath);
  });
});
