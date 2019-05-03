module.exports = function (args) {
    const exec = require('child-process-promise').exec
    var osvar = process.platform // detect operating system
    var shellDir = __dirname + "\\shell"
    console.log("Please Use Administrator if it's failed , \nif windows type CMD in search and right click and run as administrator , \nif linux or macos please use sudo badak-cli install")
    switch (osvar){
        case "win32":
            console.log("Detected Windows Os")
            let commandToRun ='setx BADAK_INVOKER_HOME "'+shellDir + '" /M'
            console.log("Setting Badak Invoker Home\n"+commandToRun)
            exec(commandToRun).then(function (result) {
                const stdout = result.stdout
                console.log(stdout);
            }).catch(function (err) {
                console.error(err)
            })
            // check BADAK_INVOKER_HOME already exist
            commandToRun ='echo %PATH%'
            var isBadakHomeSets = false
            exec(commandToRun).then(function (result) {
                isBadakHomeSets = result.indexOf("BADAK_INVOKER_HOME") !== -1
            }).catch(function (err) {
                console.error(err)
            })
            if(isBadakHomeSets){
                commandToRun ='setx PATH "%BADAK_INVOKER_HOME%;%PATH%" /M'
                console.log("Setting Path\n"+commandToRun)
                exec(commandToRun).then(function (result) {
                    const stdout = result.stdout
                    console.log(stdout);
                }).catch(function (err) {
                    console.error(err)
                })
            }
            break
        default:

            break
    }
}