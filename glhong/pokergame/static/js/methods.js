function get_user_info(){
    var return_data = {};
    $.ajax({
        url : "/api/user/detail/",
        type : "GET",
        dataType: "JSON",
        async: false,
        success : function(data) {
            return_data = data;
        },
        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
    return return_data;
};