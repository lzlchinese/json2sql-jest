process.env.LOG_LEVEL = "DEBUG";

const Json2sql = require("../json2sql.js");
const fs = require("fs");
const path = require("path");
// const writeFileSync = jest.spyOn(fs, 'writeFileSync');
jest.mock("fs");
fs.writeFileSync = () => {
  throw new Error("error");
};
fs.readFileSync = () => {
  return JSON.stringify([
    {
      _id: "--7e75923e00003e00720159",
      owner: "_root",
      sections: ["global/"],
      createdAt: "2018-02-10T04:31:14+00:00",
      updatedAt: "2023-08-08T04:07:08+00:00",
      version: 6124,
      data: {
        listId: "54c09b752e0000720247b5ca",
        remotepushTokens: {
          "5a88ef9d3c00003c00b3f489": {
            platform: "ios",
            token:
              "986ea5fa4329fc791dd096a767b70fe300eff40a65e9879151534d694b24fbde",
          },
          "5a7e78053d00003d00c02aed": {
            platform: "android",
            token:
              "cOTb7UiiRiKLEp9JNWhhGM:APA91bEG0PtwXpjZd-AgLxYfO5zKGVAh1Mxne_pOCPd14yjGAEh_tc4pV2B38s8zozwldnjSh8giy3-6aEzqN1IFCl1vzdGF-ZTCbHNvIagJfu_Eim8otxqSuRJyvsB6mw2w6RNq4M8E",
          },
        },
        bindTriggerId: "5a7e75913d00003c00a6bbbf",
        name: "fe00008a306230303030303030303061310000000",
        owners: ["5a7e78053d00003d00c-----"],
        version: "01.06 ",
        roomId: "5a7e75923d00003d00a6bbc2",
        users: ["5a88ef9d3c00003c00b-----"],
        modules: {
          VOPY61c6BaRrwKBo7fSFT6kc: {
            name: "powerRate",
            type: "TEXT",
            value: "27",
          },
          OSLifUytOMB0tiwEo3we3Va7: {
            name: "displayName",
            type: "TEXT",
            value: "",
          },
          j5iOigNfyjjckP4iD0LBJj5u: {
            name: "mode",
            type: "TEXT",
            value: "02",
          },
        },
        is_migrated: true,
      },
    },
  ]);
};
const folderPath = "sql";
describe("readAndWrite test", () => {
  [
    {
      jsonDir: "json",
      sqlDir: "sql",
      jsonFiles: ["03A.json", "03BC.json"],
      expected: "error",
    },
  ].forEach(({ jsonDir, sqlDir, jsonFiles, expected }) => {
    it(`「参数是「${JSON.stringify(jsonDir)}、${JSON.stringify(
      sqlDir
    )}、${JSON.stringify(jsonFiles)}」的场合、期望是「${JSON.stringify(
      expected
    )}」`, async () => {
      try {
        const consoleSpy = jest.spyOn(console, "log");
        const calls = console.log.mock.calls;
        await Json2sql.readAndWrite(jsonDir, sqlDir, jsonFiles);
        console.log(consoleSpy.mock.calls);
        expect(calls[0][0]).toEqual(
          "[INFO] Converting started and will be finished in 3 seconds..."
        );
        expect(calls[1][0]).toEqual(
          "[ERROR] [03Aundefined.json] parse json failed"
        );
        expect(calls[2][0]).toEqual("[WARN] write content is empty");
        expect(calls[3][0]).toMatch("[INFO] Conversion completed.");
      } catch (error) {
        expect(error.message).toEqual(expected);
      }
    });
  });
});

// Delete all files under path: 'sql'
afterAll(async () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  });
});
