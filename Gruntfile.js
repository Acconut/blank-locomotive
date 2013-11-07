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
         * Combine all scripts into one file
         */
        uglify: {
            dev: {
                options: {
                    compress: false,
                    beautify: true
                },
                files: {
                    "public/scripts/script.js": "app/scripts/views/**/*.js"
                }
            },
            vendor: {
                options: {
                    compress: true
                },
                files: {
                    "public/scripts/vendor.js": "app/scripts/vendor/**/*.js"
                }
            }
                
        },
        
        /**
         * Recompile all less or js files when one changes
         */
        watch: {
            less: {
                files: "app/styles/**/*.less",
                tasks: ["less:dev"]
            },
            js: {
                /**
                 * We only watch for script in views/ not vendor/
                 */
                files: "app/scripts/views/**/*.js",
                tasks: ["uglify:dev"]
            }
            
        }
    });
    
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    
    grunt.registerTask("css", ["less:dev"]);
    grunt.registerTask("js", ["uglify:dev", "uglify:vendor"]);
    grunt.registerTask("compile", ["css", "js", "watch"]);
    
};