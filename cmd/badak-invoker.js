module.exports = (args,currentDir)=>{
    const exec = require('child_process').exec
    const path = require("path");
    var invokerFile = currentDir + "//shell//invoker.jar"
    process.argv.shift()  // skip node.exe
    process.argv.shift()  // skip name of js file
    process.argv.shift()  // skip name of
    // console.log(args)
    // console.log(invokerFile)
    // console.log(process.argv.join(" "))
    let command = 'java -jar "' + invokerFile + '" '
    process.argv.forEach(element => {
        if(element.includes(" ") && !element.includes("\"")){
            let temp = element.split("=")
            let tempCmd = temp[0]+"="+'"'+temp[1]+'"'
            command = command + ' ' + tempCmd
        }else{
            command = command + ' ' + element
        }
    });

    if(command.indexOf('--basedir') === -1){ //checking if basedir exist
        command += ' --basedir='+ '"' + path.resolve("./") + '" ';
    }

    console.log("Run Command " + command)
    var child = exec(command, {maxBuffer: 10240 * 500},function (error,stdout, stderr) {
        // console.log(stdout)
        if(error!==null){
            console.log("Error :" +  error)
        }
    })
    var lastStatus = "";
    child.stdout.on('data', function(data) {
        lastStatus = data.toString().trim();
        console.log(lastStatus);
        // console.log("Last Status " + lastStatus)
        // console.log("Status Last Status" + (lastStatus === "Build Failed" || lastStatus === "Build Success"))
        if(lastStatus === "Build Failed" || lastStatus === "Build Success"){
            // console.log("Checking Status is success or not : ")
            var assert = require('assert');
            assert.equal(lastStatus.toUpperCase(), "Build Success".toUpperCase(), "Automation failure ,Please Check for individual Log");
        }
    });
}
