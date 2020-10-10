{
  "widget": {
    "defaultlocale": "zh_CN",
    "id": "com.dfocus.fmapp",
    "version": "1.0.3",
    "xmlns": "http://www.w3.org/ns/widgets",
    "xmlns:android": "http://schemas.android.com/apk/res/android",
    "xmlns:cdv": "http://cordova.apache.org/ns/1.0",
    "name": {
      "$t": "fmapp"
    },
    "description": {
      "$t": "fmapp"
    },
    "author": {
      "email": "xxx@df.com",
      "href": "#",
      "$t": "xxx"
    },
    "content": {
      "src": "index.html"
    },
    "access": {
      "origin": "*"
    },
    "allow-intent": [
      {
        "href": "http://*/*"
      },
      {
        "href": "https://*/*"
      },
      {
        "href": "tel:*"
      },
      {
        "href": "sms:*"
      },
      {
        "href": "mailto:*"
      },
      {
        "href": "geo:*"
      }
    ],
    "preference": [
      {
        "name": "target-device",
        "value": "handset"
      },
      {
        "name": "StatusBarOverlaysWebView",
        "value": "true"
      },
      {
        "name": "StatusBarStyle",
        "value": "default"
      },
      {
        "name": "SwiftVersion",
        "value": "5"
      },
      {
        "name": "SplashScreenDelay",
        "value": "3000"
      },
      {
        "name": "Orientation",
        "value": "portrait"
      }
    ],
    "defaultLocale": "zh_CN",
    "platform": [
      {
        "name": "android",
        "allow-intent": {
          "href": "market:*"
        },
        "edit-config": {
          "file": "app/src/main/AndroidManifest.xml",
          "mode": "merge",
          "target": "/manifest/application",
          "application": {
            "android:debuggable": "true",
            "android:usesCleartextTraffic": "true"
          }
        },
        "icon": [
          {
            "density": "xxhdpi",
            "src": "res/icon/android/icon-144-xxhdpi.png"
          },
          {
            "density": "xxxhdpi",
            "src": "res/icon/android/icon-192-xxxhdpi.png"
          },
          {
            "density": "ldpi",
            "src": "res/icon/android/icon-36-ldpi.png"
          },
          {
            "density": "mdpi",
            "src": "res/icon/android/icon-48-mdpi.png"
          },
          {
            "density": "hdpi",
            "src": "res/icon/android/icon-72-hdpi.png"
          },
          {
            "density": "xhdpi",
            "src": "res/icon/android/icon-96-xhdpi.png"
          }
        ],
        "splash": [
          {
            "density": "land-hdpi",
            "src": "res/splash/android/splash-land-hdpi.png"
          },
          {
            "density": "land-ldpi",
            "src": "res/splash/android/splash-land-ldpi.png"
          },
          {
            "density": "land-mdpi",
            "src": "res/splash/android/splash-land-mdpi.png"
          },
          {
            "density": "land-xhdpi",
            "src": "res/splash/android/splash-land-xhdpi.png"
          },
          {
            "density": "port-hdpi",
            "src": "res/splash/android/splash-port-hdpi.png"
          },
          {
            "density": "port-ldpi",
            "src": "res/splash/android/splash-port-ldpi.png"
          },
          {
            "density": "port-mdpi",
            "src": "res/splash/android/splash-port-mdpi.png"
          },
          {
            "density": "port-xhdpi",
            "src": "res/splash/android/splash-port-xhdpi.png"
          }
        ]
      },
      {
        "name": "ios",
        "allow-intent": [
          {
            "href": "itms:*"
          },
          {
            "href": "itms-apps:*"
          }
        ],
        "icon": [
          {
            "src": "res/icon/ios/icon-1024.png",
            "width": 1024,
            "height": 1024
          },
          {
            "src": "res/icon/ios/icon-20.png",
            "width": 20,
            "height": 20
          },
          {
            "src": "res/icon/ios/icon-29.png",
            "width": 29,
            "height": 29
          },
          {
            "src": "res/icon/ios/icon-29@2x.png",
            "width": 58,
            "height": 58
          },
          {
            "src": "res/icon/ios/icon-29@3x.png",
            "width": 87,
            "height": 87
          },
          {
            "src": "res/icon/ios/icon-40.png",
            "width": 40,
            "height": 40
          },
          {
            "src": "res/icon/ios/icon-40@2x.png",
            "width": 80,
            "height": 80
          },
          {
            "src": "res/icon/ios/icon-50.png",
            "width": 50,
            "height": 50
          },
          {
            "src": "res/icon/ios/icon-50@2x.png",
            "width": 100,
            "height": 100
          },
          {
            "src": "res/icon/ios/icon-57@1x.png",
            "width": 57,
            "height": 57
          },
          {
            "src": "res/icon/ios/icon-57@2x.png",
            "width": 114,
            "height": 114
          },
          {
            "src": "res/icon/ios/icon-60.png",
            "width": 60,
            "height": 60
          },
          {
            "src": "res/icon/ios/icon-60@2x.png",
            "width": 120,
            "height": 120
          },
          {
            "src": "res/icon/ios/icon-60@3x.png",
            "width": 180,
            "height": 180
          },
          {
            "src": "res/icon/ios/icon-72.png",
            "width": 72,
            "height": 72
          },
          {
            "src": "res/icon/ios/icon-72@2x.png",
            "width": 144,
            "height": 144
          },
          {
            "src": "res/icon/ios/icon-76.png",
            "width": 76,
            "height": 76
          },
          {
            "src": "res/icon/ios/icon-76@2x.png",
            "width": 152,
            "height": 152
          },
          {
            "src": "res/icon/ios/icon-83.5@2x.png",
            "width": 167,
            "height": 167
          }
        ],
        "splash": [
          {
            "src": "res/splash/ios/Default-2436h.png",
            "height": 2436,
            "width": 1125
          },
          {
            "src": "res/splash/ios/Default-568h@2x~iphone.png",
            "height": 1136,
            "width": 640
          },
          {
            "src": "res/splash/ios/Default-667h@2x~iphone.png",
            "height": 1334,
            "width": 750
          },
          {
            "src": "res/splash/ios/Default-736h@3x~iphone.png",
            "height": 2208,
            "width": 1242
          },
          {
            "src": "res/splash/ios/Default-Landscape-736h@3x~iphone.png",
            "height": 1242,
            "width": 2208
          },
          {
            "src": "res/splash/ios/Default-Landscape@2x~ipad.png",
            "height": 1536,
            "width": 2048
          },
          {
            "src": "res/splash/ios/Default-Landscape~ipad.png",
            "height": 768,
            "width": 1024
          },
          {
            "src": "res/splash/ios/Default-Portrait@2x~ipad.png",
            "height": 2048,
            "width": 1536
          },
          {
            "src": "res/splash/ios/Default-Portrait~ipad.png",
            "height": 1024,
            "width": 768
          },
          {
            "src": "res/splash/ios/Default@2x~iphone.png",
            "height": 960,
            "width": 640
          },
          {
            "src": "res/splash/ios/Default~iphone.png",
            "height": 480,
            "width": 320
          }
        ],
        "config-file": [
          {
            "parent": "NSMicrophoneUsageDescription ",
            "platform": "ios",
            "target": "*-Info.plist",
            "string": {
              "$t": "xxxx我们要使用您的相机"
            }
          },
          {
            "parent": "NSPhotoLibraryUsageDescription",
            "platform": "ios",
            "target": "*-Info.plist",
            "string": {
              "$t": "use photo"
            }
          },
          {
            "parent": "NSLocationWhenInUseUsageDescription",
            "platform": "ios",
            "target": "*-Info.plist",
            "string": {
              "$t": "use location"
            }
          }
        ],
        "edit-config": {
          "file": "*-Info.plist",
          "mode": "merge",
          "target": "NSMicrophoneUsageDescription",
          "string": {
            "$t": "use microphone"
          }
        }
      }
    ]
  }
}