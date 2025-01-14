process.env.LOG_LEVEL = "DEBUG";

const Json2sql = require("../json2sql.js");

const deviceData = {
  _id: "03B000000002",
  name: "B000000000B2",
  sections: [],
  sectionAliases: [],
  updatedAt: "2023-08-07T19:59:35+00:00",
  version: 127,
  data: {
    adapter_association_token: "AYmSS0tHLCbZFwO",
    google_home_users: [],
    push_notification_flag: {
      remind_of_turning_off: true,
      power_on_off: false,
      monitoring: true,
      ai_recommendation: true,
    },
    city_code: "01---",
    adapter_type: "HighSpec",
    display_name: "グミ用エアコン",
    zip_code: "001----",
    mode: "02",
    group_id: 19,
    power_rate: "27",
    adapter_refresh_token: "refreshToken_vem2iNKtKLVSiyHHjuT2",
    adapter_firmware_version: "E073V03P01L12-2",
    is_migrated: "true",
  },
  readonly: {
    owner: "62732731e5aa2d10975-----",
    members: ["62733091f67ccf05c7a-----"],
    created_at: "2022-05-05T01:53:11.815+00:00",
  },
  rootonly: {},
};

const data = {
  adapter_association_token: "AYmSS0tHLCbZFwO",
  google_home_users: [],
  push_notification_flag: {
    remind_of_turning_off: true,
    power_on_off: false,
    monitoring: true,
    ai_recommendation: true,
  },
  city_code: "01---",
  adapter_type: "HighSpec",
  display_name: "グミ用エアコン",
  zip_code: "001----",
  mode: "02",
  group_id: 19,
  power_rate: "27",
  adapter_refresh_token: "refreshToken_vem2iNKtKLVSiyHHjuT2",
  adapter_firmware_version: "E073V03P01L12-2",
  is_migrated: "true",
};

const device = {
  _id: "03B000000002",
  name: "B000000000B2",
  sections: [],
  sectionAliases: [],
  updatedAt: "2023-08-07T19:59:35+00:00",
  version: 127,
};

describe("convertJsonDataToSql test", () => {
  [
    {
      index: "0001",
      devices: [deviceData],
      fileName: "03BC.json",
      expected:
        "('B000000000B2','HighSpec','グミ用エアコン',0,'62732731e5aa2d10975-----','62733091f67ccf05c7a-----','001----','02',19,'27','E073V03P01L12-2','ON','ON','ON','ON', '2023-08-07T19:59:35+00:00', NOW(), NOW()),\n",
    },
    {
      index: "0002",
      devices: undefined,
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0003",
      devices: null,
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0004",
      devices: 123,
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0005",
      devices: {},
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0006",
      devices: "",
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0007",
      devices: [
        {
          ...deviceData,
          name: undefined,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0008",
      devices: [
        {
          ...deviceData,
          name: null,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0009",
      devices: [
        {
          ...deviceData,
          name: 123,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0010",
      devices: [
        {
          ...deviceData,
          name: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0011",
      devices: [
        {
          ...deviceData,
          name: [],
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0012",
      devices: [
        {
          ...deviceData,
          name: "",
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0013",
      devices: [
        {
          ...deviceData,
          name: "123",
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0014",
      devices: [
        {
          ...deviceData,
          data: undefined,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0015",
      devices: [
        {
          ...deviceData,
          data: null,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0016",
      devices: [
        {
          ...deviceData,
          data: 123,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0017",
      devices: [
        {
          ...deviceData,
          data: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0018",
      devices: [
        {
          ...deviceData,
          data: [],
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0019",
      devices: [
        {
          ...deviceData,
          data: "",
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0020",
      devices: [
        {
          ...deviceData,
          data: "123",
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0021",
      devices: [
        {
          ...deviceData,
          readonly: null,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0022",
      devices: [
        {
          ...deviceData,
          readonly: 123,
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0023",
      devices: [
        {
          ...deviceData,
          readonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0024",
      devices: [
        {
          ...deviceData,
          readonly: [],
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0025",
      devices: [
        {
          ...deviceData,
          readonly: "",
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0026",
      devices: [
        {
          ...deviceData,
          readonly: "123",
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0027",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: undefined,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0028",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: null,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0029",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: 123,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0030",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: {},
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0031",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: [],
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0032",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: "",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0033",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: "123",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0034",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_type: "LowSpec",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0035",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: undefined,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0036",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: null,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0037",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: 123,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0038",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: {},
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0039",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: [],
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0040",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: "",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0041",
      devices: [
        {
          ...device,
          data: {
            ...data,
            mode: "ABC",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0042",
      devices: [
        {
          ...device,
          data: {
            ...data,
            group_id: undefined,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0043",
      devices: [
        {
          ...device,
          data: {
            ...data,
            group_id: null,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0044",
      devices: [
        {
          ...device,
          data: {
            ...data,
            group_id: {},
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    // 0045
    {
      index: "0045",
      devices: [
        {
          ...device,
          data: {
            ...data,
            group_id: [],
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0046",
      devices: [
        {
          ...device,
          data: {
            ...data,
            group_id: "",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0047",
      devices: [
        {
          ...device,
          data: {
            ...data,
            group_id: "ABC",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0048",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: undefined,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0049",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: null,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0050",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: {},
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    // 0051
    {
      index: "0051",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: [],
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0052",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: "",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0053",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: "ABC",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0054",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: -1,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0055",
      devices: [
        {
          ...device,
          data: {
            ...data,
            power_rate: 48,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0056",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_firmware_version: undefined,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0057",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_firmware_version: null,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0058",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_firmware_version: {},
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0059",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_firmware_version: [],
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0060",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_firmware_version: "",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0061",
      devices: [
        {
          ...device,
          data: {
            ...data,
            adapter_firmware_version: 123,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0062",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: [],
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0063",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: "",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0064",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: "ABC",
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0065",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: 123,
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0066",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: null,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0067",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: {},
              power_on_off: false,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0068",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: [],
              power_on_off: false,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0069",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: "",
              power_on_off: false,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0070",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: "ABC",
              power_on_off: false,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0071",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: 123,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0072",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: null,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0073",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: {},
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0074",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: [],
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0075",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: "",
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0076",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: "ABC",
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0077",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: 123,
              monitoring: true,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0078",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: null,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0079",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: {},
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0080",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: [],
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0081",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: "",
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0082",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: "ABC",
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0083",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: 123,
              ai_recommendation: true,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0084",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: null,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0085",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: {},
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0086",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: [],
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0087",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: "",
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0088",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: "ABC",
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0089",
      devices: [
        {
          ...device,
          data: {
            ...data,
            push_notification_flag: {
              remind_of_turning_off: true,
              power_on_off: false,
              monitoring: true,
              ai_recommendation: 123,
            },
          },
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
          rootonly: {},
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0090",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: null,
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0091",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: 123,
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0092",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: {},
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0093",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: [],
            members: ["62733091f67ccf05c7a-----"],
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0094",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: null,
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0095",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: 123,
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0096",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: {},
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
    {
      index: "0097",
      devices: [
        {
          ...deviceData,
          readonly: {
            owner: "62732731e5aa2d10975-----",
            members: "",
            created_at: "2022-05-05T01:53:11.815+00:00",
          },
        },
      ],
      fileName: "03BC.json",
      expected: "",
    },
  ].forEach(({ index, devices, fileName, expected }) => {
    it(`「case indexは${index}, 参数是「${JSON.stringify(
      devices
    )}、${JSON.stringify(fileName)}」的场合、期望是「${JSON.stringify(
      expected
    )}」`, async () => {
      const result = await Json2sql.convertJsonDataToSql(devices, fileName);
      expect(result).toBe(expected);
    });
  });
});
