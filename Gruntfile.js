module.exports = function(grunt) {
    
    grunt.initConfig({
        /**
         * Compile all less files from app/stlyes into
         * the main css file in the public dir
         */
        less: {
            dev: {
                options: {
                    strictImports: true
                },
                files: {
                    "public/stylesheets/style.css": "app/styles/main.less"
                }
            }
        },
        
        
        /**
         * Recompile all less files when one changes
         */
        watch: {
            less: {
                files: "app/styles/**/*.less",
                tasks: ["less:dev"]
            }
            
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    grunt.registerTask("css", ["less:dev", "watch:less"]);
    
};