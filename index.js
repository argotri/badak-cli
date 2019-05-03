const minimist = require('minimist')

module.exports = () => {
    const args = minimist(process.argv.slice(2))
    const cmd = args._[0]
    switch (cmd){
        case "invoker":
            require('./cmd/badak-invoker')(args,__dirname)
            break
        case "integration":
            require('./cmd/badak-ios-integration')(args,__dirname)
            break
        default:
            console.log("No Args Defined")
            console.log("if you want to use badak pararel testing, please use : ")
            console.log("badak-cli invoker --help")
            console.log("if you want to use badak integration testlink, please use : ")
            console.log("badak-cli integration --help")
            break
    }
}
