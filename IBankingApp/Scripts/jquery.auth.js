$(document).ready(function () {
    console.log("document ready")
    $("#RegistrationDiv").hide();

   
   
   
    $('#LoginForm').submit(function () {
        $("#btnLogin").attr("disabled", true);
        loginData = {
            grant_type:"password",
            username: $("#loginEmail").val(),
            password: $("#loginPword").val(),
           
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost:53808/token',
            dataType: "json",
            data: loginData,
            success: function (result) {
                alert("login successful");
                console.log("login successful")
                $("#btnLogin").attr("disabled", false);
                //ShowReg();
                //window.location.replace("/home/dashboard");
                window.location.replace("/home/dashboard?user=" + result.userName);
            },
            error: function (request, status, error) {
                $("#btnLogin").attr("disabled", false);
                $("#errorLogin").removeAttr("hidden");

                //Do Something on Failure
            }
        });
        return false;
        $("#btnLogin").attr("disabled", false);

    });
    $('#RegForm').submit(function () {
        $("#btnReg").attr("disabled", true);
        regData = {
            email: $("#email").val(),
            password: $("#password").val(),
            ConfirmPassword: $("#confirmPassword").val(),
            Firstname: $("#firstName").val(),
            LastName: $("#lastName").val(),
            AccountNumber: $("#accountNumber").val()
        }
        $.ajax({
            type: "POST",
            url: 'http://localhost:53808/api/account/register',
            dataType: "text",
            data: regData,
            success: function (result) {

                var response = eval(result);
                alert("registration successful");
                $("#btnReg").attr("disabled", false);
                ShowLogin();
            },
            error: function (request, status, error) {
                //Do Something on Failure
            }
        });
    });

    $("#regLink").click(function () {
        $("#RegistrationDiv").show();
        $("#LoginDiv").hide();

    })
    $("#loginLink").click(function () {
        $("#RegistrationDiv").hide();
        $("#LoginDiv").show();

    })

    function ShowLogin() {
        $("#RegistrationDiv").hide();
        $("#LoginDiv").show();

     
    }
    function ShowReg() {
        $("#RegistrationDiv").show();
        $("#LoginDiv").hide();

    }

});