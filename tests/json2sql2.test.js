process.env.LOG_LEVEL = "DEBUG";

const { isEmpty } = require("lodash");
const Json2sql = require("../json2sql.js");

const data = {
  listId: "54c09b752e0000720247b5ca",
  remotepushTokens: {
    "5a88ef9d3c00003c00b3f489": {
      platform: "ios",
      token: "986ea5fa4329fc791dd096a767b70fe300eff40a65e9879151534d694b24fbde",
    },
    "5a7e78053d00003d00c02aed": {
      platform: "android",
      token:
        "cOTb7UiiRiKLEp9JNWhhGM:APA91bEG0PtwXpjZd-AgLxYfO5zKGVAh1Mxne_pOCPd14yjGAEh_tc4pV2B38s8zozwldnjSh8giy3-6aEzqN1IFCl1vzdGF-ZTCbHNvIagJfu_Eim8otxqSuRJyvsB6mw2w6RNq4M8E",
    },
  },
  bindTriggerId: "5a7e75913d00003c00a6bbbf",
  name: "fe00008a30623030303030303030306131",
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
};

const device = {
  _id: "--7e75923e00003e00720159",
  owner: "_root",
  sections: ["global/"],
  createdAt: "2018-02-10T04:31:14+00:00",
  updatedAt: "2023-08-08T04:07:08+00:00",
  version: 6124,
};

describe("convertJsonDataToSql test", () => {
  [
    {
      index: "0001",
      devices: [
        {
          ...device,
          data: data,
        },
      ],
      fileName: "03A.json",
      expected:
        "('B000000000A1','LowSpec','B000000000A1',0,'5a7e78053d00003d00c-----','5a88ef9d3c00003c00b-----','','02',NULL,'27','01.06 ','ON','ON','ON','ON', '2023-08-08T04:07:08+00:00', NOW(), NOW()),\n",
    },
    {
      index: "0002",
      devices: undefined,
      fileName: "03A.json",
      expected: "",
    },
    { index: "0003", devices: null, fileName: "03A.json", expected: "" },
    { index: "0004", devices: 123, fileName: "03A.json", expected: "" },
    { index: "0005", devices: {}, fileName: "03A.json", expected: "" },
    { index: "0006", devices: "", fileName: "03A.json", expected: "" },
    {
      index: "0007",
      devices: [
        {
          ...device,
          data: undefined,
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0008",
      devices: [
        {
          ...device,
          data: null,
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0009",
      devices: [
        {
          ...device,
          data: 123,
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0010",
      devices: [
        {
          ...device,
          data: {},
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0011",
      devices: [
        {
          ...device,
          data: [],
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0012",
      devices: [
        {
          ...device,
          data: "",
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0013",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: undefined,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0014",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: null,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0015",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: 123,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0016",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: {},
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0017",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: [],
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0018",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: "",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0019",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: "123",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0020",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: "fe00008a30xx",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0021",
      devices: [
        {
          ...device,
          data: {
            ...data,
            name: "fe00008a30000000000000000",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0022",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: undefined,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0023",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: null,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0024",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: 123,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0025",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: {},
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0026",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: [],
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0027",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: "",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0028",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: undefined,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0029",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: null,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0030",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: 123,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0031",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: {},
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0032",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: [],
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0033",
      devices: [
        {
          ...device,
          data: {
            ...data,
            version: "",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0034",
      devices: [
        {
          ...device,
          data: {
            ...data,
            users: null,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0035",
      devices: [
        {
          ...device,
          data: {
            ...data,
            users: 123,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0035",
      devices: [
        {
          ...device,
          data: {
            ...data,
            users: {},
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0037",
      devices: [
        {
          ...device,
          data: {
            ...data,
            users: "",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0038",
      devices: [
        {
          ...device,
          data: {
            ...data,
            users: ["a", "b"],
          },
        },
      ],
      fileName: "03A.json",
      expected:
        "('B000000000A1','LowSpec','B000000000A1',0,'5a7e78053d00003d00c-----','a,b','','02',NULL,'27','01.06 ','ON','ON','ON','ON', '2023-08-08T04:07:08+00:00', NOW(), NOW()),",
    },
    {
      index: "0039",
      devices: [
        {
          ...device,
          data: {
            ...data,
            owners: null,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0040",
      devices: [
        {
          ...device,
          data: {
            ...data,
            owners: 123,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0001",
      devices: [
        {
          ...device,
          data: {
            ...data,
            owners: {},
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0042",
      devices: [
        {
          ...device,
          data: {
            ...data,
            owners: "",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0043",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: null,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0044",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: 123,
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0045",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: [],
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0046",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: "",
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0047",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: null,
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0048",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: 123,
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0049",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: [],
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0050",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: "",
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0051",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: null,
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0052",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: [],
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0053",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: {},
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0054",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "",
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0055",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: 123,
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0056",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: null,
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0057",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: 123,
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0058",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: [],
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0059",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: {},
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0060",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "",
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
          },
        },
      ],
      fileName: "03A.json",
      expected:
        "('B000000000A1','LowSpec','B000000000A1',0,'5a7e78053d00003d00c-----','5a88ef9d3c00003c00b-----','','02',NULL,'27','01.06 ','ON','ON','ON','ON', '2023-08-08T04:07:08+00:00', NOW(), NOW()),",
    },
    {
      index: "0061",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "123",
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
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0062",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: null,
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0063",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: 123,
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0064",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: [],
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0064",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: "",
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0066",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: null,
                type: "TEXT",
                value: "",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0067",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: 123,
                type: "TEXT",
                value: "",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0068",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: [],
                type: "TEXT",
                value: "",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0069",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: {},
                type: "TEXT",
                value: "",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0070",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: "",
                type: "TEXT",
                value: "",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0071",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: 123,
                type: "TEXT",
                value: "",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0072",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: "displayName",
                type: "TEXT",
                value: null,
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0073",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: "displayName",
                type: "TEXT",
                value: "123",
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected:
        "('B000000000A1','LowSpec','123',0,'5a7e78053d00003d00c-----','5a88ef9d3c00003c00b-----','','02',NULL,'27','01.06 ','ON','ON','ON','ON', '2023-08-08T04:07:08+00:00', NOW(), NOW()),",
    },
    {
      index: "0074",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: "displayName",
                type: "TEXT",
                value: [],
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0075",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: "displayName",
                type: "TEXT",
                value: {},
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0076",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
          },
        },
      ],
      fileName: "03A.json",
      expected:
        "('B000000000A1','LowSpec','B000000000A1',0,'5a7e78053d00003d00c-----','5a88ef9d3c00003c00b-----','','02',NULL,'27','01.06 ','ON','ON','ON','ON', '2023-08-08T04:07:08+00:00', NOW(), NOW()),",
    },
    {
      index: "0077",
      devices: [
        {
          ...device,
          data: {
            ...data,
            modules: {
              VOPY61c6BaRrwKBo7fSFT6kc: {
                name: "powerRate",
                type: "TEXT",
                value: "27",
              },
              OSLifUytOMB0tiwEo3we3Va7: {
                name: "displayName",
                type: "TEXT",
                value: 123,
              },
              j5iOigNfyjjckP4iD0LBJj5u: {
                name: "mode",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0078",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
              j5iOigNfyjjckP4iD0LBJj5u: null,
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0079",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
              j5iOigNfyjjckP4iD0LBJj5u: 123,
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0080",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
              j5iOigNfyjjckP4iD0LBJj5u: [],
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0081",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
              j5iOigNfyjjckP4iD0LBJj5u: "",
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0082",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                name: null,
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0083",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                name: 123,
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0084",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                name: [],
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0085",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                name: {},
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0086",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                name: "",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0087",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                name: "123",
                type: "TEXT",
                value: "02",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0088",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                value: null,
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0089",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                value: 123,
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0090",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                value: [],
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0091",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                value: {},
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
    {
      index: "0092",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                value: "",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected:
        "('B000000000A1','LowSpec','B000000000A1',0,'5a7e78053d00003d00c-----','5a88ef9d3c00003c00b-----','','03',NULL,'27','01.06 ','ON','ON','ON','ON', '2023-08-08T04:07:08+00:00', NOW(), NOW()),",
    },
    {
      index: "0093",
      devices: [
        {
          ...device,
          data: {
            ...data,
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
                value: "123",
              },
            },
          },
        },
      ],
      fileName: "03A.json",
      expected: "",
    },
  ].forEach(({ index, devices, fileName, expected }) => {
    it(`「case indexは${index}, 参数是「${JSON.stringify(
      devices
    )}、${JSON.stringify(fileName)}」的场合、期望是「${JSON.stringify(
      expected
    )}」`, async () => {
      const result = await Json2sql.convertJsonDataToSql(devices, fileName);
      if (!isEmpty(expected)) {
        expect(result).toMatch(expected);
      } else {
        expect(result).toBe(expected);
      }
    });
  });
});
