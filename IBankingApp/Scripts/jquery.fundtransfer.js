$(document).ready(function () {
    $("#fundSection").hide();
    //$("#RegistrationDiv").hide();
    GetData();
    $('#fundForm').submit(function () {
        var username = $("#username_").val();

        $("#btnSendMoney").attr("disabled", true);
        var d = new Date();
        var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
        fundData = {
            Amount: $("#amount").val(),
            Recipient: $("#accountNum").val(),
            TransactionDate: strDate,
            Sender: username
        }

        $.ajax({
            type: "POST",
            url: 'http://localhost:53808/api/transaction/sendmoney',
            dataType: "text",
            data: fundData,
            success: function (result) {
                alert("money sent successfully");
               
                $("#btnSendMoney").attr("disabled", false);
                //ShowReg();
                //window.location.replace("/home/dashboard");
            },
            error: function (request, status, error) {
                //Do Something on Failure
            }
        });
        return false;
      
    });
    $("#fundLink").click(function () {
        $("#fundSection").show();
        $("#section1").hide();
        $("#section2").hide();

    });

    $("#logoutLink").click(function () {
        
          window.location.replace("/");

    });
    function GetData() {
        var username = $("#username_").val();
       
        $.ajax({
            type: "GET",
            url: 'http://localhost:53808/api/transaction/GetData',
            data: { username },
            dataType:"json",
            success: function (result) {

                console.log(typeof(result));
                $("#acountBalance").text("N"+result.account.AccountBalance)
                $("#fullnameSpan").text(result.account.AppUser.Firstname + " " + result.account.AppUser.LastName);
                if (result.txns.length <= 0 || result.txns.length == null) {
                    $("#transactionCount").text(0 + " Transaction(s)")

                } else {
                    $("#transactionCount").text(result.txns.length + " Transaction(s)")
                }
                console.log("data fetch successfully", result);
                $("#btnSendMoney").attr("disabled", false);

                var transactions;
                transactions = result.txns;
                $('#txnHistoryBody').empty();
                transactions.forEach(loopTxns)
            },
            error: function (request, status, error) {
                console.log(error);
               
                //Do Something on Failure
            }
        });
        return false;
    }

    function loopTxns(item, index) {
        var markup = " <tr><td><p class='list-item-heading'>" + item.Recipient + "</p></td ><td><p class='text-muted'>" + item.Amount + "</p></td></tr > "
        $("#txnHistoryBody").append(markup);
       // document.getElementById("demo").innerHTML += index + ":" + item + "<br>";
    }

});