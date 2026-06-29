const keycloak = new Keycloak({
    url: "http://localhost:8081",
    realm: "paycard",
    clientId: "paycard-frontend"
});

keycloak.init({
    onLoad: "check-sso"
}).then(function (authenticated) {
    if (authenticated) {
        document.getElementById("result").innerText =
            "Logged in as " + keycloak.tokenParsed.preferred_username;
    } else {
        document.getElementById("result").innerText =
            "Not logged in.";
    }
}).catch(function () {
    document.getElementById("result").innerText =
        "Failed to initialize Keycloak.";
});

function login() {
    keycloak.login();
}

function logout() {
    keycloak.logout({
        redirectUri: "http://localhost:8000"
    });
}

async function callBackend() {
    try {
        if (!keycloak.authenticated) {
            document.getElementById("result").innerText =
                "Please log in first.";
            return;
        }

        await keycloak.updateToken(30);

        const response = await fetch("http://localhost:8080/api/hello", {
            headers: {
                Authorization: "Bearer " + keycloak.token
            }
        });

        console.log("Status:", response.status);

        if (!response.ok) {
            throw new Error("Backend returned status " + response.status);
        }

        const text = await response.text();

        document.getElementById("result").innerText = text;
    } catch (error) {
        console.error("Backend call failed:", error);

        document.getElementById("result").innerText =
            "Could not call protected backend.";
    }
}