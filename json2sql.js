/**
 * @file [migration] Implement json file to sql file
 * @module json2sql
 * @author FNST)hanxl
 */
const fs = require('fs');
const { isEmpty, isArray, isString } = require('lodash');
const moment = require('moment');

// save check errors
let checkErrorStr = '';
let ownerEmptyStr = '';
// device total, OK tatal, NG total
const deviceStatic = {
    total: 0,
    OKTotal: 0,
    NGTotal: 0,
};

/**
 * @typedef {object} DeviceAObj
 * @property {object} data - device.data
 * @property {string} data.name - アダプタの識別子
 * @property {string[]} data.owners - 管理ユーザのID
 * @property {string[]} data.users - サブユーザのID
 * @property {object} data.modules
 * @property {object} data.modules.VOPY61c6BaRrwKBo7fSFT6kc
 * @property {string} data.modules.VOPY61c6BaRrwKBo7fSFT6kc.name - 電気単価
 * @property {string} data.modules.VOPY61c6BaRrwKBo7fSFT6kc.value
 * @property {object} data.modules.OSLifUytOMB0tiwEo3we3Va7
 * @property {string} data.modules.OSLifUytOMB0tiwEo3we3Va7.name - エアコン名
 * @property {string} data.modules.OSLifUytOMB0tiwEo3we3Va7.value
 * @property {object} data.modules.j5iOigNfyjjckP4iD0LBJj5u
 * @property {string} data.modules.j5iOigNfyjjckP4iD0LBJj5u.name - モード設定情報(Echonetliteモード/クラウドモードの設定)
 * @property {string} data.modules.j5iOigNfyjjckP4iD0LBJj5u.value
 */

/**
 * @typedef {object} DeviceBCObj
 * @property {string} name - device.name
 * @property {object} data - アダプタの識別子
 * @property {object} data.push_notification_flag - Push通知設定
 * @property {boolean} data.push_notification_flag.remind_of_turning_off - 消し忘れ
 * @property {boolean} data.push_notification_flag.power_on_off - 運転/停止
 * @property {boolean} data.push_notification_flag.monitoring - みまもり
 * @property {boolean} data.push_notification_flag.ai_recommendation - 運転提案
 * @property {string} data.adapter_type - アダプタ機種(StdSpec：OP-J03B, HighSpec：OP-J03C)
 * @property {string} data.display_name - エアコン名
 * @property {string} data.zip_code - 郵便番号
 * @property {string} data.mode - モード設定情報(Echonetliteモード/クラウドモードの設定)
 * @property {number} data.group_id - アダプタのグループID
 * @property {string} data.power_rate - 電気単価
 * @property {string} data.adapter_firmware_version - アダプタFWバージョン
 * @property {object} readonly
 * @property {string} readonly.owner - 管理ユーザのID
 * @property {string[]} readonly.members - サブユーザのID
 */

// check rule definite
const ADAPTER_CHECK_DEF = {
    '03A_ADAPTER': {
        rules: {
            data: {
                required: {
                    data: true,
                },
                type: {
                    data: 'object',
                },
            },
        },
    },
    '03A_ADAPTER_DATA': {
        rules: {
            name: {
                required: {
                    data: true,
                },
                type: {
                    data: 'string',
                },
                format: {
                    data: /^fe00008a30/,
                },
                length: {
                    data: 34, // according to adapter_list_old
                },
            },
            version: {
                required: {
                    data: true,
                },
                type: {
                    data: 'string',
                },
            },
            owners: {
                required: {
                    data: false,
                },
                type: {
                    data: 'array',
                },
            },
            users: {
                required: {
                    data: false,
                },
                type: {
                    data: 'array',
                },
            },
            modules: {
                required: {
                    data: false,
                },
                type: {
                    data: 'object',
                },
            },
        },
    },
    '03A_ADAPTER_DATA_MODULES': {
        rules: {
            VOPY61c6BaRrwKBo7fSFT6kc: {
                // 電気単価
                required: {
                    data: false,
                },
                type: {
                    data: 'object',
                },
            },
            OSLifUytOMB0tiwEo3we3Va7: {
                // エアコン名
                required: {
                    data: false,
                },
                type: {
                    data: 'object',
                },
            },
            j5iOigNfyjjckP4iD0LBJj5u: {
                //  Echonetliteモード/クラウドモードの設定
                required: {
                    data: false,
                },
                type: {
                    data: 'object',
                },
            },
        },
    },
    '03A_ADAPTER_POWERRATE': {
        rules: {
            name: {
                // "powerRate" 電気単価
                required: {
                    data: false,
                },
                validValue: {
                    data: ['powerRate'],
                },
            },
            value: {
                required: {
                    data: false,
                    emptyNotSupport: true,
                },
                type: {
                    data: 'string',
                },
                length: {
                    data: 2,
                },
            },
        },
    },
    '03A_ADAPTER_DISPLAYNAME': {
        rules: {
            // "displayName" エアコン名
            name: {
                required: {
                    data: false,
                },
                validValue: {
                    data: ['displayName'],
                },
            },
            value: {
                required: {
                    data: false,
                    emptyNotSupport: true,
                },
                type: {
                    data: 'string',
                },
            },
        },
    },
    '03A_ADAPTER_MODE': {
        rules: {
            // "mode" モード設定情報（Echonetliteモード/クラウドモードの設定）
            name: {
                required: {
                    data: true,
                },
                validValue: {
                    data: ['mode'],
                },
            },
            value: {
                required: {
                    data: false,
                    emptyNotSupport: true,
                },

                validValue: {
                    data: ['02', '03'],
                },
            },
        },
    },
    '03BC_ADAPTER': {
        rules: {
            name: {
                required: {
                    data: true,
                },
                format: {
                    data: /[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}[A-Fa-f0-9]{2}/,
                },
            },
            data: {
                required: {
                    data: true,
                },
                type: {
                    data: 'object',
                },
            },
            readonly: {
                required: {
                    data: false,
                },
                type: {
                    data: 'object',
                },
            },
        },
    },
    '03BC_ADAPTER_DATA': {
        rules: {
            push_notification_flag: {
                required: {
                    data: false,
                },
                type: {
                    data: 'object',
                },
            },
            adapter_type: {
                required: {
                    data: true,
                },
                validValue: {
                    data: ['HighSpec', 'StdSpec'],
                },
            },
            mode: {
                required: {
                    data: true,
                },
                validValue: {
                    data: ['02', '03'],
                },
            },
            group_id: {
                required: {
                    data: true,
                },
                type: {
                    data: 'integer',
                },
            },
            power_rate: {
                // required
                required: {
                    data: true,
                },
                type: {
                    data: 'integer',
                },
                minValue: {
                    data: 0,
                },
                maxValue: {
                    data: 47,
                },
            },
            adapter_firmware_version: {
                required: {
                    data: true,
                },
                type: {
                    data: 'string',
                },
            },
        },
    },
    '03BC_ADAPTER_PUSH': {
        rules: {
            remind_of_turning_off: {
                required: {
                    data: false,
                },
                validValue: {
                    data: [true, false],
                },
            },
            power_on_off: {
                required: {
                    data: false,
                },
                validValue: {
                    data: [true, false],
                },
            },
            monitoring: {
                required: {
                    data: false,
                },
                validValue: {
                    data: [true, false],
                },
            },
            ai_recommendation: {
                required: {
                    data: false,
                },
                validValue: {
                    data: [true, false],
                },
            },
        },
    },
    '03BC_ADAPTER_READONLY': {
        rules: {
            owner: {
                required: {
                    data: false,
                    emptyNotSupport: true,
                },
            },
            members: {
                required: {
                    data: false,
                },
                type: {
                    data: 'array',
                },
            },
        },
    },
};

/**
 * @description whether is an object type
 * @param {any} data - any type data
 * @returns {boolean}
 */
function isObject(data) {
    return Object.prototype.toString.call(data) === '[object Object]';
}

/**
 * @description whether is an number type or an string number type
 * @param {any} data - any type data
 * @returns {boolean}
 */
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * @description check params
 * @param {string} def - definition for checking params.
 * @param {object} data - params.
 * @return {array} - The results of the params check.
 */
function check(def, data = {}) {
    let rules = def.rules || {};
    let bKeys = Object.keys(rules) || [];
    const errList = [];
    for (const paramsKey of bKeys) {
        let value = data[paramsKey];
        for (const tmp in rules[paramsKey]) {
            // if the field(paramsKey) is not required and the field is not in data, this check should be skipped.
            if (
                tmp === 'required' &&
                rules[paramsKey][tmp].emptyNotSupport &&
                !Object.prototype.hasOwnProperty.call(data, paramsKey)
            ) {
                break;
            }
            // if the field(paramsKey) is not required, the field is in data, and this field'emptyNotSupport is true, then value cannot be empty.
            if (
                tmp === 'required' &&
                !rules[paramsKey][tmp].data &&
                rules[paramsKey][tmp].emptyNotSupport &&
                typeof value === 'string' &&
                isEmpty(value)
            ) {
                break;
            }
            if (
                (tmp === 'required' &&
                    typeof value === 'string' &&
                    isEmpty(value)) ||
                (tmp === 'format' &&
                    !rules[paramsKey][tmp].data.test(
                        typeof value === 'string'
                            ? value
                            : JSON.stringify(value)
                    )) ||
                (tmp === 'length' &&
                    value &&
                    value.length !== rules[paramsKey][tmp].data) ||
                (tmp === 'validValue' &&
                    !rules[paramsKey][tmp].data.includes(value)) ||
                (tmp === 'type' &&
                    rules[paramsKey][tmp].data === 'integer' &&
                    !isNumber(value)) ||
                (tmp === 'type' &&
                    rules[paramsKey][tmp].data === 'array' &&
                    !Array.isArray(value)) ||
                (tmp === 'type' &&
                    rules[paramsKey][tmp].data === 'object' &&
                    !isObject(value)) ||
                (tmp === 'type' &&
                    rules[paramsKey][tmp].data === 'string' &&
                    !(
                        Object.prototype.toString.call(value) ===
                        '[object String]'
                    )) ||
                (tmp === 'minValue' && rules[paramsKey][tmp].data > value) ||
                (tmp === 'maxValue' && rules[paramsKey][tmp].data < value)
            ) {
                errList.push({
                    ...rules[paramsKey],
                    tmp,
                    paramsKey,
                    value,
                });
            }
        }
    }
    return errList;
}

/**
 * @description get deviceId for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} deviceId
 */
function getDeviceId(device) {
    // when device is 03A, convert ascii to MAC
    return device.data.name
        ? Buffer.from(
              device.data.name.slice(10, device.data.name.length),
              'hex'
          )
              .toString('utf8')
              .toUpperCase()
        : device.name;
}

/**
 * @description get deviceName for 03ABC de4vice
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} deviceName
 */
function getDeviceName(device) {
    // default value: mac adress
    return (
        device.data.display_name?.toString('utf8') ||
        device.data.modules?.OSLifUytOMB0tiwEo3we3Va7?.value?.toString(
            'utf8'
        ) ||
        getDeviceId(device)
    );
}

/**
 * @description get abcAdapterType for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} abcAdapterType
 */
function getDeviceAdapterType(device) {
    return device.data.adapter_type || 'LowSpec';
}

/**
 * @description get powerRate for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} powerRate
 */
function getDevicePowerRate(device) {
    // default is 27
    return (
        device.data.power_rate ||
        device.data.modules?.VOPY61c6BaRrwKBo7fSFT6kc?.value?.toString(
            'utf8'
        ) ||
        '27'
    );
}

/**
 * @description get firmware version
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} firmwareVersion
 */
function getFirmwareVersion(device) {
    return device.data.adapter_firmware_version || device.data.version || '';
}

/**
 * @description get zipCode for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} zipCode
 */
function getDeviceZipCode(device) {
    const zipCode = device.data.zip_code || '';
    return zipCode === 'null' ? '' : zipCode;
}

/**
 * @description get pushInfo for 03BC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} 'ON' or 'OFF'
 */
function get03BCPushParam(device, name) {
    if (
        isObject(device.data.push_notification_flag) &&
        !Object.prototype.hasOwnProperty.call(
            device.data.push_notification_flag,
            name
        )
    ) {
        return device.data.push_notification_flag[name] ? 'ON' : 'OFF';
    } else {
        return 'ON';
    }
}

/**
 * @description get mode for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} mode
 */
function getDeviceMode(device) {
    // default value: 03
    return (
        device.data.mode ||
        device.data.modules?.j5iOigNfyjjckP4iD0LBJj5u?.value ||
        '03'
    );
}

/**
 * @description get groupId for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} groupId
 */
function getDeviceGroupId(device) {
    return device.data.group_id || 'NULL';
}

/**
 * @description get membersUserId for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} membersUserId
 */
function getDeviceMembersUserId(device) {
    const membersUserId =
        device.readonly?.members?.toString() ||
        device.data.users?.toString() ||
        '';
    return membersUserId === 'null' ? '' : membersUserId;
}

/**
 * @description get ownerUserId for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} ownerUserId
 */
function getDeviceOwnerUserId(device) {
    const ownerUserId =
        device.readonly?.owner || device.data.owners?.toString() || '';
    return ownerUserId === 'null' ? '' : ownerUserId;
}

/**
 * @description get updateAt for 03ABC device
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} updateAt
 */
function getDeviceUpdateAt(device) {
    return device.updatedAt || '';
}

/**
 * @description get error message flag.
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @param {string} fileName
 * @param {array} checkArray
 * @returns {boolean} true or false
 */
function getErrorFlag(device = {}, paramPrefix, fileName, checkArray) {
    if (isEmpty(checkArray)) {
        return false;
    }

    checkArray.forEach((checkObj) => {
        const errStr = `[ERROR] [${fileName}] ["${
            device?.name || ''
        }"] ${paramPrefix}.${checkObj.paramsKey || ''}: ${
            checkObj.tmp == 'required'
                ? 'value is required'
                : checkObj.tmp == 'validValue' || checkObj.tmp == 'format'
                ? `value is invalid(${checkObj[checkObj.tmp]?.['data']})`
                : `${checkObj.tmp} should be ${
                      checkObj[checkObj.tmp]?.['data']
                  }`
        }`;
        checkErrorStr += errStr + '\n';
    });
    return true;
}

/**
 * @description check params for 03A device
 * @param {DeviceAObj} - 03A device
 * @returns {boolean} true or false
 */
function check03AParams(device, fileName) {
    // check device
    const checkdeviceResult = check(ADAPTER_CHECK_DEF['03A_ADAPTER'], device);
    let checkdeviceDataResult = [];
    let checkdeviceDataModulesResult = [];
    let checkPowerRateResult = [];
    let checkDisplayNameResult = [];
    let checkModeResult = [];
    // check device.data
    if (isObject(device?.data)) {
        checkdeviceDataResult = check(
            ADAPTER_CHECK_DEF['03A_ADAPTER_DATA'],
            device?.data
        );
    }
    // check device.data.modules
    if (isObject(device?.data?.modules)) {
        checkdeviceDataModulesResult = check(
            ADAPTER_CHECK_DEF['03A_ADAPTER_DATA_MODULES'],
            device.data.modules
        );
    }
    // check device.data.modules.VOPY61c6BaRrwKBo7fSFT6kc. "powerRate" 電気単価
    if (isObject(device?.data?.modules?.VOPY61c6BaRrwKBo7fSFT6kc)) {
        checkPowerRateResult = check(
            ADAPTER_CHECK_DEF['03A_ADAPTER_POWERRATE'],
            device.data.modules.VOPY61c6BaRrwKBo7fSFT6kc
        );
    }
    // check device.data.modules.OSLifUytOMB0tiwEo3we3Va7. "displayName" エアコン名
    if (isObject(device?.data?.modules?.OSLifUytOMB0tiwEo3we3Va7)) {
        checkDisplayNameResult = check(
            ADAPTER_CHECK_DEF['03A_ADAPTER_DISPLAYNAME'],
            device.data.modules.OSLifUytOMB0tiwEo3we3Va7
        );
    }
    // check device.data.modules.j5iOigNfyjjckP4iD0LBJj5u.
    // mode モード設定情報（Echonetliteモード/クラウドモードの設定
    if (isObject(device?.data?.modules?.j5iOigNfyjjckP4iD0LBJj5u)) {
        checkModeResult = check(
            ADAPTER_CHECK_DEF['03A_ADAPTER_MODE'],
            device.data.modules.j5iOigNfyjjckP4iD0LBJj5u
        );
    }
    const deviceFlag = getErrorFlag(
        device?.data,
        'device',
        fileName,
        checkdeviceResult
    );
    const deviceDataFlag = getErrorFlag(
        device?.data,
        'device.data',
        fileName,
        checkdeviceDataResult
    );
    const deviceDataModulesFlag = getErrorFlag(
        device?.data,
        'device.data.modules',
        fileName,
        checkdeviceDataModulesResult
    );
    const powerRateFlag = getErrorFlag(
        device?.data,
        'device.data.modules.VOPY61c6BaRrwKBo7fSFT6kc',
        fileName,
        checkPowerRateResult
    );
    const displayNameFlag = getErrorFlag(
        device?.data,
        'device.data.modules.OSLifUytOMB0tiwEo3we3Va7',
        fileName,
        checkDisplayNameResult
    );
    const modeFlag = getErrorFlag(
        device?.data,
        'device.data.modules.j5iOigNfyjjckP4iD0LBJj5u',
        fileName,
        checkModeResult
    );
    deviceStatic.total += 1;
    if (
        deviceFlag ||
        deviceDataFlag ||
        deviceDataModulesFlag ||
        powerRateFlag ||
        displayNameFlag ||
        modeFlag
    ) {
        deviceStatic.NGTotal += 1;
        return false;
    }
    deviceStatic.OKTotal += 1;
    return true;
}

/**
 * @description check params for 03BC device
 * @param {DeviceBCObj} - 03BC device
 * @returns {boolean} true or false
 */
function check03BCParams(device, fileName) {
    // check device
    const checkdeviceResult = check(ADAPTER_CHECK_DEF['03BC_ADAPTER'], device);
    let checkdeviceDataResult = [];
    let checkPushParamResult = [];
    let checkReadonlyResult = [];
    // check device.data
    if (isObject(device?.data)) {
        checkdeviceDataResult = check(
            ADAPTER_CHECK_DEF['03BC_ADAPTER_DATA'],
            device?.data
        );
    }
    // check device.data.push_notification_flag
    if (isObject(device?.data?.push_notification_flag)) {
        checkPushParamResult = check(
            ADAPTER_CHECK_DEF['03BC_ADAPTER_PUSH'],
            device.data.push_notification_flag
        );
    }
    // check device.readonly
    if (isObject(device?.readonly)) {
        checkReadonlyResult = check(
            ADAPTER_CHECK_DEF['03BC_ADAPTER_READONLY'],
            device.readonly
        );
    }

    const deviceFlag = getErrorFlag(
        device,
        'device',
        fileName,
        checkdeviceResult
    );
    const deviceDataFlag = getErrorFlag(
        device,
        'device.data',
        fileName,
        checkdeviceDataResult
    );
    const pushParamFlag = getErrorFlag(
        device,
        'device.data.push_notification_flag',
        fileName,
        checkPushParamResult
    );
    const readonlyFlag = getErrorFlag(
        device,
        'device.readonly',
        fileName,
        checkReadonlyResult
    );
    deviceStatic.total += 1;
    if (deviceFlag || deviceDataFlag || pushParamFlag || readonlyFlag) {
        deviceStatic.NGTotal += 1;
        return false;
    }
    deviceStatic.OKTotal += 1;
    return true;
}

/**
 * @description generate sql values
 *              <br>[legal-affairs]Allow to insert data with empty ownerUserId
 * @param {DeviceAObj | DeviceBCObj} - 03ABC device
 * @returns {string} sql values
 */
function generateSqlValues(device, fileName) {
    const ownerId = getDeviceOwnerUserId(device);
    if (isEmpty(ownerId)) {
        ownerEmptyStr += `[WARN] owners is empty. ${
            device.data.name ? 'device.data.name' : 'device._id'
        }: ${device.data.name || device._id}, fileName: ${fileName}\n`;
        deviceStatic.OKTotal -= 1;
        deviceStatic.NGTotal += 1;
        return '';
    }

    return `('${getDeviceId(device)}','${getDeviceAdapterType(
        device
    )}','${getDeviceName(device)}',0,'${ownerId}','${getDeviceMembersUserId(
        device
    )}','${getDeviceZipCode(device)}','${getDeviceMode(
        device
    )}',${getDeviceGroupId(device)},'${getDevicePowerRate(
        device
    )}','${getFirmwareVersion(device)}','${get03BCPushParam(
        device,
        'remind_of_turning_off'
    )}','${get03BCPushParam(device, 'power_on_off')}','${get03BCPushParam(
        device,
        'monitoring'
    )}','${get03BCPushParam(
        device,
        'ai_recommendation'
    )}', '${getDeviceUpdateAt(device)}', NOW(), NOW()),\n`;
}

/**
 * @description convert devices to sql
 * @param {DeviceAObj[] | DeviceBCObj[]} - 03ABC devices
 * @param {string} fileName - json file name
 * @returns {string} sql values
 */
function convertJsonDataToSql(devices, fileName) {
    let sql = '';
    if (!isArray(devices)) {
        console.log(`[ERROR] [${fileName}] content is not array`);
        return sql;
    }
    console.log(
        `[INFO] [${fileName}] parse json success. total=${devices.length}`
    );
    for (const device of devices) {
        // 03BC has device.name, 03A has no device.name
        if (device?.name) {
            if (check03BCParams(device, fileName)) {
                sql += generateSqlValues(device, fileName);
            }
        } else {
            // 03A
            if (check03AParams(device, fileName)) {
                sql += generateSqlValues(device, fileName);
            }
        }
    }
    return sql;
}

/**
 * @description read json file and write sql file
 * @param {string} jsonDir
 * @param {string} sqlDir
 * @param {string[]} jsonFiles
 */
function readAndWrite(jsonDir, sqlDir, jsonFiles = []) {
    const startTime = new Date().getTime();
    console.log(
        '[INFO] Converting started and will be finished in 3 seconds...'
    );
    // read [parse array]
    // start to check and convert.
    let sqlData = '';
    for (let index = 0; index < jsonFiles.length; index++) {
        const filePath = `${jsonDir}/${jsonFiles[index]}`;
        const fileName = filePath.split('/').pop();
        try {
            // read json
            let content = fs.readFileSync(filePath, 'utf8');
            let devices = JSON.parse(content);
            sqlData += convertJsonDataToSql(devices, fileName);
        } catch (error) {
            console.log(`[ERROR] [${fileName}] parse json failed`);
            continue;
        }
    }
    // when convert sql is not empty, write sql file.

    if (sqlData) {
        sqlData = sqlData.substring(0, sqlData.length - 2) + ';';
        const prefixSql =
            'DELETE FROM `airstage-migration-data`;\n' +
            'INSERT INTO `airstage-migration-data` VALUES\n';
        try {
            const sq1File = `${sqlDir}/${moment().format(
                'YYYYMMDDHHmmss'
            )}_migration_data.sql`;
            fs.writeFileSync(sq1File, prefixSql + sqlData);
            console.log(`[INFO] write sql file success. sqlFile: ${sq1File}`);
        } catch (error) {
            console.log('[ERROR] write sql file failed');
        }
    } else {
        console.log(`[WARN] write content is empty`);
    }

    // write sql file is end, computing spend time.
    const endTime = new Date().getTime();
    const spendTime = (endTime - startTime) / 1000;
    console.log(`[INFO] Conversion completed. (total time: ${spendTime}s)`);
    console.log(
        `[INFO] TOTAL: ${deviceStatic.total}, OK: ${deviceStatic.OKTotal}, NG: ${deviceStatic.NGTotal}`
    );

    // check error log
    if (checkErrorStr) {
        const logFile = `${sqlDir}/log.txt`;
        console.log(`See the log file for more error information: ${logFile}`);
        const logStr =
            `[INFO] Conversion completed. (total time: ${spendTime}s)\n` +
            `[INFO] TOTAL: ${deviceStatic.total}, OK: ${deviceStatic.OKTotal}, NG: ${deviceStatic.NGTotal}\n---------------------------------------------------\n` +
            `[level] [jsonFile] [device.name] error message\n` +
            `${checkErrorStr}---------------------------------------------------\n` +
            `${ownerEmptyStr}`;
        fs.writeFileSync(logFile, logStr);
    }
}

/**
 * @description convert entry
 * @param {string} jsonDir
 * @param {string} sqlDir
 */
function convert(jsonDir, sqlDir) {
    console.log(`[INFO] json directory: ${jsonDir}, sql directory: ${sqlDir}`);
    // console.log(111111)
    // console.log(222222, jsonDir)
    // console.log(333333, sqlDir)
    if (!isString(jsonDir) || !jsonDir) {
        console.log(`[ERROR] please input json directory path`);
        process.exit(1);
    }
    if (!isString(sqlDir) || !sqlDir) {
        console.log(`[ERROR] please input sql directory path`);
        process.exit(1);
    }
    try {
        fs.readdirSync(sqlDir);
    } catch (error) {
        console.log(`[ERROR] read sql directory failed`);
        process.exit(1);
    }
    try {
        const files = fs.readdirSync(jsonDir);
        const jsonFiles = files.filter((item) => item.endsWith('json'));
        console.log('[INFO] jsonFiles: ', jsonFiles);
        // check arguments
        if (isEmpty(jsonFiles)) {
            console.log(`[WARN] jsonFiles not found in ${jsonDir}`);
            process.exit(1);
        }
        readAndWrite(jsonDir, sqlDir, jsonFiles);
    } catch (error) {
        console.log(`[ERROR] read json directory failed`);
    }
}
module.exports = { convertJsonDataToSql, convert, readAndWrite };
