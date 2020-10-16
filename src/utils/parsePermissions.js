const permissionsIOS = {
  camera: { type: "config-file", parent: "NSMicrophoneUsageDescription " },
  photo: { type: "config-file", parent: "NSPhotoLibraryUsageDescription" },
  location: {
    type: "config-file",
    parent: "NSLocationWhenInUseUsageDescription"
  },
  microphone: { type: "edit-config", parent: "NSMicrophoneUsageDescription" }
};
function parsePermissions(options) {
  console.log(options, "---- parsePermissions");
  if (!options) {
    return [];
  }
  return options
    .map(({ type, desc }) => {
      const permission = permissionsIOS[type];
      if (!permission) {
        return null;
      }
      const { type: permissionType, parent } = permission;
      return {
        type,
        permissionType,
        desc,
        parent
      };
    })
    .filter(option => option !== null);
}

export { parsePermissions };
