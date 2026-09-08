// Creates a Keycloak connection
// Tells frontend where Keycloak is and which Keycloak app settings to use.
const keycloak = new Keycloak({
    url: "http://localhost:8081",
    realm: "paycard",
    clientId: "paycard-frontend"
});

// Checks whether the user is already logged in
keycloak.init({
    onLoad: "check-sso"

// Displays login status
}).then(function (authenticated) {
    if (authenticated) {
        document.getElementById("result").innerText =
            "Logged in as " + keycloak.tokenParsed.preferred_username;
    } else {
        document.getElementById("result").innerText =
            "Not logged in.";
    }
// Handles Keycloak setup errors
}).catch(function () {
    document.getElementById("result").innerText =
        "Failed to initialize Keycloak.";
});

// Login button function
function login() {
    keycloak.login();
}

// Logout button function
function logout() {
    keycloak.logout({
        redirectUri: "http://localhost:8000"
    });
}

// Calls the protected backend
async function callBackend() {
    try {
        // Checks if the user is logged in
        if (!keycloak.authenticated) {
            document.getElementById("result").innerText =
                "Please log in first.";
            return;
        }

        // Refreshes the token if needed
        // If the token will expire within 30 seconds, refresh it first.
        await keycloak.updateToken(30);

        // Sends the token to the backend
        const response = await fetch("http://localhost:8080/api/hello", {
            headers: {
                Authorization: "Bearer " + keycloak.token
            }
        });

        console.log("Status:", response.status);

        // Checks if the backend accepted the request
        if (!response.ok) {
            throw new Error("Backend returned status " + response.status);
        }

        const text = await response.text();

        document.getElementById("result").innerText = text;
    // Handles backend call failure
    } catch (error) {
        console.error("Backend call failed:", error);

        document.getElementById("result").innerText =
            "Could not call protected backend.";
    }
}