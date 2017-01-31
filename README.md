Electron boilerplate :)


## Installation

```terminal
git clone https://github.com/ChangJoo-Park/electron-boilerplate my-electron-app
cd my-electron-app
npm install
npm run postinstall
```

## Development

```terminal
npm run dev
```

## Packaging

```terminal
npm run dist
```


## 다루는 것들

- autoUpdater
- Release Server
- electron-builder / electron-updater / boilerplate

electron 관련 작업에 대한 정리입니다.

현재 해결해야할 부분인 앱 패키징 및 자동업데이트에 대해 다룹니다.

## autoUpdater

electron에는 자동 업데이트를 지원하는 **autoUpdater**가 있습니다. [관련문서](http://electron.atom.io/docs/api/auto-updater/)에 사용 방법이 있습니다. 현재 Windows와 macOS는 공식 지원되고 있습니다. 리눅스는 아직 지원하지 않고 해당 배포판 별 패키지 매니저를 이용해서 업데이트하도록 유도하고 있습니다.

### 업데이트 과정 

- [autoUpdater.setFeedURL](http://electron.atom.io/docs/api/auto-updater/#autoupdatersetfeedurlurl-requestheaders) 에 업데이트 용 파일이 있는 URL 설정
- [autoUpdater.checkForUpdates](http://electron.atom.io/docs/api/auto-updater/#autoupdatercheckforupdates)를 실행 (main.js)
- 업데이트 체크가 시작되면 결과에 따라 이벤트가 호출됨
- 업데이트가 가능하면 [update-available](http://electron.atom.io/docs/api/auto-updater/#event-update-available) 이벤트가 발생하고 자동으로 다운로드 시작
- 다운로드가 완료되면 [update-downloaded](http://electron.atom.io/docs/api/auto-updater/#event-update-downloaded) 이벤트가 발생함
- update-downloaded 이벤트 안에서 [autoUpdater.quitAndInstall()](http://electron.atom.io/docs/api/auto-updater/#autoupdaterquitandinstall)실행하면 종료 후 설치 됨

## Release Server

autoUpdater 문서에 릴리즈를 관리해주는 서버측 애플리케이션 몇가지를 소개하고 있습니다.

- [Nuts](https://github.com/GitbookIO/nuts) Github를 백엔드로 사용하는 릴리즈 서버입니다.


- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) Nuts에 UI가 필요한 경우 사용할 수 있습니다. Sails 기반이라 설정이 필요합니다. (추가적인 데이터베이스도 필요)
- [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server) Github 릴리즈를 이용하는 업데이트 서버입니다 node.js 기반
- [squirrel-release-server](https://github.com/Arcath/squirrel-release-server) 바로 이전 업데이트 이후에 추가된 기능만 업데이트하는 델타 업데이트를 지원합니다. php 기반
- [간단한 업데이트 서버 애플리케이션](https://github.com/ChangJoo-Park/electron-auto-update-server) node.js로 간단히 만든 업데이트 서버 입니다. 현재 애플리케이션의 버전/플랫폼 정보를 전달하면 업데이트용 URL을 받을 수 있습니다.

## electron-builder / electron-updater

electron-builder는 앱 패키징 / 자동 업데이트 / 코드 사이닝을 지원하는 도구 입니다. macOS/Windows/Linux 를 한번에 빌드 및 패키징을 할 수 있습니다. 패키징 포맷은 각 플랫폼 별로 지정할 수 있습니다. (**macOS**의 경우 `dmg`,`pkg`,`mas` , **Windows**의 경우 `NSIS`, `AppX`(Windows 10) `Squirrel.Windows`, **Linux**의 경우 `deb`, `rpm` 등)

electron-builder는 많은 설정을 가지고 있습니다. macOS에서 애플리케이션을 설치할 때 사용하는 dmg 파일을 실행하면 나오는 파일에 대한 설정도 제공합니다. 자세한 옵션은 [여기](https://github.com/electron-userland/electron-builder/wiki/Options)에 있습니다.

### electron builder boilerplate

간단하게 앱 구조를 살펴보기 위해 만든 보일러플레이트 입니다. [github](https://github.com/ChangJoo-Park/electron-boilerplate)에서 확인할 수 있습니다.

electron-builder는 **두개의 package.json 구조**를 가지고 있습니다. electron-builder에서 사용하는 것 하나와 실제 `app`에서 사용하는 package.json이 있습니다. 빌드 설정은 루트 디렉터리의 pakcage.json을 사용합니다.

루트 디렉터리의 package.json 파일의 내용입니다.

```json
{
  "name": "electron-boilerplate",
  "version": "1.0.0",
  "description": "Boilerplate for electron with electron-builder",
  "main": "index.js",
  "scripts": {
    "postinstall": "install-app-deps",
    "start": "electron ./app --enable-logging",
    "clean": "rm -rf ./dist",
    "dev": "NODE_ENV='development' npm run start",
    "dist": "npm run clean && build -mwl",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^1.4.15",
    "electron-builder": "^12.0.3"
  },
  "build": {
    "appId": "your.id",
    "mac": {
      "category": "your.app.category.type"
    },
    "win": {
      "iconUrl": "(windows-only) https link to icon"
    }
  }
}
```

electron-builder는 자동 업데이트를 위해 `electron-updater`라는 electron의 autoUpdater와 유사한 npm package 사용을 추천합니다.

`app` 디렉터리에서 설치해야합니다.

```
npm install --save electron-updater
```

설치 후 `require('electron-updater`') 를 main.js 에 추가하여 사용할 수 있습니다. main.js의 예제 입니다. updater의 이벤트가 발생하면 renderer에 이벤트 메시지를 전달하도록 하고 있습니다.

```js
'use strict'
const electron = require('electron')
const autoUpdater = require('electron-updater').autoUpdater
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow
let contents
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  contents = mainWindow.webContents
  contents.openDevTools()
  autoUpdater.checkForUpdates()
}

app.on('ready', createWindow)

autoUpdater.on('update-available', function () {
  console.log('A new update is available')
  contents.send('updater-message', 'A new update is available')
})
autoUpdater.on('checking-for-update', function () {
  console.log('Checking-for-update')
  contents.send('updater-message', 'Checking for Update..')
})
autoUpdater.on('error', function (error) {
  console.log('error')
  console.error(error)
  contents.send('updater-message', 'Got Error')
})
autoUpdater.on('download-progress', function (bytesPerSecond, percent, total, transferred) {
  console.log(`${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
  contents.send('updater-message', `download progress : ${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
})
autoUpdater.on('update-downloaded', function (event) {
  console.log('update-downloaded')
  console.log(event)
  contents.send('updater-message', 'update-downloaded')
})

autoUpdater.on('update-not-available', function () {
  console.log('update-not-available')
  contents.send('updater-message', 'update-not-available')
})
```

이제 앱 버전과 github 릴리즈를 비교해서 자동으로 업데이트를 해야 하므로 아래와 같이 루트 디렉터리의 package.json을 수정합니다.

```json
  "build": {
    "appId": "app.little.electron",
    "productName": "Little Electron App",
    "publish": {
      "provider": "github",
      "owner": "changjoo-park",
      "repo": "little-electron-app"
    },
    "mac": {
      "category": "your.app.category.type"
    },
    "win": {
      "iconUrl": "(windows-only) https link to icon",
      "publish": [
        "github"
      ],
      "remoteReleases": "https://github.com/ChangJoo-Park/little-electron-app"
    }
  }
```

`"build"` 부분만 수정하면 됩니다. `"publish"`와 `"win"`만 추가하면 됩니다.

`mac`에는 윈도우와 다르게 publish 옵션이 없는데, `npm run dist`가 끝나면 github 디렉터리에 `latest-mac.json` 파일이 만들어지고 이를 이용해서 업데이트 합니다.

```json
{
  "version": "0.0.1",
  "url": "https://github.com/changjoo-park/little-electron-app/releases/download/v0.0.1/little-electron-app-0.0.1-mac.zip"
}
```



### 업데이트 방법

github에서 프로젝트를 만들고 release를 추가하면됩니다. 릴리즈 태그는 `v1.0.0`의 형식을 따르면 됩니다.

위 `latest-mac.json`의 url을 보면 `v0.0.1` 처럼 되어있는데 app의 package.json에서 버전을 0.0.2로 바꾸고 `v0.0.2` release를 만든후 v0.0.1 버전 앱을 실행하면 자동으로 업데이트를 합니다.



### 코드 사이닝

자동 업데이트는 코드사이닝이 되어있지 않은 앱은 업데이트시 에러를 냅니다. (맥)

electron-builder는 [StartSSL을 추천](https://github.com/electron-userland/electron-builder/wiki/Code-Signing#where-to-buy-code-signing-certificate) 하고 있습니다.

- 맥의 경우에 개발자 관련 인증서가 키체인에 등록되어 있으면 자동으로 코드 사이닝 수행 (app, dmg, zip)
- 윈도우의 경우 인증서가 없어도 자동업데이트 가능 (NSIS 인스톨러)


- https://github.com/electron-userland/electron-osx-sign
- http://jbavari.github.io/blog/2015/08/14/codesigning-electron-applications/

## Github를 이용한 자동 업데이트

Github의 Release 기능을 이용해서 자동 업데이트를 할 수 있습니다.
electron-builder의 build 기능을 사용하면 만들어주는 파일 목록입니다.

```
- github
  - latest-mac.json
- mac
  - App이름.app
  - App이름-버전-mac.zip
  - App이름-버전-mac.dmg
- win-unpacked
  - 윈도우 관련 파일들
- linux-unpacked
  - 리눅스 관련 파일들
- App이름Setup버전.exe
- App이름-버전-환경.AppImage
```

### macOS의 경우

`/github/latest-mac.json`, `앱이름-버전-mac.zip` **필요**

`/github/latest-mac.json`의 내용입니다.

```json
{
  "version": "0.0.x",
  "url": "https://github.com/changjoo-park/저장소/releases/download/v0.0.x/앱이름-버전-mac.zip"
}
```

해당 url의 파일을 다운로드 받을 수 있으면 자동 업데이트가 가능합니다. 빌드한 mac 디렉터리에서 `.zip`파일과 `latest-mac.json` 파일을 릴리즈에 추가하면 맥 앱이 자동업데이트 됩니다.

### Windows의 경우

`latest.yml`, `앱이름-Setup-버전.exe` **필요**

```
version: 0.0.x
githubArtifactName: 앱이름-Setup-버전.exe
path: 앱이름 Setup 버전.exe
sha2: cbb76cda9b58b06325d2148f28b1a778d1182b3d276b364cc4f0f164f9873416 (예시)
```

윈도우 버전을 자동 업데이트하기 위해서 `latest.yml`에 있는 `githubArtifactName`에 맞추어 업로드 하면 됩니다.
