var locomotive = require("locomotive"),
    fs = require("fs"),
    
    /**
     * Port and address to bind the server
     */
    port = process.env.PORT || 8080,
    address = process.env.HOST || "0.0.0.0";

locomotive.boot("./", {}, function(err, server) {
    
    if(err) {
        throw err;
    }
    
    server.listen(port, address, function() {
        console.log("Listening on %s:%d", address, port);
        
        // Make sure this platform supports getuid/setuid (POSIX)
        if(!process.getuid) {
            return;
        }
        
        // if run as root, downgrade to the owner of this file
        if (process.getuid() === 0) {
            fs.stat(__filename, function(statErr, stats) {
                if (statErr) {
                    throw statErr;
                }
                
                process.setuid(stats.uid);
            });
        }
    });
  });