/**
 * Created by aleksandr on 22.08.15.
 */
var parseID="f2Mk2xz225CV9P4AEQpyEuIY4vBU2fbchZUdixj5";
var parseKey="FaWhv3SyP2hfGo0KCEMpVhiMpxVPFwD1IA8Wh3KQ";

$(document).ready(function(){
    getMessages();
    $("#send").click(function(){
        var username = $("input[name=username]").val();
        var message = $("input[name=message]").val();
        $.ajax({
            url: " https://api.parse.com/1/classes/MessageBoard",
            headers: {
                "X-Parse-Application-Id": parseID,
                "X-Parse-REST-API-Key": parseKey
            },
            contentType: "application/json",
            dataType: "json",
            processData: false,
            data: JSON.stringify({
                "username": username,
                "message": message
            }),
            type: 'POST',
            success: function() {
                console.log("sent");
                getMessages();
            },
            error: function() {
                console.log("error");
            }
        });

    });
})
function getMessages() {
    $.ajax({
        url: " https://api.parse.com/1/classes/MessageBoard",
        headers: {
            "X-Parse-Application-Id": parseID,
            "X-Parse-REST-API-Key": parseKey
        },
        contentType: "application/json",
        dataType: "json",
        type: 'GET',
        success: function(data) {
            console.log("get");
            updateView(data);
        },
        error: function() {
            console.log("error");
        }
    });
}

function updateView(messages) {
    var table=$(".table tbody");
    table.html('');
    $.each(messages.results, function (index, value) {
        var trEl=$('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>');
        table.append(trEl);
    });

    console.log(messages);
}
