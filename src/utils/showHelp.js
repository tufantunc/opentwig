module.exports = function showHelp() {
    console.log(`
🌿 OpenTwig - Open source link in bio page generator

USAGE:
    npx opentwig [OPTIONS]

OPTIONS:
    --help, -h          Show this help message
    --init, -i          Create a sample config.json file
    --live, -l          Start live preview with config editor
    --port, -p PORT   Specify port for live preview (default: 3000)

DESCRIPTION:
    OpenTwig generates a beautiful link in bio page from a config.json file.
    
    To get started:
    1. Run 'npx opentwig --init' to create a sample config.json
    2. Edit config.json file with your information
    3. Run 'npx opentwig' to generate your page
    
    For live editing:
    1. Run 'npx opentwig --live' to start live preview
    2. Edit your config in browser sidebar
    3. Changes are saved automatically to config.json
    
    For custom port:
    npx opentwig --live --port 3001

 EXAMPLES:
    npx opentwig --init          # Create sample config
    npx opentwig --help          # Show this help
    npx opentwig                 # Generate page from config.json
    npx opentwig --live          # Start live preview
    npx opentwig --live -p 9000   # Live preview on port 9000
    npx opentwig --live --port 3001  # Live preview on port 3001

For more information, visit: https://github.com/tufantunc/opentwig
`);
};
