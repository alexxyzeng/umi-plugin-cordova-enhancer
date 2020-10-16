"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePermissions = parsePermissions;
var permissionsIOS = {
  camera: {
    type: "config-file",
    parent: "NSMicrophoneUsageDescription "
  },
  photo: {
    type: "config-file",
    parent: "NSPhotoLibraryUsageDescription"
  },
  location: {
    type: "config-file",
    parent: "NSLocationWhenInUseUsageDescription"
  },
  microphone: {
    type: "edit-config",
    parent: "NSMicrophoneUsageDescription"
  }
};

function parsePermissions(options) {
  console.log(options, "---- parsePermissions");

  if (!options) {
    return [];
  }

  return options.map(function (_ref) {
    var type = _ref.type,
        desc = _ref.desc;
    var permission = permissionsIOS[type];

    if (!permission) {
      return null;
    }

    var permissionType = permission.type,
        parent = permission.parent;
    return {
      type: type,
      permissionType: permissionType,
      desc: desc,
      parent: parent
    };
  }).filter(function (option) {
    return option !== null;
  });
}