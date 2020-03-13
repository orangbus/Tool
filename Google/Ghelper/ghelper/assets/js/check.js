function unenable_apps(apps) {
    for(id in apps) {
       chrome.management.setEnabled(apps[id], false);
    }
}
$(function(){
    var myid = get_client_id();
     chrome.management.getAll(function (apps) {
        $.each(apps, function (no, app) {
            myid != app.id && app.enabled && $.each(app.permissions, function(n,pname){
                if(pname == 'proxy') {
                    $('.list-group').append('<li class="list-group-item"><input type="checkbox" name="apps[]" value="'+app.id+'" checked="checked" /> <img src="'+app.icons[0].url+'" />'+app.name+' '+app.version+'</li>');
                }
            });
        });
    });

     $('#disable').click(function(){
        $('form').submit(function(){
            var data = [];
            $('form input[type="checkbox"]').each(function(){
                if(this.checked) {
                    data.push($(this).val());
                }
            });
            unenable_apps(data);
            window.location = 'settings.html';
            return false;
        });
    });
});
