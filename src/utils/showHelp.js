module.exports = function showHelp() {
    console.log(`
🌿 OpenTwig - Open source link in bio page generator

USAGE:
    npx opentwig [OPTIONS]

OPTIONS:
    --help, -h          Show this help message
    --init, -i          Create a sample config.json file

DESCRIPTION:
    OpenTwig generates a beautiful link in bio page from a config.json file.
    
    To get started:
    1. Run 'npx opentwig --init' to create a sample config.json
    2. Edit the config.json file with your information
    3. Run 'npx opentwig' to generate your page

EXAMPLES:
    npx opentwig --init          # Create sample config
    npx opentwig --help          # Show this help
    npx opentwig                 # Generate page from config.json

For more information, visit: https://github.com/tufantunc/opentwig
`);
};
