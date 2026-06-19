async function callBackend() {
    try {
        const response = await fetch("http://localhost:8080/api/hello");
        const text = await response.text();

        document.getElementById("result").innerText = text;
    } catch (error) {
        document.getElementById("result").innerText =
            "Could not connect to Java backend.";
        console.error(error);
    }
}