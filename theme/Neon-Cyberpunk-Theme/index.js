// opentwig/theme/Neon-Cyberpunk-Theme/index.js
module.exports = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neon Cyberpunk Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="bg-particles">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
    </div>
    <div class="login-container">
        <div class="login-box">
            <h1 class="title">SYSTEM LOGIN</h1>
            <form>
                <div class="input-group">
                    <input type="text" id="username" name="username" required>
                    <label for="username">USER_ID</label>
                </div>
                <div class="input-group">
                    <input type="password" id="password" name="password" required>
                    <label for="password">PASSCODE</label>
                </div>
                <button type="submit" class="btn-login">
                    <span class="btn-text">ACCESS</span>
                    <span class="btn-glitch"></span>
                </button>
            </form>
        </div>
    </div>
</body>
</html>
`;