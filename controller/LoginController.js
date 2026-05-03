$("#login_btn").click(function () {
    let user = $("#username").val();
    let pass = $("#password").val();

    if (user === "chethi" && pass === "1234") {
        $("#login_section").hide();
        $("#dashboard_section").show();
    } else {
        alert("Invalid Login");
    }
});