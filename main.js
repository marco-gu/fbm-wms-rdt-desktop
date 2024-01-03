// const { app, BrowserView, BrowserWindow, ipcMain, Menu } = require('electron')
// const path = require('path')
// const createWindow = () => {
//     const win = new BrowserWindow({
//         width: 360,
//         height: 930,
//         transparent: false,
//         preload: path.join(__dirname, 'preload.js')
//     })
//     win.loadURL('http://localhost:8080/#')
//     //    创建主窗口右键菜单
//     let contextMenu = Menu.buildFromTemplate([
//         { label: 'Item 1' || test, role: 'reload' },
//         { role: 'editMenu' }
//     ])
//     ipcMain.on('set-title', (event, title) => {
//         const webContents = event.sender
//         const win = BrowserWindow.fromWebContents(webContents)
//         win.setTitle(title)
//     })
//     win.webContents.on('context-menu', (e, params) => {
//         contextMenu.popup()
//     })
//     // const view = new BrowserView()
//     // let contextMenu = Menu.buildFromTemplate([
//     //     { label: 'Item 1' || test, role: 'reload' },
//     //     { role: 'editMenu' }
//     // ])
//     // view.webContents.loadURL('http://localhost:8080/#/')
//     // view.webContents.on("contextmenu", (event, params) => {
//     //     contextMenu.popup()
//     // });
// }
// app.whenReady().then(() => {
//     createWindow()
//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })

const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        // width: 360,
        width: 620,
        height: 1080,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // let contextMenu = Menu.buildFromTemplate([
    //     { label: 'refresh' || test, role: 'reload' },
    //     {
    //         label: 'CT45' || test,
    //         submenu: [{
    //             click: () => mainWindow.webContents.send('update-counter', 1),
    //             label: 'Increment'
    //         },
    //         {
    //             click: () => mainWindow.webContents.send('update-counter', -1),
    //             label: 'Decrement'
    //         }

    //                     { role: 'editMenu' }
    //         ])
    // const contextMenu = Menu.buildFromTemplate([{
    //     label: "Devices",
    //     submenu: [{
    //         click: () => mainWindow.webContents.send('update-counter', 1),
    //         label: 'CT45'
    //     }]
    // }])
    // mainWindow.webContents.on('context-menu', (e, params) => {
    //     contextMenu.popup()
    // })

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        console.log(title);
        win.setTitle(title)
    })

    mainWindow.loadURL('http://localhost:8080/#/')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})