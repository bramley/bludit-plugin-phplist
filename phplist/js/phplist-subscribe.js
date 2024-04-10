jQuery(document).ready(function ($) {
    var waitimg = new Image();
    waitimg.src = waitImage;
    $("#phplistsubscribeform").submit(function () {
        var emailaddress = $("#emailaddress").val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var subscribeaddress = this.action;
        var ajaxaddress = subscribeaddress.replace(/p=subscribe/, 'p=asubscribe');
        $('#phplistsubscriberesult').html('<img src="' + waitimg.src + '" width="' + waitimg.width + '" height="' + waitimg.height + '" border="0" alt="Please wait" title="powered by phpList, www.phplist.com" />');

        if (emailReg.test(emailaddress)) {
            var jqxhr = $.ajax({
                type: 'POST',
                url: ajaxaddress,
                crossDomain: true,
                data: "email=" + emailaddress,
                success: function (data, textStatus, jqXHR) {
                    if (data.search(/FAIL/) >= 0) {
                        document.location = subscribeaddress + "&email=" + emailaddress;
                    } else {
                        $('#phplistsubscriberesult').html("<div id='subscribemessage'></div>");
                        $('#subscribemessage').html(data)
                            .hide()
                            .fadeIn(1500);
                        $("#phplistsubscribeform").hide();
                        $("#phplistnotsubscribe").hide();
                        $("#continuesetup").show().fadeIn(2000);
                        document.cookie = "phplistsubscribed=yes";
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    document.location = subscribeaddress + "&email=" + emailaddress;
                }
            });
        } else {
            document.location = subscribeaddress + "&email=" + emailaddress;
        }
        return false;
    });

    $("#emailaddress").val(pleaseEnter);
    $("#emailaddress").focus(function () {
        var v = $("#emailaddress").val();
        if (v == pleaseEnter) {
            $("#emailaddress").val("")
        }
    });
    $("#emailaddress").blur(function () {
        var v = $("#emailaddress").val();
        if (v == "") {
            $("#emailaddress").val(pleaseEnter)
        }
    });
    var cookie = document.cookie;
    if (cookie.indexOf('phplistsubscribed=yes') >= 0) {
        $("#phplistsubscribeform").html(thanksForSubscribing);
        $("#phplistnotsubscribe").hide();
        $("#continuesetup").show().fadeIn(2000);
    }
    $("#phplistnotsubscribe").click(function () {
        $("#phplistsubscribeform").html('<h3>Not subscribed</h3>');
        $("#phplistnotsubscribe").hide();
        $("#continuesetup").show().fadeIn(2000);
    })

});

if (pleaseEnter == undefined) {
    var pleaseEnter = "Please enter your email";
}
if (thanksForSubscribing == undefined) {
    var thanksForSubscribing = '<div class="subscribed">Thanks for subscribing. Please click the link in the confirmation email you will receive.</div>';
}
if (waitImage == undefined) {
    var waitImage = 'https://s3.amazonaws.com/phplist/img/busy.gif';
}

